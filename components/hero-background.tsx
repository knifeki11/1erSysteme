"use client"

import dynamic from "next/dynamic"
import { useRef, useEffect } from "react"
import { useTheme } from "@/lib/theme-context"
import type { Application } from "@splinetool/runtime"

const Spline = dynamic(
  () => import("@splinetool/react-spline").then((mod) => mod.default),
  { ssr: false }
)

const HERO_SCENE = "/animated-bg/scene%20(1).splinecode"

/* Match the hero 3D cubes: magenta/pink glow. Light = soft pink tint, dark = deep base. */
const LIGHT_BG = "#fef5f9"
const DARK_BG = "#0a0a0a"

/** Full-span base: gradient matching cube colors — bright center, soft magenta/pink to edges. */
const LIGHT_BASE_GRADIENT =
  "radial-gradient(ellipse 160% 140% at 50% 50%, rgba(255,255,255,0.98) 0%, rgba(254,250,252,0.95) 30%, rgba(252,240,248,0.9) 55%, rgba(248,232,242,0.88) 80%, rgba(245,228,238,0.9) 100%), linear-gradient(135deg, #fef7fb 0%, #fce7f3 25%, #fad5eb 50%, #f5c4e0 75%, #f0b8d8 100%)"

const DARK_BASE_GRADIENT =
  "radial-gradient(ellipse 150% 130% at 50% 50%, rgba(28,22,32,0.95) 0%, rgba(22,18,26,0.92) 40%, rgba(14,12,18,0.95) 100%), linear-gradient(180deg, #0a0a0a 0%, #120c14 50%, #0e0a0e 100%)"

/** Overlay: magenta/pink tint on left/center; fades to transparent over the right so the cubes stay sharp. */
const LIGHT_OVERLAY_GRADIENT =
  "radial-gradient(ellipse 100% 100% at 28% 48%, rgba(236,180,220,0.5) 0%, rgba(244,200,230,0.35) 30%, rgba(250,220,240,0.15) 50%, transparent 72%), linear-gradient(90deg, rgba(240,190,225,0.42) 0%, rgba(248,210,235,0.12) 40%, transparent 58%)"

const DARK_OVERLAY_GRADIENT =
  "radial-gradient(ellipse 100% 100% at 28% 48%, rgba(180,80,140,0.28) 0%, rgba(140,60,120,0.16) 40%, transparent 65%), linear-gradient(90deg, rgba(120,50,100,0.22) 0%, transparent 45%)"

export function HeroBackground() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const appRef = useRef<Application | null>(null)

  useEffect(() => {
    const app = appRef.current
    if (!app) return
    app.setBackgroundColor(isDark ? DARK_BG : LIGHT_BG)
  }, [isDark])

  return (
    <div
      className="absolute inset-0 min-h-full min-w-full overflow-hidden border-0"
      style={{ backgroundColor: isDark ? DARK_BG : LIGHT_BG }}
      aria-hidden
    >
      {/* Full-span gradient behind Spline: covers entire hero, bright center, soft magenta/pink to edges (cube colors) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 min-h-full min-w-full"
        style={{
          backgroundImage: isDark ? DARK_BASE_GRADIENT : LIGHT_BASE_GRADIENT,
          backgroundColor: "transparent",
        }}
        aria-hidden
      />
      {/* Shift scene right so 3D blocks don't overlap left-aligned hero text. pointer-events-none so scroll/touch pass through. */}
      <div className="pointer-events-none absolute inset-0 z-[1] h-full w-full" style={{ transform: "translateX(15%)" }}>
        <Spline
          scene={HERO_SCENE}
          className="absolute inset-0 h-full w-full min-h-full min-w-full"
          onLoad={(app) => {
            appRef.current = app
            app.setZoom(1)
            app.setBackgroundColor(isDark ? DARK_BG : LIGHT_BG)
            if (!isDark) {
              const again = () => app.setBackgroundColor(LIGHT_BG)
              requestAnimationFrame(again)
              setTimeout(again, 100)
            }
          }}
        />
      </div>
      {/* Full-span gradient overlay: magenta/pink tint on left, fades over 3D cubes */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] min-h-full min-w-full"
        style={{
          backgroundImage: isDark ? DARK_OVERLAY_GRADIENT : LIGHT_OVERLAY_GRADIENT,
          backgroundColor: "transparent",
        }}
        aria-hidden
      />
      {isDark && (
        <div
          className="pointer-events-none absolute inset-0 z-[3] bg-black/45"
          aria-hidden
        />
      )}
    </div>
  )
}
