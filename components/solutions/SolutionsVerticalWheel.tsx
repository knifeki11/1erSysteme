"use client"

/**
 * Saved vertical solutions wheel – for reuse elsewhere (e.g. another page).
 * Use inside <Canvas> and <Suspense>.
 * Renders a vertical ring of description cards with Billboard (face camera),
 * optional rotation sync, and zoom-on-selection.
 */
import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, RoundedBox, useCursor, Billboard } from "@react-three/drei"
import type { ThreeEvent } from "@react-three/fiber"
import * as THREE from "three"
import type { SolutionRingItem } from "./solutions-ring-data"

const VERTICAL_RING_RADIUS = 2.6
const VERTICAL_CARD_WIDTH = 1.2
const VERTICAL_CARD_HEIGHT = 1.6
const VERTICAL_RING_SCALE = 1.25
const ACTIVE_CARD_ZOOM = 1.5
const ZOOM_LERP = 0.06
const LERP_FACTOR = 0.08

function DescriptionCard({
  title,
  description,
  isDark,
  isActive,
  isHovered,
  onPointerDown,
  onPointerEnter,
  onPointerLeave,
}: {
  title: string
  description: string
  isDark: boolean
  isActive: boolean
  isHovered: boolean
  onPointerDown: (e: ThreeEvent<PointerEvent>) => void
  onPointerEnter: (e: ThreeEvent<PointerEvent>) => void
  onPointerLeave: () => void
}) {
  useCursor(isHovered, "pointer")
  const opacity = isActive ? 0.92 : isHovered ? 0.7 : 0.5
  const emissive = isActive
    ? new THREE.Color(0x007aff).multiplyScalar(0.06)
    : isHovered
      ? new THREE.Color(0x007aff).multiplyScalar(0.04)
      : new THREE.Color(0x000000)

  return (
    <group>
      <RoundedBox
        args={[VERTICAL_CARD_WIDTH, VERTICAL_CARD_HEIGHT, 0.04]}
        radius={0.05}
        smoothness={4}
        onPointerDown={onPointerDown}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        <meshPhysicalMaterial
          transparent
          opacity={opacity}
          transmission={0.88}
          roughness={0.12}
          metalness={0.05}
          thickness={0.25}
          color={isDark ? "#1e1e2e" : "#f0f0f8"}
          envMapIntensity={0.5}
          emissive={emissive}
        />
      </RoundedBox>
      <Text
        position={[0, 0.38, 0.021]}
        fontSize={0.11}
        color={isDark ? "#e8e8f0" : "#1a1a2e"}
        anchorX="center"
        anchorY="middle"
        maxWidth={VERTICAL_CARD_WIDTH * 0.92}
      >
        {title}
      </Text>
      <Text
        position={[0, 0, 0.021]}
        fontSize={0.065}
        color={isDark ? "#b0b0c0" : "#4a4a5a"}
        anchorX="center"
        anchorY="middle"
        maxWidth={VERTICAL_CARD_WIDTH * 0.92}
        textAlign="center"
      >
        {description.slice(0, 120)}
        {description.length > 120 ? "…" : ""}
      </Text>
    </group>
  )
}

export type SolutionsVerticalWheelProps = {
  items: SolutionRingItem[]
  activeIndex: number
  onSelectIndex: (index: number) => void
  isDark: boolean
  reducedMotion?: boolean
  /** Position X of the whole wheel (default 5.4) */
  positionX?: number
  /** Optional: drive rotation from outside (angle in rad). If not provided, wheel uses its own rotation. */
  syncRotationX?: number
}

export function SolutionsVerticalWheel({
  items,
  activeIndex,
  onSelectIndex,
  isDark,
  reducedMotion = false,
  positionX = 5.4,
  syncRotationX,
}: SolutionsVerticalWheelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const currentRotationXRef = useRef(0)
  const targetRotationXRef = useRef(0)
  const cardGroupRefs = useRef<(THREE.Group | null)[]>([])
  const currentScalesRef = useRef<number[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const N = Math.max(1, items.length)

  useEffect(() => {
    if (syncRotationX !== undefined) return
    targetRotationXRef.current = -Math.PI / 2 + activeIndex * (2 * Math.PI) / N
    currentRotationXRef.current = targetRotationXRef.current
  }, [activeIndex, N, syncRotationX])

  if (currentScalesRef.current.length !== N) {
    currentScalesRef.current = Array(N).fill(1)
  }

  useFrame(() => {
    const g = groupRef.current
    if (!g || N <= 0) return
    const targetX =
      syncRotationX !== undefined
        ? syncRotationX
        : targetRotationXRef.current
    if (syncRotationX === undefined) {
      const lerp = reducedMotion ? 0.25 : LERP_FACTOR
      const next = THREE.MathUtils.lerp(
        currentRotationXRef.current,
        targetX,
        lerp
      )
      currentRotationXRef.current = next
      g.rotation.x = next
    } else {
      g.rotation.x = targetX
    }
  })

  useFrame(() => {
    const refs = cardGroupRefs.current
    const scales = currentScalesRef.current
    if (scales.length !== N) return
    for (let i = 0; i < N; i++) {
      const targetScale =
        i === activeIndex ? ACTIVE_CARD_ZOOM : i === hoveredIndex ? 1.08 : 0.7
      const next = THREE.MathUtils.lerp(scales[i], targetScale, ZOOM_LERP)
      scales[i] = next
      const group = refs[i]
      if (group) group.scale.set(next, next, 1)
    }
  })

  return (
    <group
      ref={groupRef}
      position={[positionX, 0, 0]}
      scale={[VERTICAL_RING_SCALE, VERTICAL_RING_SCALE, VERTICAL_RING_SCALE]}
    >
      {items.map((item, index) => {
        const angle = (index * 2 * Math.PI) / N
        const y = VERTICAL_RING_RADIUS * Math.cos(angle)
        const z = VERTICAL_RING_RADIUS * Math.sin(angle)
        return (
          <group
            key={item.id}
            ref={(el) => {
              cardGroupRefs.current[index] = el
            }}
            position={[0, y, z]}
            scale={[1, 1, 1]}
          >
            <Billboard follow lockY>
              <DescriptionCard
                title={item.name ?? ""}
                description={
                  typeof item.shortDescription === "string"
                    ? item.shortDescription
                    : ""
                }
                isDark={isDark}
                isActive={index === activeIndex}
                isHovered={hoveredIndex === index}
                onPointerDown={(e: ThreeEvent<PointerEvent>) => {
                  e.stopPropagation()
                  onSelectIndex(index)
                }}
                onPointerEnter={(e: ThreeEvent<PointerEvent>) => {
                  e.stopPropagation()
                  setHoveredIndex(index)
                }}
                onPointerLeave={() => setHoveredIndex(null)}
              />
            </Billboard>
          </group>
        )
      })}
    </group>
  )
}
