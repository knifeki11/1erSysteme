"use client"

import React, { useRef, useState, useMemo, useEffect, Suspense, Component } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  Environment,
  useTexture,
  RoundedBox,
  useCursor,
  Html,
  ContactShadows,
  Line,
} from "@react-three/drei"
import type { ThreeEvent } from "@react-three/fiber"
import * as THREE from "three"
import type { SolutionRingItem } from "./solutions-ring-data"
import { SOLUTIONS_RING_ORDER, SOLUTION_LOGOS } from "./solutions-ring-data"

/** Catches HDR fetch failures (e.g. preset from CDN) and renders nothing so the scene still works with lights. */
class EnvironmentErrorBoundary extends Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error: Error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Solutions Ring] Environment map failed to load, using lights only:", error.message)
    }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

const reflectionVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const reflectionFragment = /* glsl */ `
  uniform sampler2D map;
  uniform float opacity;
  varying vec2 vUv;
  void main() {
    // Mirror UV so back shows reflection of front (no blur)
    vec2 refUv = vec2(1.0 - vUv.x, vUv.y);
    vec4 tex = texture2D(map, refUv);
    tex.a *= opacity;
    gl_FragColor = tex;
  }
`

/* -------------------------------------------------------------------------
 * CONFIG: Adjust ring layout and animation here.
 *
 * - RING_RADIUS: distance of cards from center (world units). Increase for
 *   a wider ring, decrease for tighter. Typical range: 2.5–4.5.
 * - CAMERA_DISTANCE: how far the camera is from center. Increase to see
 *   more of the ring, decrease to zoom in. Typical range: 6–12.
 * - AUTOPLAY_SPEED: radians per second when no interaction. Reduce for
 *   slower spin (e.g. 0.04), increase for faster (e.g. 0.12).
 * - LERP_FACTOR: how quickly rotation catches up to target (0–1). Higher =
 *   snappier. Reduce for prefers-reduced-motion.
 *
 * To add/remove solutions: edit SOLUTIONS_RING_ORDER and SOLUTION_LOGOS in
 * solutions-ring-data.ts, and ensure t.solutionsPage.items in en/fr/ar
 * has matching entries by name. The ring adapts to items.length.
 * ------------------------------------------------------------------------- */
const RING_RADIUS = 4.0
const CAMERA_DISTANCE = 9.2
const AUTOPLAY_SPEED = 0.08
const LERP_FACTOR = 0.08
const LERP_FACTOR_REDUCED_MOTION = 0.25
// Ring slightly left to leave space for the right-side detail card; no zoom-out
const HORIZONTAL_RING_X = 0
const HORIZONTAL_FRONT_ANGLE = Math.atan2(-HORIZONTAL_RING_X, CAMERA_DISTANCE)
const RING_SCALE_INITIAL = 1.08
/** Ring base position; block offset shifts ring+card together to the right */
const RING_LEFT_OFFSET = -2.8
/** Card position relative to center; block offset shifts ring+card together */
const DETAIL_CARD_X = 5.8
/** Move entire block (ring + card) right to use right-side space */
const BLOCK_OFFSET_X = 1.8
const LERP_POSITION = 0.04
const ACTIVE_CARD_ZOOM = 1.5
const ZOOM_LERP = 0.06
const RING_SHADOW_RADIUS = RING_RADIUS * 1.05
/** Back ring: slightly larger than carousel, sits behind all cards, never occludes. */
const BACK_RING_RADIUS = RING_RADIUS * 1.14
const BACK_RING_Y = -0.06
/** Cards raised above the stage plane so they're always fully visible. */
const CARD_Y_RAISE = 0.12
/** Carousel slightly closer to camera. */
const RING_FORWARD_Z = 0.35
const TICK_COUNT = 24
/** Faint back ring (never occludes) + thin halo outline + subtle radial ticks. No thick basket. */
function StagePedestal({ isDark }: { isDark: boolean }) {
  const ringColor = isDark ? "#2a2a3a" : "#8a96a8"
  const tickColor = isDark ? "#1a1a28" : "#6a7688"
  return (
    <group position={[0, 0, 0]}>
      {/* 1. Faint BACK ring: behind cards, larger radius, never occludes */}
      <mesh
        position={[0, BACK_RING_Y, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        renderOrder={-3}
      >
        <ringGeometry args={[BACK_RING_RADIUS - 0.03, BACK_RING_RADIUS + 0.03, 64]} />
        <meshBasicMaterial
          color={ringColor}
          transparent
          opacity={0.08}
          depthWrite={false}
          depthTest={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* 2. Subtle radial ticks (never occlude) */}
      {Array.from({ length: TICK_COUNT }, (_, i) => {
        const a = (i * 2 * Math.PI) / TICK_COUNT
        const cx = Math.sin(a) * (RING_RADIUS - 0.2)
        const cz = Math.cos(a) * (RING_RADIUS - 0.2)
        const ex = Math.sin(a) * RING_SHADOW_RADIUS
        const ez = Math.cos(a) * RING_SHADOW_RADIUS
        return (
          <Line
            key={i}
            points={[[cx, -0.02, cz], [ex, -0.02, ez]]}
            color={tickColor}
            lineWidth={0.6}
            renderOrder={-2}
          />
        )
      })}
    </group>
  )
}

function CenterDisc({
  isDark,
  logoTexture,
}: {
  isDark: boolean
  logoTexture: THREE.Texture
}) {
  return (
    <group position={[0, 0, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[0.8, 32]} />
        <meshPhysicalMaterial
          transparent
          opacity={0.9}
          transmission={0.85}
          roughness={0.18}
          metalness={0.05}
          color={isDark ? "#1a1a2e" : "#f8f8fc"}
          envMapIntensity={0.65}
        />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.9, 0.9]} />
        <meshBasicMaterial
          map={logoTexture}
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

type SolutionsRing3DProps = {
  items: SolutionRingItem[]
  activeIndex: number
  onSelectIndex: (index: number) => void
  isDark: boolean
  reducedMotion: boolean
  /** Top label for the detail panel (e.g. "Solution Overview"). From i18n solutionsPage.overviewLabel */
  overviewLabel?: string
  /** When provided, called on WebGL context loss so parent can show overlay and offer Retry (remount) */
  onContextLost?: () => void
  /** When provided, called when WebGL context is restored (so parent can cancel a pending "reset" UI) */
  onContextRestored?: () => void
  /** Smaller layout for embedding in home page (reduced height, zoomed-out camera) */
  compact?: boolean
  /** When true, parent section provides the background; ring container stays transparent so background covers full section */
  embeddable?: boolean
  /** When embeddable, label for the "See solution" button (e.g. from t.aboutSolutions.seeSolution) */
  seeSolutionLabel?: string
  /** Camera distance when compact (default 9.2 for larger ring in embed) */
  cameraDistance?: number
}

// Effective index from current horizontal ring angle (same formula as target so vertical stays in sync)
function indexFromHorizontalAngle(angle: number, N: number): number {
  const i = Math.round((HORIZONTAL_FRONT_ANGLE - angle) * N / (2 * Math.PI))
  return ((i % N) + N) % N
}

function RingInner({
  items,
  activeIndex,
  onSelectIndex,
  isDark,
  reducedMotion,
  overviewLabel,
  embeddable,
}: SolutionsRing3DProps) {
  const horizontalGroupRef = useRef<THREE.Group>(null)
  const currentRotationRef = useRef(0)
  const targetRotationRef = useRef(0)
  const cardGroupRefs = useRef<(THREE.Group | null)[]>([])
  const currentScalesRef = useRef<number[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const N = Math.max(1, items.length)

  const ringPositionXRef = useRef(0)
  const detailCardContainerRef = useRef<THREE.Group>(null)

  if (currentScalesRef.current.length !== N) {
    currentScalesRef.current = Array(N).fill(1)
  }

  const handleSelectIndex = (index: number) => {
    onSelectIndex(index)
  }

  // Pick shortest rotation to bring activeIndex to front: always rotate the minimal angle left or right.
  // Normalize angles and compute signed delta in (-π, π], then apply delta to actual current so we never take the long way.
  useEffect(() => {
    const twoPi = 2 * Math.PI
    const stepAngle = twoPi / N
    const targetBase = HORIZONTAL_FRONT_ANGLE - activeIndex * stepAngle
    const actualCurrent = currentRotationRef.current
    const currentNorm = ((actualCurrent % twoPi) + twoPi) % twoPi
    const targetNorm = ((targetBase % twoPi) + twoPi) % twoPi
    // Signed delta in (-π, π]: how much to rotate (positive = CCW, negative = CW)
    let delta = targetNorm - currentNorm
    if (delta > Math.PI) delta -= twoPi
    if (delta <= -Math.PI) delta += twoPi
    targetRotationRef.current = actualCurrent + delta
  }, [activeIndex, N])

  useFrame(() => {
    const group = horizontalGroupRef.current
    if (!group || N <= 0) return
    const target = targetRotationRef.current
    const lerp = reducedMotion ? LERP_FACTOR_REDUCED_MOTION : LERP_FACTOR
    let next = THREE.MathUtils.lerp(currentRotationRef.current, target, lerp)
    if (!reducedMotion && Math.abs(target - next) < 0.001) next = target
    currentRotationRef.current = next
    group.rotation.y = next
  })

  // No continuous autoplay: ring is driven only by activeIndex (5s auto-advance or user click) so card and ring stay in sync

  // Ring + card position: block offset moves both right; ring slightly left of center, card to its right
  useFrame(() => {
    const group = horizontalGroupRef.current
    const container = detailCardContainerRef.current
    if (!group) return
    const lerpPos = reducedMotion ? 0.08 : LERP_POSITION
    const targetRingX = RING_LEFT_OFFSET + BLOCK_OFFSET_X
    ringPositionXRef.current = THREE.MathUtils.lerp(ringPositionXRef.current, targetRingX, lerpPos)
    group.position.x = ringPositionXRef.current
    group.scale.setScalar(RING_SCALE_INITIAL)
    if (container) container.position.x = DETAIL_CARD_X + BLOCK_OFFSET_X
  })

  // Animated zoom (horizontal): when not embeddable, selected card scales up; when embeddable no card zoom
  useFrame(() => {
    const refs = cardGroupRefs.current
    const scales = currentScalesRef.current
    if (scales.length !== N) return
    for (let i = 0; i < N; i++) {
      const targetScale = embeddable ? 1 : (i === activeIndex ? ACTIVE_CARD_ZOOM : i === hoveredIndex ? 1.08 : 1)
      const next = THREE.MathUtils.lerp(scales[i], targetScale, ZOOM_LERP)
      scales[i] = next
      const g = refs[i]
      if (g) g.scale.setScalar(next)
    }
  })

  // Stable URL list from static data so texture loading never re-triggers when parent re-renders (e.g. i18n hydrate).
  // That was causing useTexture to re-suspend and the ring to disappear.
  const urls = useMemo(() => {
    if (typeof window === "undefined") return []
    const base = window.location.origin
    return [
      ...SOLUTIONS_RING_ORDER.map((name) => base + (SOLUTION_LOGOS[name] ?? "/images/final_logo/Logo%20(2).svg")),
      base + "/images/final_logo/Logo%20(2).svg",
    ]
  }, [])

  const allTextures = useTexture(
    urls.length ? urls : [typeof window !== "undefined" ? window.location.origin + "/images/final_logo/Logo%20(2).svg" : "/images/final_logo/Logo%20(2).svg"]
  )
  const textures = Array.isArray(allTextures) ? allTextures : [allTextures]
  const centerLogoTexture = textures[textures.length - 1]

  const cardWidth = 1.15
  const cardHeight = 1.0

  return (
    <>
      {/* Horizontal logo ring: slightly forward (closer to camera), cards raised above stage */}
      <group ref={horizontalGroupRef} position={[0, 0, RING_FORWARD_Z]} scale={1}>
        <StagePedestal isDark={isDark} />
        {items.map((item, index) => {
          const angle = (index * 2 * Math.PI) / N
          const x = RING_RADIUS * Math.sin(angle)
          const z = RING_RADIUS * Math.cos(angle)
          const isActive = index === activeIndex
          const isHovered = hoveredIndex === index
          const logoTexture = textures[index] ?? centerLogoTexture

          return (
            <group
              key={item.id}
              ref={(el) => { cardGroupRefs.current[index] = el }}
              position={[x, CARD_Y_RAISE, z]}
              rotation={[0, angle, 0]}
              scale={[1, 1, 1]}
              renderOrder={1}
            >
              {/* Per-card soft shadow (below raised card) */}
              <mesh position={[0, -0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.68, 32]} />
                <meshBasicMaterial
                  color="#000000"
                  transparent
                  opacity={isDark ? 0.22 : 0.12}
                  depthWrite={false}
                />
              </mesh>
              <CardMesh
                width={cardWidth}
                height={cardHeight}
                isDark={isDark}
                isHovered={!!isHovered}
                isActive={isActive}
                logoTexture={logoTexture}
                onPointerDown={(e: ThreeEvent<PointerEvent>) => {
                  e.stopPropagation()
                  handleSelectIndex(index)
                }}
                onPointerEnter={(e: ThreeEvent<PointerEvent>) => {
                  e.stopPropagation()
                  setHoveredIndex(index)
                }}
                onPointerLeave={() => setHoveredIndex(null)}
              />
            </group>
          )
        })}
        <group renderOrder={1}>
          <CenterDisc isDark={isDark} logoTexture={centerLogoTexture} />
        </group>
      </group>

      {/* Right: small detail card with 3 bullet points — visible on home (embeddable) and solutions page */}
      {items.length > 0 && items[activeIndex] && (
        <group ref={detailCardContainerRef} position={[DETAIL_CARD_X, 0, 0]} renderOrder={10}>
          <DetailCardRight
            key={activeIndex}
            item={items[activeIndex]}
            isDark={isDark}
            overviewLabel={overviewLabel}
          />
        </group>
      )}
    </>
  )
}

function ReflectionMaterial({
  map,
  opacity = 0.55,
}: {
  map: THREE.Texture
  opacity?: number
}) {
  const uniforms = useMemo(
    () => ({
      map: { value: map },
      opacity: { value: opacity },
    }),
    [map, opacity]
  )
  return (
    <shaderMaterial
      transparent
      depthWrite={false}
      uniforms={uniforms}
      vertexShader={reflectionVertex}
      fragmentShader={reflectionFragment}
    />
  )
}

const SOLUTION_PANEL_WIDTH_PX = 240
const SOLUTION_PANEL_MAX_HEIGHT = "min(50vh, 260px)"

function DetailCardRight({
  item,
  isDark,
  overviewLabel,
}: {
  item: SolutionRingItem
  isDark: boolean
  overviewLabel?: string
}) {
  const bullets = (item.tags ?? []).slice(0, 3)

  return (
    <group>
      <Html
        center
        transform={false}
        style={{
          width: SOLUTION_PANEL_WIDTH_PX,
          maxHeight: SOLUTION_PANEL_MAX_HEIGHT,
          pointerEvents: "auto",
        }}
        className="solution-detail-html"
      >
        <div
          className={
            "group flex w-full flex-col overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-300 " +
            (isDark
              ? "border-white/[0.08] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.25)]"
              : "border-black/[0.06] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.06)]")
          }
          style={{
            maxHeight: SOLUTION_PANEL_MAX_HEIGHT,
            background: isDark
              ? "linear-gradient(160deg, rgba(20,20,35,0.22) 0%, rgba(28,26,42,0.18) 50%, rgba(35,25,48,0.14) 100%)"
              : "linear-gradient(160deg, rgba(255,255,255,0.28) 0%, rgba(250,251,255,0.22) 50%, rgba(255,250,253,0.18) 100%)",
          }}
        >
          <div className="relative flex flex-col overflow-hidden rounded-2xl p-4">
            {/* Subtle left accent */}
            <div
              className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full opacity-80"
              style={{
                background: isDark
                  ? "linear-gradient(180deg, hsl(270 70% 60%), hsl(330 70% 55%))"
                  : "linear-gradient(180deg, hsl(262 83% 58%), hsl(330 70% 55%))",
              }}
              aria-hidden
            />
            <div className="pl-3">
              {overviewLabel && (
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {overviewLabel}
                </p>
              )}
              <h3 className="font-hero text-lg font-bold leading-tight tracking-tight text-foreground">
                {item.name ?? ""}
              </h3>
              {bullets.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2 text-sm leading-snug text-foreground/88"
                    >
                      <span
                        className="h-1 w-1 shrink-0 rounded-full bg-current opacity-60"
                        aria-hidden
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}

function CardMesh({
  width,
  height,
  isDark,
  isHovered,
  isActive,
  logoTexture,
  onPointerDown,
  onPointerEnter,
  onPointerLeave,
}: {
  width: number
  height: number
  isDark: boolean
  isHovered: boolean
  isActive: boolean
  logoTexture: THREE.Texture
  onPointerDown: (e: ThreeEvent<PointerEvent>) => void
  onPointerEnter: (e: ThreeEvent<PointerEvent>) => void
  onPointerLeave: () => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  useCursor(isHovered, "pointer")

  const emissive = (() => {
    if (isHovered) return new THREE.Color(0x007aff).multiplyScalar(0.15)
    if (isActive) return new THREE.Color(0x007aff).multiplyScalar(0.08)
    return new THREE.Color(0x000000)
  })()

  // Logo fills most of the card, centered
  const logoW = width * 0.88
  const logoH = height * 0.82

  return (
    <group>
      <RoundedBox
        ref={meshRef}
        args={[width, height, 0.04]}
        radius={0.06}
        smoothness={4}
        onPointerDown={onPointerDown}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        <meshPhysicalMaterial
          transparent
          opacity={0.88}
          transmission={0.9}
          roughness={0.12}
          metalness={0.05}
          thickness={0.3}
          color={isDark ? "#1e1e2e" : "#f0f0f8"}
          envMapIntensity={0.65}
          emissive={emissive}
        />
      </RoundedBox>
      {/* Logo centered on card (front) */}
      <mesh position={[0, 0, 0.021]} rotation={[0, 0, 0]}>
        <planeGeometry args={[logoW, logoH]} />
        <meshBasicMaterial
          map={logoTexture}
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </mesh>
      {/* Back face: blurred reflection of front (visible when card is rotated away) */}
      <mesh
        position={[0, 0, -0.021]}
        rotation={[0, Math.PI, 0]}
      >
        <planeGeometry args={[logoW, logoH]} />
        <ReflectionMaterial map={logoTexture} opacity={0.55} />
      </mesh>
    </group>
  )
}

function WebGLContextGuard({
  isDark,
  onContextLost,
  onContextRestored,
}: {
  isDark: boolean
  onContextLost?: () => void
  onContextRestored?: () => void
}) {
  const gl = useThree((s) => s.gl)
  const [contextLost, setContextLost] = useState(false)

  useEffect(() => {
    const canvas = gl.domElement
    const onLost = (e: Event) => {
      e.preventDefault()
      setContextLost(true)
      onContextLost?.()
    }
    const onRestored = () => {
      setContextLost(false)
      onContextRestored?.()
    }
    canvas.addEventListener("webglcontextlost", onLost, false)
    canvas.addEventListener("webglcontextrestored", onRestored, false)
    return () => {
      canvas.removeEventListener("webglcontextlost", onLost)
      canvas.removeEventListener("webglcontextrestored", onRestored)
    }
  }, [gl, onContextLost, onContextRestored])

  if (!contextLost) return null
  if (onContextLost) return null
  return (
    <Html fullscreen>
      <div
        className="flex min-h-screen w-full flex-col items-center justify-center gap-4"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 80% 80% at 50% 50%, #1e1e2e, #16162a)"
            : "radial-gradient(ellipse 80% 80% at 50% 50%, #f0f0f8, #e8e8f2)",
          color: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p className="text-center text-sm">
          The 3D view was reset. Refresh the page to restore it.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-lg bg-white/20 px-4 py-2 text-sm text-white hover:bg-white/30"
        >
          Refresh page
        </button>
      </div>
    </Html>
  )
}

function Scene(props: SolutionsRing3DProps) {
  return (
    <>
      <WebGLContextGuard
        isDark={props.isDark}
        onContextLost={props.onContextLost}
        onContextRestored={props.onContextRestored}
      />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 9, 5]} intensity={1} />
      <directionalLight position={[-3, 2, -3]} intensity={0.35} />
      <EnvironmentErrorBoundary>
        <Environment preset="city" environmentIntensity={0.55} />
      </EnvironmentErrorBoundary>
      <ContactShadows
        position={[0, -0.2, 0]}
        opacity={0.04}
        scale={12}
        blur={2}
        far={2}
      />
      <Suspense
        fallback={
          <Html center>
            <div
              className="animate-pulse text-sm text-white/70"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              Loading…
            </div>
          </Html>
        }
      >
        <RingInner {...props} />
      </Suspense>
    </>
  )
}

export function SolutionsRing3D(props: SolutionsRing3DProps) {
  const { isDark, compact, embeddable, cameraDistance: cameraDistanceProp } = props
  const cameraDistance = compact ? (cameraDistanceProp ?? 9.2) : (cameraDistanceProp ?? CAMERA_DISTANCE)
  /* Match the 3D cube/card colors: light #f0f0f8, dark #1e1e2e */
  const containerBg = embeddable
    ? "transparent"
    : isDark
      ? "radial-gradient(ellipse 80% 80% at 50% 50%, #1e1e2e, #16162a)"
      : "radial-gradient(ellipse 80% 80% at 50% 50%, #f0f0f8, #e8e8f2)"
  const heightClass = embeddable
    ? "h-full min-h-[280px]"
    : compact
      ? "h-[72vh] min-h-[420px]"
      : "h-full min-h-screen"
  return (
    <div
      className={`relative w-full overflow-hidden ${heightClass}`}
      style={{ background: containerBg }}
    >
      {/* Fixed-size wrapper so Canvas keeps a stable size and stays visible after layout */}
      <div className="absolute inset-0">
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, cameraDistance], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ display: "block", width: "100%", height: "100%" }}
        >
          <Scene {...props} />
        </Canvas>
      </div>
      {/* Subtle vignette overlay (CSS); skip when embeddable so section background is uniform */}
      {!embeddable && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.25) 100%)",
          }}
        />
      )}
    </div>
  )
}
