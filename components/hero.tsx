"use client"

import { useEffect } from "react"
import { useI18n } from "@/lib/i18n-context"
import { useTheme } from "@/lib/theme-context"
import { HeroBackground } from "@/components/hero-background"

const HERO_ID = "home"

export function Hero() {
  const { t } = useI18n()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const hero = document.getElementById(HERO_ID)
      if (!hero) return
      const inHeroZone = window.scrollY < window.innerHeight - 10
      if (!inHeroZone) return
      const target = e.target as Node
      if (!hero.contains(target)) return
      e.stopPropagation()
      e.stopImmediatePropagation()
    }
    document.addEventListener("wheel", handleWheel, { passive: true, capture: true })
    return () => document.removeEventListener("wheel", handleWheel, { capture: true })
  }, [])

  return (
    <section
      id={HERO_ID}
      data-header-theme={isDark ? "inverted" : undefined}
      className="relative flex h-screen min-h-0 items-center overflow-hidden"
    >
      <HeroBackground />

      {/* Text contrast overlay: dark mode only; light mode left half stays clean (no grey overlay) */}
      {isDark && (
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[65%]"
          style={{
            background: "linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0))",
          }}
        />
      )}

      {/* Content -- massive left-aligned headline like TACT */}
      <div className="relative z-10 w-full px-10 sm:px-16 md:px-20 lg:px-24 pointer-events-none">
        <h1
          className={`font-hero max-w-5xl text-[clamp(2.5rem,6.5vw,6.5rem)] font-bold leading-[1.05] tracking-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}
          style={{ fontWeight: 700 }}
        >
          {t.hero.headlineLine1}
          <br />
          {t.hero.headlineLine2}
        </h1>

        {/* Second block with spacing */}
        <h2
          className={`font-hero mt-6 max-w-5xl text-[clamp(2.5rem,6.5vw,6.5rem)] font-bold leading-[1.05] tracking-tight sm:mt-8 ${
            isDark ? "text-white" : "text-slate-900"
          }`}
          style={{ fontWeight: 700 }}
        >
          {t.hero.headlineLine3}
          <br />
          {t.hero.headlineLine4}
        </h2>
      </div>
    </section>
  )
}
