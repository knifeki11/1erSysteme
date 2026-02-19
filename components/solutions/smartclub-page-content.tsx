"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"
import { SmartClubRevenueLossChart, SmartClubImpactChart } from "@/components/solutions/smartclub-charts"
import {
  Radio,
  TrendingUp,
  Monitor,
  Trophy,
  Users,
  BarChart3,
  CircleDot,
  LayoutGrid,
  Gamepad2,
  Building2,
  GraduationCap,
  Dumbbell,
  ArrowRight,
} from "lucide-react"

const SECTION_BG = "bg-[#fbfbfb] dark:bg-[#040404]"
const SECTION_RADIAL = "bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.04),transparent_50%)]"

type SmartclubPageT = {
  sectionProblem: string
  sectionOverview: string
  sectionCapabilities: string
  sectionHowItWorks: string
  sectionBenefits: string
  sectionTargetUsers: string
  ctaHeadline: string
  ctaSubtext: string
  requestDemo: string
  contactTeam: string
  step1: string
  step2: string
  step3: string
  step4: string
  step5: string
  capabilityRfid: string
  capabilityRevenue: string
  capabilityRemote: string
  capabilityTournament: string
  capabilityLoyalty: string
  capabilityStaff: string
  targetBilliardHalls: string
  targetSnookerClubs: string
  targetGamingLounges: string
  targetEntertainmentCenters: string
  targetStudentRecreation: string
  targetSportsClubs: string
  problemPara1?: string
  problemBullets?: readonly string[]
  overviewPara?: string
  overviewBullets?: readonly string[]
  capabilityRfidDesc?: string
  capabilityRevenueDesc?: string
  capabilityRemoteDesc?: string
  capabilityTournamentDesc?: string
  capabilityLoyaltyDesc?: string
  capabilityStaffDesc?: string
  benefits?: readonly string[]
  targetBilliardHallsDesc?: string
  targetSnookerClubsDesc?: string
  targetGamingLoungesDesc?: string
  targetEntertainmentCentersDesc?: string
  targetStudentRecreationDesc?: string
  targetSportsClubsDesc?: string
  imageAltSmartC1?: string
}

export function SmartClubPageContent() {
  const { t } = useI18n()
  const s = (t.smartclubPage ?? t) as SmartclubPageT

  return (
    <>
      {/* 1) Industry Problem */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionProblem}
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>{s.problemPara1}</p>
              <ul className="list-disc space-y-2 pl-5">
                {(s.problemBullets ?? []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="min-h-0 w-full">
              <SmartClubRevenueLossChart />
            </div>
          </div>
        </div>
      </section>

      {/* 2) Solution Overview */}
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
              <img src="/images/SmarC1.jpg" alt={s.imageAltSmartC1 ?? "SmartClub intelligent gaming space"} className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* 3) Key System Capabilities */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionCapabilities}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Radio, title: s.capabilityRfid, desc: s.capabilityRfidDesc },
              { icon: TrendingUp, title: s.capabilityRevenue, desc: s.capabilityRevenueDesc },
              { icon: Monitor, title: s.capabilityRemote, desc: s.capabilityRemoteDesc },
              { icon: Trophy, title: s.capabilityTournament, desc: s.capabilityTournamentDesc },
              { icon: Users, title: s.capabilityLoyalty, desc: s.capabilityLoyaltyDesc },
              { icon: BarChart3, title: s.capabilityStaff, desc: s.capabilityStaffDesc },
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

      {/* 4) How the System Works */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionHowItWorks}
          </h2>
          <div className="relative mt-12">
            <div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-border dark:bg-white/20 lg:block" style={{ marginLeft: "calc(6rem + 2%)", marginRight: "calc(6rem + 2%)" }} aria-hidden />
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-2">
              {[
                { step: 1, label: s.step1 },
                { step: 2, label: s.step2 },
                { step: 3, label: s.step3 },
                { step: 4, label: s.step4 },
                { step: 5, label: s.step5 },
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

      {/* 5) Revenue & Operational Benefits */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionBenefits}
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <ul className="space-y-3 text-base text-muted-foreground">
              {(s.benefits ?? []).map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <SmartClubImpactChart />
          </div>
        </div>
      </section>

      {/* 6) Ideal Venues / Use Cases */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionTargetUsers}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: CircleDot, title: s.targetBilliardHalls, desc: s.targetBilliardHallsDesc },
              { icon: LayoutGrid, title: s.targetSnookerClubs, desc: s.targetSnookerClubsDesc },
              { icon: Gamepad2, title: s.targetGamingLounges, desc: s.targetGamingLoungesDesc },
              { icon: Building2, title: s.targetEntertainmentCenters, desc: s.targetEntertainmentCentersDesc },
              { icon: GraduationCap, title: s.targetStudentRecreation, desc: s.targetStudentRecreationDesc },
              { icon: Dumbbell, title: s.targetSportsClubs, desc: s.targetSportsClubsDesc },
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
