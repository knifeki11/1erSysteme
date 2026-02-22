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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

export default function ServicesDeveloppementPage() {
  const { t } = useI18n()
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const d = t.servicesDeveloppementPage as {
    eyebrow: string
    title: string
    subtitle: string
    ctaQuote: string
    ctaSolutions: string
    sectionDeliver: string
    deliverables: readonly { title: string; desc: string }[]
    sectionNeeds: string
    needCards: readonly { title: string; example: string }[]
    sectionApproach: string
    approachSteps: readonly string[]
    sectionFaq: string
    faq: readonly { q: string; a: string }[]
    ctaTitle: string
    ctaDemo: string
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
            {d.eyebrow && (
              <p
                className={cn(
                  "mb-3 text-xs font-medium uppercase tracking-widest",
                  isDark ? "text-white/80" : "text-muted-foreground"
                )}
              >
                {d.eyebrow}
              </p>
            )}
            <h1
              className={cn(
                "font-hero max-w-4xl text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]",
                isDark ? "text-white" : "text-slate-900"
              )}
            >
              {d.title}
            </h1>
            <p
              className={cn(
                "mt-4 max-w-2xl text-base sm:text-lg",
                isDark ? "text-white/85" : "text-muted-foreground"
              )}
            >
              {d.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                {d.ctaQuote}
              </Link>
              <Link
                href="/solutions"
                className={cn(
                  "inline-flex items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors",
                  isDark
                    ? "border-white/40 text-white hover:bg-white/10"
                    : "border-border bg-background text-foreground hover:bg-muted/50"
                )}
              >
                {d.ctaSolutions}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <DeliverablesGrid title={d.sectionDeliver} items={d.deliverables} />

      {/* Pour quels besoins */}
      <section className="relative py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_100%,rgba(0,0,0,0.02),transparent_50%)] dark:bg-[radial-gradient(80%_50%_at_50%_100%,rgba(255,255,255,0.03),transparent_50%)]" aria-hidden />
        <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
          <h2 className="font-hero text-2xl font-semibold text-foreground sm:text-3xl">{d.sectionNeeds}</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {d.needCards.map((card, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="font-medium text-foreground">{card.title}</h3>
                <p className="mt-1 text-sm text-primary">{card.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre approche — timeline */}
      <section className="relative py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,0,0,0.02),transparent_50%)] dark:bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.03),transparent_50%)]" aria-hidden />
        <div className="relative z-10 mx-auto max-w-3xl px-6 sm:px-10">
          <h2 className="font-hero text-2xl font-semibold text-foreground sm:text-3xl">{d.sectionApproach}</h2>
          <div className="mt-8 flex flex-col gap-2">
            {d.approachSteps.map((step, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl border border-border bg-card/50 px-4 py-3 dark:border-white/10 dark:bg-white/5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-medium text-primary">
                  {i + 1}
                </span>
                <span className="font-medium text-foreground">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_100%,rgba(0,0,0,0.02),transparent_50%)] dark:bg-[radial-gradient(80%_50%_at_50%_100%,rgba(255,255,255,0.03),transparent_50%)]" aria-hidden />
        <div className="relative z-10 mx-auto max-w-3xl px-6 sm:px-10">
          <h2 className="font-hero text-2xl font-semibold text-foreground sm:text-3xl">{d.sectionFaq}</h2>
          <Accordion type="single" collapsible className="mt-6 w-full">
            {d.faq.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border dark:border-white/10">
                <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CTASection
        title={d.ctaTitle}
        primaryLabel={d.ctaDemo}
        primaryHref="/contact"
        secondaryLabel={d.ctaQuoteLabel}
        secondaryHref="/contact"
      />
    </PageShell>
  )
}
