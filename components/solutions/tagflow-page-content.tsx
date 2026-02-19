"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"
import { TagFlowLinenLossChart, TagFlowSavingsWaterfallChart } from "@/components/solutions/tagflow-charts"
import {
  Tag,
  Package,
  Truck,
  MapPin,
  Bell,
  History,
  Building2,
  Waves,
  Users,
  Shirt,
  Sparkles,
  Network,
  ArrowRight,
} from "lucide-react"

const SECTION_BG = "bg-[#fbfbfb] dark:bg-[#040404]"
const SECTION_RADIAL = "bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.04),transparent_50%)]"

type TagflowPageT = {
  sectionProblem: string
  sectionOverview: string
  sectionHowItWorks: string
  sectionCapabilities: string
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
  capabilityItemTracking: string
  capabilityInventory: string
  capabilityLaundry: string
  capabilityZones: string
  capabilityAlerts: string
  capabilityTraceability: string
  targetHotels: string
  targetSpas: string
  targetHospitalityGroups: string
  targetLaundry: string
  targetLuxury: string
  targetMultiSite: string
  problemPara1?: string
  problemBullets?: readonly string[]
  overviewPara?: string
  overviewBullets?: readonly string[]
  capabilityItemTrackingDesc?: string
  capabilityInventoryDesc?: string
  capabilityLaundryDesc?: string
  capabilityZonesDesc?: string
  capabilityAlertsDesc?: string
  capabilityTraceabilityDesc?: string
  benefits?: readonly string[]
  targetHotelsDesc?: string
  targetSpasDesc?: string
  targetHospitalityGroupsDesc?: string
  targetLaundryDesc?: string
  targetLuxuryDesc?: string
  targetMultiSiteDesc?: string
  imageAltAnalytics?: string
  imageAltRfid?: string
  imageAltGadj1?: string
}

export function TagFlowPageContent() {
  const { t } = useI18n()
  const s = (t.tagflowPage ?? t) as TagflowPageT

  return (
    <>
      {/* 1) Hospitality Industry Problem */}
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
              <TagFlowLinenLossChart />
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
              <img src="/images/RFID.jpg" alt={s.imageAltRfid ?? "TagFlow RFID tracking"} className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* 3) How RFID Tracking Works */}
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
          <div className="mx-auto mt-14 w-full max-w-lg overflow-hidden rounded-2xl border border-border/60 bg-card/40 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
            <img src="/images/Gadj1.jpg" alt={s.imageAltGadj1 ?? "TagFlow tracking and alerts"} className="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* 4) Key Capabilities */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionCapabilities}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Tag, title: s.capabilityItemTracking, desc: s.capabilityItemTrackingDesc },
              { icon: Package, title: s.capabilityInventory, desc: s.capabilityInventoryDesc },
              { icon: Truck, title: s.capabilityLaundry, desc: s.capabilityLaundryDesc },
              { icon: MapPin, title: s.capabilityZones, desc: s.capabilityZonesDesc },
              { icon: Bell, title: s.capabilityAlerts, desc: s.capabilityAlertsDesc },
              { icon: History, title: s.capabilityTraceability, desc: s.capabilityTraceabilityDesc },
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

      {/* 5) Operational & Financial Benefits */}
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
            <div className="min-h-0 w-full">
              <TagFlowSavingsWaterfallChart />
            </div>
          </div>
        </div>
      </section>

      {/* 6) Ideal Clients / Use Cases */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionTargetUsers}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Building2, title: s.targetHotels, desc: s.targetHotelsDesc },
              { icon: Waves, title: s.targetSpas, desc: s.targetSpasDesc },
              { icon: Users, title: s.targetHospitalityGroups, desc: s.targetHospitalityGroupsDesc },
              { icon: Shirt, title: s.targetLaundry, desc: s.targetLaundryDesc },
              { icon: Sparkles, title: s.targetLuxury, desc: s.targetLuxuryDesc },
              { icon: Network, title: s.targetMultiSite, desc: s.targetMultiSiteDesc },
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
