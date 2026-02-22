"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"
import { useTheme } from "@/lib/theme-context"
import { PageShell } from "@/components/page-shell"
import { HeroBackground } from "@/components/hero-background"
import { DeliverablesGrid } from "@/components/services/deliverables-grid"
import { ProcessStepper } from "@/components/services/process-stepper"
import { CTASection } from "@/components/services/cta-section"
import { useHeroScrollLock, PAGE_HERO_ID } from "@/lib/use-hero-scroll-lock"
import { cn } from "@/lib/utils"

export default function ServicesInfrastructureReseauPage() {
  const { t } = useI18n()
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const p = t.servicesInfrastructurePage as {
    eyebrow: string
    title: string
    subtitle: string
    ctaQuote: string
    ctaVisit: string
    sectionInstall: string
    installCards: readonly { title: string; desc: string }[]
    sectionSupport: string
    supportTableIntro: string
    sectionProcess: string
    processSteps: readonly string[]
    ctaTitle: string
    ctaVisitLabel: string
    ctaQuoteLabel: string
  }

  useHeroScrollLock(PAGE_HERO_ID)

  return (
    <PageShell>
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
            {p.eyebrow && (
              <p
                className={cn(
                  "mb-3 text-xs font-medium uppercase tracking-widest",
                  isDark ? "text-white/80" : "text-muted-foreground"
                )}
              >
                {p.eyebrow}
              </p>
            )}
            <h1
              className={cn(
                "font-hero max-w-4xl text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]",
                isDark ? "text-white" : "text-slate-900"
              )}
            >
              {p.title}
            </h1>
            <p
              className={cn(
                "mt-4 max-w-2xl text-base sm:text-lg",
                isDark ? "text-white/85" : "text-muted-foreground"
              )}
            >
              {p.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                {p.ctaQuote}
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
                {p.ctaVisit}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <DeliverablesGrid title={p.sectionInstall} items={p.installCards} />

      {/* Support & maintenance — table card */}
      <section className="relative py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_100%,rgba(0,0,0,0.02),transparent_50%)] dark:bg-[radial-gradient(80%_50%_at_50%_100%,rgba(255,255,255,0.03),transparent_50%)]" aria-hidden />
        <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-10">
          <h2 className="font-hero text-2xl font-semibold text-foreground sm:text-3xl">{p.sectionSupport}</h2>
          <p className="mt-2 text-muted-foreground">{p.supportTableIntro}</p>
          <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card dark:border-white/10 dark:bg-white/5">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border dark:border-white/10">
                  <th className="px-4 py-3 font-medium text-foreground">SLA</th>
                  <th className="px-4 py-3 font-medium text-foreground">Horaires</th>
                  <th className="px-4 py-3 font-medium text-foreground">Temps de réponse</th>
                  <th className="px-4 py-3 font-medium text-foreground">Interventions</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr>
                  <td className="px-4 py-3">—</td>
                  <td className="px-4 py-3">Lun–Ven</td>
                  <td className="px-4 py-3">Sous 24h</td>
                  <td className="px-4 py-3">Sur devis</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <ProcessStepper
        title={p.sectionProcess}
        steps={p.processSteps.map((title) => ({ title }))}
      />

      <CTASection
        title={p.ctaTitle}
        primaryLabel={p.ctaVisitLabel}
        primaryHref="/contact"
        secondaryLabel={p.ctaQuoteLabel}
        secondaryHref="/contact"
      />
    </PageShell>
  )
}
