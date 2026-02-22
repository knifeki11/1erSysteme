"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"
import { useTheme } from "@/lib/theme-context"
import { PageShell } from "@/components/page-shell"
import { HeroBackground } from "@/components/hero-background"
import { ServiceCategoryCard } from "@/components/services/service-category-card"
import { ProcessStepper } from "@/components/services/process-stepper"
import { useHeroScrollLock, PAGE_HERO_ID } from "@/lib/use-hero-scroll-lock"
import { cn } from "@/lib/utils"

export default function ServicesOverviewPage() {
  const { t } = useI18n()
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const o = t.servicesOverview as {
    heroTitle: string
    heroSubtitle: string
    ctaPrimary: string
    ctaSecondary: string
    category1Title: string
    category1Pitch: string
    category1Bullets: readonly string[]
    category1Cta: string
    category2Title: string
    category2Pitch: string
    category2Bullets: readonly string[]
    category2Cta: string
    methodTitle: string
    methodSteps: readonly { label: string; title: string }[]
  }

  useHeroScrollLock(PAGE_HERO_ID)

  return (
    <PageShell>
      {/* Hero */}
      <section
        id={PAGE_HERO_ID}
        className="relative flex h-screen min-h-0 items-center overflow-hidden"
        data-header-theme={isDark ? "inverted" : undefined}
      >
        <HeroBackground />
        {isDark && (
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-[65%]"
            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0))" }}
            aria-hidden
          />
        )}
        <div className="relative z-10 w-full px-10 sm:px-16 md:px-20 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <h1
              className={cn(
                "font-hero max-w-4xl text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]",
                isDark ? "text-white" : "text-slate-900"
              )}
            >
              {o.heroTitle}
            </h1>
            <p
              className={cn(
                "mt-4 max-w-2xl text-base sm:text-lg",
                isDark ? "text-white/85" : "text-muted-foreground"
              )}
            >
              {o.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                {o.ctaPrimary}
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors",
                  isDark
                    ? "border-white/40 text-white hover:bg-white/10"
                    : "border-border bg-background text-foreground hover:bg-muted/50"
                )}
              >
                {o.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Two category cards */}
      <section className="relative py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,0,0,0.02),transparent_50%)] dark:bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.03),transparent_50%)]" aria-hidden />
        <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <ServiceCategoryCard
              title={o.category1Title}
              pitch={o.category1Pitch}
              bullets={o.category1Bullets}
              ctaLabel={o.category1Cta}
              href="/services/developpement"
            />
            <ServiceCategoryCard
              title={o.category2Title}
              pitch={o.category2Pitch}
              bullets={o.category2Bullets}
              ctaLabel={o.category2Cta}
              href="/services/infrastructure-reseau"
            />
          </div>
        </div>
      </section>

      {/* Notre méthode */}
      <ProcessStepper title={o.methodTitle} steps={o.methodSteps} />
    </PageShell>
  )
}
