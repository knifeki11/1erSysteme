"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { QuickPassProblemChart, QuickPassImpactChart, QuickPassRevenueChart, QuickPassTicketsChart } from "@/components/solutions/quickpass-charts"

const SECTION_BG = "bg-[#fbfbfb] dark:bg-[#040404]"
const SECTION_RADIAL = "bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.04),transparent_50%)]"

type QuickpassPageT = {
  sectionChallenges: string
  sectionOverview: string
  sectionTicketing: string
  sectionAccessControl: string
  sectionRevenue: string
  sectionVisitorFlow: string
  sectionHardware: string
  sectionAnalytics: string
  sectionBenefits: string
  ctaHeadline: string
  ctaSubtext: string
  requestDemo: string
  contactTeam: string
  challengesPara1?: string
  challengesBullets?: readonly string[]
  overviewPara?: string
  overviewBullets?: readonly string[]
  imageAltQuickP?: string
  imageAltQuickP2?: string
  imageAltQuickP3?: string
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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function QuickPassPageContent() {
  const { t } = useI18n()
  const s = (t.quickpassPage ?? t) as QuickpassPageT

  return (
    <>
      {/* 1) Access Management Challenges */}
      <TwoColSection title={s.sectionChallenges} rightContent={<QuickPassProblemChart />}>
        <p>{s.challengesPara1}</p>
        <ul className="list-disc space-y-2 pl-5">
          {(s.challengesBullets ?? []).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TwoColSection>

      {/* 2) QuickPass Overview */}
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
            <div className="w-full shrink-0 lg:w-80">
              <QuickPassTicketsChart />
            </div>
          </div>
        </div>
      </section>

      {/* 3) Online and On-Site Ticketing */}
      <TwoColSection
        title={s.sectionTicketing}
        imageSrc="/images/QuickP.jpg"
        imageAlt={s.imageAltQuickP ?? "QuickPass online and on-site ticketing"}
      >
        <BulletList
          items={[
            "Online ticket purchase",
            "On-site ticket issuance",
            "Unique QR code generation",
            "Secure payment processing",
            "Instant confirmation",
            "Mobile-friendly tickets",
            "Multi-channel distribution",
          ]}
        />
      </TwoColSection>

      {/* 4) Secure Entry Management */}
      <TwoColSection
        title={s.sectionAccessControl}
        imageSrc="/images/QuickP2.jpg"
        imageAlt={s.imageAltQuickP2 ?? "QuickPass secure entry management"}
      >
        <BulletList
          items={[
            "QR code scanning",
            "PDA/mobile validation devices",
            "Turnstile integration",
            "Instant ticket verification",
            "Prevention of unauthorized access",
            "Real-time entry tracking",
            "Multi-entry or single-entry configurations",
          ]}
        />
      </TwoColSection>

      {/* 5) Revenue Transparency */}
      <TwoColSection title={s.sectionRevenue} rightContent={<QuickPassRevenueChart />}>
        <BulletList
          items={[
            "Elimination of manual cash risks",
            "Automated revenue tracking",
            "Audit-ready transaction logs",
            "Secure payment integration (CMI)",
            "Detailed financial reporting",
            "Reduced leakage and fraud",
          ]}
        />
      </TwoColSection>

      {/* 6) Visitor Flow Optimization */}
      <TwoColSection
        title={s.sectionVisitorFlow}
        imageSrc="https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=800&q=80"
        imageAlt="Organized queue or crowd flow"
      >
        <BulletList
          items={[
            "Reduced waiting times",
            "Controlled entry rates",
            "Real-time capacity monitoring",
            "Queue management support",
            "Better crowd distribution",
            "Safer environment",
          ]}
        />
      </TwoColSection>

      {/* 7) Complete Turnkey Setup */}
      <TwoColSection
        title={s.sectionHardware}
        imageSrc="/images/QuickP3.jpg"
        imageAlt={s.imageAltQuickP3 ?? "QuickPass complete turnkey solution"}
      >
        <BulletList
          items={[
            "Ticketing software",
            "Access control hardware",
            "Kiosks and terminals",
            "Turnstiles and scanners",
            "Installation services",
            "Training for staff",
            "Local technical support",
          ]}
        />
      </TwoColSection>

      {/* 8) Analytics & Dashboard */}
      <TwoColSection
        title={s.sectionAnalytics}
        imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
        imageAlt="Analytics dashboard"
      >
        <BulletList
          items={[
            "Real-time attendance dashboards",
            "Visitor statistics",
            "Revenue analytics",
            "Peak hour analysis",
            "Event performance metrics",
            "Exportable reports",
            "Decision-making tools",
          ]}
        />
      </TwoColSection>

      {/* 9) Business Impact */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionBenefits}
          </h2>
          <div className="mt-10 w-full">
            <QuickPassImpactChart />
          </div>
        </div>
      </section>

      {/* 10) Call To Action */}
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
