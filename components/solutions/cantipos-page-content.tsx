"use client"

import { useState } from "react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"
import { CantiPosProblemChart, CantiPosImpactChart } from "@/components/solutions/cantipos-charts"
import {
  CreditCard,
  BarChart3,
  Users,
  Settings,
  ArrowRight,
} from "lucide-react"

/** Tries .jpg then .png; shows alt text as fallback if image is missing */
function CantiPosImage({ alt, srcBase }: { alt: string; srcBase: "Canti1" | "Canti2" }) {
  const [attempt, setAttempt] = useState<0 | 1 | 2>(0) // 0 = .jpg, 1 = .png, 2 = show placeholder
  const ext = attempt === 0 ? ".jpg" : ".png"
  const src = `/images/${srcBase}${ext}`
  if (attempt === 2) {
    return (
      <div className="flex min-h-[200px] w-full items-center justify-center rounded-2xl bg-muted/50 px-4 py-8 text-center text-sm text-muted-foreground">
        {alt}
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover"
      loading="lazy"
      onError={() => setAttempt((a) => (a === 0 ? 1 : 2))}
    />
  )
}

const SECTION_BG = "bg-[#fbfbfb] dark:bg-[#040404]"
const SECTION_RADIAL = "bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.04),transparent_50%)]"

type CantiposPageT = {
  sectionChallenges: string
  sectionOverview: string
  sectionIdentification: string
  sectionModules: string
  sectionStatistics: string
  sectionMultiSite: string
  ctaHeadline: string
  ctaSubtext: string
  requestDemo: string
  contactTeam: string
  modulePos: string
  moduleStatistics: string
  moduleClients: string
  moduleAdmin: string
  challengesPara1?: string
  challengesBullets?: readonly string[]
  overviewPara?: string
  overviewBullets?: readonly string[]
  multiIdentifierTitle?: string
  multiIdentifierItems?: readonly string[]
  paymentOptionsTitle?: string
  paymentOptionsItems?: readonly string[]
  modulePosItems?: readonly string[]
  moduleStatisticsItems?: readonly string[]
  moduleClientsItems?: readonly string[]
  moduleAdminItems?: readonly string[]
  statisticsBullets?: readonly string[]
  multiSiteBullets?: readonly string[]
  imageAltAnalytics?: string
  imageAltCorporate?: string
  imageAltCanti1?: string
  imageAltCanti2?: string
}

export function CantiPosPageContent() {
  const { t } = useI18n()
  const s = (t.cantiposPage ?? t) as CantiposPageT

  return (
    <>
      {/* 1) Challenges in Collective Catering */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionChallenges}
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>{s.challengesPara1}</p>
              <ul className="list-disc space-y-2 pl-5">
                {(s.challengesBullets ?? []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="min-h-0 w-full">
              <CantiPosProblemChart />
            </div>
          </div>
        </div>
      </section>

      {/* 2) CantiPos Solution Overview */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionOverview}
          </h2>
          <div className="mt-10 flex flex-col gap-10 rounded-2xl border border-border/60 bg-card/50 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)] sm:p-8 lg:flex-row lg:items-center lg:gap-16">
            <div className="min-w-0 flex-1 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>{s.overviewPara}</p>
              <ul className="list-disc space-y-2 pl-5">
                {(s.overviewBullets ?? []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-2xl border border-border/60 bg-card/40 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)] lg:w-80">
              <CantiPosImage alt={s.imageAltCanti1 ?? "CantiPos solution overview"} srcBase="Canti1" />
            </div>
          </div>
        </div>
      </section>

      {/* 3) Smart Identification & Payments */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionIdentification}
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div className="space-y-8">
              <div>
                <h3 className="font-hero text-lg font-medium tracking-[-0.02em] text-foreground">{s.multiIdentifierTitle}</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {(s.multiIdentifierItems ?? []).map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-hero text-lg font-medium tracking-[-0.02em] text-foreground">{s.paymentOptionsTitle}</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {(s.paymentOptionsItems ?? []).map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative aspect-video min-h-0 w-full overflow-hidden rounded-2xl border border-border/60 bg-card/40 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <CantiPosImage alt={s.imageAltCanti2 ?? "CantiPos identification and payments"} srcBase="Canti2" />
            </div>
          </div>
        </div>
      </section>

      {/* 4) Core Modules */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionModules}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {[
              { icon: CreditCard, title: s.modulePos, items: s.modulePosItems ?? [] },
              { icon: BarChart3, title: s.moduleStatistics, items: s.moduleStatisticsItems ?? [] },
              { icon: Users, title: s.moduleClients, items: s.moduleClientsItems ?? [] },
              { icon: Settings, title: s.moduleAdmin, items: s.moduleAdminItems ?? [] },
            ].map(({ icon: Icon, title, items }) => (
              <div
                key={title}
                className={cn(
                  "rounded-2xl border border-border/60 bg-card/50 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
                  "dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
                )}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/60 dark:bg-white/10">
                  <Icon className="h-5 w-5 text-foreground/80" aria-hidden />
                </div>
                <h3 className="font-hero mt-4 text-lg font-semibold tracking-[-0.02em] text-foreground">
                  {title}
                </h3>
                <ul className="mt-3 space-y-2 text-sm leading-snug text-muted-foreground">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5) Statistics & Operational Control */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionStatistics}
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <ul className="space-y-3 text-base text-muted-foreground">
              {(s.statisticsBullets ?? []).map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="min-h-0 w-full">
              <CantiPosImpactChart />
            </div>
          </div>
        </div>
      </section>

      {/* 6) Multi-site & Administration */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionMultiSite}
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <ul className="space-y-3 text-base text-muted-foreground">
              {(s.multiSiteBullets ?? []).map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/60 bg-card/40 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <CantiPosImage alt={s.imageAltCanti1 ?? s.imageAltCorporate ?? "Corporate or institutional environment"} srcBase="Canti1" />
            </div>
          </div>
        </div>
      </section>

      {/* 7) Call To Action */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: "linear-gradient(135deg, hsl(var(--accent) / 0.12) 0%, hsl(var(--muted)) 50%, hsl(var(--background)) 100%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_50%_at_50%_100%,rgba(0,0,0,0.04),transparent)] dark:bg-[radial-gradient(80%_50%_at_50%_100%,rgba(255,255,255,0.06),transparent)]" aria-hidden />
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl lg:text-4xl">
            {s.ctaHeadline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {s.ctaSubtext}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-5">
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-[0_4px_14px_rgba(0,0,0,0.1)]",
                "transition-all hover:opacity-95 hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] active:scale-[0.98]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
            >
              {s.requestDemo}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-border bg-transparent px-6 py-3.5 font-medium text-foreground",
                "transition-all hover:bg-muted/60 hover:border-border dark:border-white/20 dark:hover:bg-white/10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
            >
              {s.contactTeam}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
