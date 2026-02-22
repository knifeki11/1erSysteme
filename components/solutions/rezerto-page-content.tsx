"use client"

import Link from "next/link"
import Image from "next/image"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"
import { RezerToImpactChart, RezerToOperationalLossChart } from "@/components/solutions/rezerto-charts"
import {
  LayoutGrid,
  CalendarClock,
  Globe,
  LayoutDashboard,
  Building2,
  MessageSquare,
  UtensilsCrossed,
  Hotel,
  Star,
  Store,
  CalendarDays,
  Utensils,
  ArrowRight,
  Check,
} from "lucide-react"

const SECTION_BG = "bg-[#fbfbfb] dark:bg-[#040404]"
const SECTION_RADIAL = "bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.04),transparent_50%)]"

type RezertoPageT = {
  sectionChallenges: string
  sectionOverview: string
  sectionCapabilities: string
  sectionHowItWorks: string
  sectionBenefits: string
  sectionTargetUsers: string
  ctaHeadline: string
  ctaSubtext: string
  requestDemo: string
  contactExperts: string
  step1: string
  step2: string
  step3: string
  step4: string
  step5: string
  capabilityFloorPlan: string
  capabilityAvailability: string
  capabilityOnlineReservations: string
  capabilityDashboard: string
  capabilityMultiRestaurant: string
  capabilityCommunication: string
  targetRestaurantGroups: string
  targetHotelRestaurants: string
  targetFineDining: string
  targetFranchise: string
  targetEventVenues: string
  targetFoodCourts: string
  challengesPara1?: string
  challengesPara2?: string
  challengesBullets?: readonly string[]
  overviewPara?: string
  overviewBullets?: readonly string[]
  capabilityFloorPlanDesc?: string
  capabilityAvailabilityDesc?: string
  capabilityOnlineReservationsDesc?: string
  capabilityDashboardDesc?: string
  capabilityMultiRestaurantDesc?: string
  capabilityCommunicationDesc?: string
  benefits?: readonly string[]
  targetRestaurantGroupsDesc?: string
  targetHotelRestaurantsDesc?: string
  targetFineDiningDesc?: string
  targetFranchiseDesc?: string
  targetEventVenuesDesc?: string
  targetFoodCourtsDesc?: string
  imageAltRezerto?: string
  sectionProblemHeadline?: string
  sectionProblemBullets?: readonly string[]
  sectionSolutionHeadline?: string
  sectionSolutionFeatures?: readonly string[]
  sectionBenefitsHeadline?: string
  sectionBenefitsStatsIntro?: string
  sectionBenefitsOptimization?: string
  sectionBenefitsErrors?: string
}

export function RezerToPageContent() {
  const { t } = useI18n()
  const r = (t.rezertoPage ?? t) as RezertoPageT

  return (
    <>
      {/* 1) Section Problème */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {r.sectionProblemHeadline ?? r.sectionChallenges}
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <ul className="space-y-3 text-base leading-relaxed text-muted-foreground">
              {(r.sectionProblemBullets ?? r.challengesBullets ?? []).map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive/70 dark:bg-destructive/50" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="min-h-0 w-full">
              <RezerToOperationalLossChart />
            </div>
          </div>
        </div>
      </section>

      {/* 2) Section Solution */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {r.sectionSolutionHeadline ?? r.sectionOverview}
          </h2>
          <div className="mt-10 flex flex-col gap-10 rounded-2xl border border-border/60 bg-card/50 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)] sm:p-8 lg:flex-row lg:items-center lg:gap-16">
            <ul className="min-w-0 flex-1 space-y-3 text-base leading-relaxed text-muted-foreground">
              {(r.sectionSolutionFeatures ?? r.overviewBullets ?? []).map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="w-full shrink-0 lg:w-[22rem]">
              <div className="relative overflow-hidden rounded-xl border border-border/50 bg-muted/30 dark:border-white/10 dark:bg-white/5">
                <Image
                  src="/images/Rezerto1.jpg"
                  alt={r.imageAltRezerto ?? "RezerTo reservation and table management interface"}
                  width={704}
                  height={528}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 22rem"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3) Core Capabilities */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {r.sectionCapabilities}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: LayoutGrid, title: r.capabilityFloorPlan, desc: r.capabilityFloorPlanDesc },
              { icon: CalendarClock, title: r.capabilityAvailability, desc: r.capabilityAvailabilityDesc },
              { icon: Globe, title: r.capabilityOnlineReservations, desc: r.capabilityOnlineReservationsDesc },
              { icon: LayoutDashboard, title: r.capabilityDashboard, desc: r.capabilityDashboardDesc },
              { icon: Building2, title: r.capabilityMultiRestaurant, desc: r.capabilityMultiRestaurantDesc },
              { icon: MessageSquare, title: r.capabilityCommunication, desc: r.capabilityCommunicationDesc },
            ].map(({ icon: Icon, title, desc }) => (
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
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4) How It Works */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {r.sectionHowItWorks}
          </h2>
          <div className="relative mt-12">
            <div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-border dark:bg-white/20 lg:block" style={{ marginLeft: "calc(6rem + 2%)", marginRight: "calc(6rem + 2%)" }} aria-hidden />
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-2">
              {[
                { step: 1, label: r.step1 },
                { step: 2, label: r.step2 },
                { step: 3, label: r.step3 },
                { step: 4, label: r.step4 },
                { step: 5, label: r.step5 },
              ].map(({ step, label }) => (
                <div key={step} className="flex flex-1 flex-col items-center text-center">
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-border bg-card font-hero text-sm font-semibold text-foreground dark:border-white/20 dark:bg-white/10">
                    {step}
                  </div>
                  <p className="mt-4 max-w-[10rem] text-sm font-medium leading-snug text-foreground sm:max-w-[14rem] lg:max-w-none">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5) Section Avantages Business */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {r.sectionBenefitsHeadline ?? r.sectionBenefits}
          </h2>
          {(r.sectionBenefitsStatsIntro != null || r.sectionBenefitsOptimization != null || r.sectionBenefitsErrors != null) && (
            <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-base font-medium text-foreground">
              {r.sectionBenefitsStatsIntro != null && <span>{r.sectionBenefitsStatsIntro}</span>}
              {r.sectionBenefitsOptimization != null && <span className="text-accent">{r.sectionBenefitsOptimization}</span>}
              {r.sectionBenefitsErrors != null && <span className="text-accent">{r.sectionBenefitsErrors}</span>}
            </div>
          )}
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <ul className="space-y-3 text-base text-muted-foreground">
              {(r.benefits ?? []).map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <RezerToImpactChart />
          </div>
        </div>
      </section>

      {/* 6) Target Users / Use Cases */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {r.sectionTargetUsers}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: UtensilsCrossed, title: r.targetRestaurantGroups, desc: r.targetRestaurantGroupsDesc },
              { icon: Hotel, title: r.targetHotelRestaurants, desc: r.targetHotelRestaurantsDesc },
              { icon: Star, title: r.targetFineDining, desc: r.targetFineDiningDesc },
              { icon: Store, title: r.targetFranchise, desc: r.targetFranchiseDesc },
              { icon: CalendarDays, title: r.targetEventVenues, desc: r.targetEventVenuesDesc },
              { icon: Utensils, title: r.targetFoodCourts, desc: r.targetFoodCourtsDesc },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className={cn(
                  "rounded-2xl border border-border/60 bg-card/50 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
                  "dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
                )}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/60 dark:bg-white/10">
                  <Icon className="h-5 w-5 text-foreground/80" aria-hidden />
                </div>
                <h3 className="font-hero mt-3 text-base font-semibold tracking-[-0.02em] text-foreground">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
                  {desc}
                </p>
              </div>
            ))}
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
            {r.ctaHeadline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {r.ctaSubtext}
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
              {r.requestDemo}
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
              {r.contactExperts}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
