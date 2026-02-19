"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { DistrexProblemChart, DistrexImpactChart, DistrexCashChart, DistrexVisitsChart } from "@/components/solutions/distrex-charts"

const SECTION_BG = "bg-[#fbfbfb] dark:bg-[#040404]"
const SECTION_RADIAL = "bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.04),transparent_50%)]"

type DistrexPageT = {
  sectionChallenges: string
  sectionOverview: string
  sectionSalesForce: string
  sectionStock: string
  sectionCash: string
  sectionGeolocation: string
  sectionVisits: string
  sectionBenefits: string
  ctaHeadline: string
  ctaSubtext: string
  requestDemo: string
  contactSales: string
  challengesPara1?: string
  challengesBullets?: readonly string[]
  overviewPara?: string
  overviewBullets?: readonly string[]
  imageAltDistribution?: string
  imageAltDistr?: string
  imageAltDist1?: string
  imageAltDist2?: string
}

function TwoColSection({
  title,
  children,
  imageSrc,
  imageAlt,
  rightContent,
}: {
  title: string
  children: React.ReactNode
  imageSrc?: string
  imageAlt?: string
  rightContent?: React.ReactNode
}) {
  const right = rightContent ?? (imageSrc && imageAlt ? (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-card/40 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
      <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover" loading="lazy" />
    </div>
  ) : null)
  return (
    <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
      <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
          {title}
        </h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            {children}
          </div>
          {right && <div className="min-h-0 w-full">{right}</div>}
        </div>
      </div>
    </section>
  )
}

export function DistrexPageContent() {
  const { t } = useI18n()
  const s = (t.distrexPage ?? t) as DistrexPageT

  return (
    <>
      {/* 1) Challenges of Field Distribution */}
      <TwoColSection
        title={s.sectionChallenges}
        rightContent={<DistrexProblemChart />}
      >
        <p>{s.challengesPara1}</p>
        <ul className="list-disc space-y-2 pl-5">
          {(s.challengesBullets ?? []).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TwoColSection>

      {/* 2) Distrex Overview */}
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
              <img src="/images/distr.jpg" alt={s.imageAltDistr ?? s.imageAltDistribution ?? "Distrex field operations"} className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* 3) Sales Force & Pre-Sales */}
      <TwoColSection
        title={s.sectionSalesForce}
        imageSrc="/images/dist1.jpg"
        imageAlt={s.imageAltDist1 ?? "Distrex sales force"}
      >
        <ul className="space-y-2 text-muted-foreground">
          {[
            "Real-time activity tracking",
            "Daily route planning",
            "On-site order entry",
            "Delivery notes & invoices generation",
            "Customer interaction history",
            "Performance monitoring",
            "Increased productivity",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </TwoColSection>

      {/* 4) Stock & Logistics */}
      <TwoColSection
        title={s.sectionStock}
        imageSrc="/images/dist2.jpg"
        imageAlt={s.imageAltDist2 ?? "Distrex stock and logistics"}
      >
        <ul className="space-y-2 text-muted-foreground">
          {[
            "Stock tracking per warehouse and vehicle",
            "Loading & unloading management",
            "Real-time inventory visibility",
            "Traceability of movements",
            "Returns management (unsold, damaged, errors)",
            "Reduced losses",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </TwoColSection>

      {/* 5) Cash Management */}
      <TwoColSection title={s.sectionCash} rightContent={<DistrexCashChart />}>
        <ul className="space-y-2 text-muted-foreground">
          {[
            "Recording payments on-site",
            "Daily cash reconciliation",
            "Automated reports",
            "Reduced fraud risk",
            "Accurate financial tracking",
            "Integration with sales data",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </TwoColSection>

      {/* 6) Geolocation & Routes */}
      <TwoColSection title={s.sectionGeolocation} rightContent={<DistrexVisitsChart />}>
        <ul className="space-y-2 text-muted-foreground">
          {[
            "Live tracking of sales representatives",
            "Route visualization",
            "Location-based validation",
            "Travel optimization",
            "Reduced fuel costs",
            "Transparency for management",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </TwoColSection>

      {/* 7) Visit Management */}
      <TwoColSection
        title={s.sectionVisits}
        imageSrc="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80"
        imageAlt="Professional visiting client or store"
      >
        <ul className="space-y-2 text-muted-foreground">
          {[
            "Intelligent daily scheduling",
            "Verification of visits via GPS",
            "Alerts for missed visits",
            "Customer coverage optimization",
            "Improved service quality",
            "Accountability of teams",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </TwoColSection>

      {/* 8) Business Benefits */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionBenefits}
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Full operational visibility",
                "Increased productivity",
                "Reduced operational losses",
                "Optimized routes & time",
                "Better customer satisfaction",
                "Data-driven decision making",
                "Higher revenue efficiency",
              ].map((item) => (
                <div
                  key={item}
                  className={cn(
                    "rounded-xl border border-border/60 bg-card/50 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]",
                    "dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_2px_12px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                  )}
                >
                  <p className="text-sm font-medium leading-snug text-foreground">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 w-full">
              <DistrexImpactChart />
            </div>
          </div>
        </div>
      </section>

      {/* 9) Call To Action */}
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
              {s.contactSales}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
