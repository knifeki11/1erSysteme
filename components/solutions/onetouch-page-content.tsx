"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { OneTouchProblemChart, OneTouchImpactChart, OneTouchStockChart, OneTouchOrdersChart, OneTouchCostChart } from "@/components/solutions/onetouch-charts"

const SECTION_BG = "bg-[#fbfbfb] dark:bg-[#040404]"
const SECTION_RADIAL = "bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.04),transparent_50%)]"

type OnetouchPageT = {
  sectionChallenges: string
  sectionOverview: string
  sectionProcurement: string
  sectionInventory: string
  sectionProduction: string
  sectionTraceability: string
  sectionAnalytics: string
  sectionBenefits: string
  sectionMultiSite: string
  ctaHeadline: string
  ctaSubtext: string
  requestDemo: string
  contactTeam: string
  challengesPara1?: string
  challengesBullets?: readonly string[]
  imageAltWarehouse?: string
  imageAltOneT?: string
  imageAltOneT1?: string
  imageAltOneT2?: string
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

export function OneTouchPageContent() {
  const { t } = useI18n()
  const s = (t.onetouchPage ?? t) as OnetouchPageT

  return (
    <>
      {/* 1) Operational Challenges */}
      <TwoColSection
        title={s.sectionChallenges}
        rightContent={<OneTouchProblemChart />}
      >
        <p>{s.challengesPara1}</p>
        <ul className="list-disc space-y-2 pl-5">
          {(s.challengesBullets ?? []).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TwoColSection>

      {/* 2) OneTouch Overview */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionOverview}
          </h2>
          <div className="mt-10 flex flex-col gap-10 rounded-2xl border border-border/60 bg-card/50 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)] sm:p-8 lg:flex-row lg:items-center lg:gap-16">
            <div className="min-w-0 flex-1 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                OneTouch centralizes procurement processes, inventory tracking, warehouse operations, production planning, supplier management, cost monitoring, and product lifecycle management with real-time operational visibility.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Procurement processes</li>
                <li>Inventory tracking</li>
                <li>Warehouse operations</li>
                <li>Production planning</li>
                <li>Supplier management</li>
                <li>Cost monitoring</li>
                <li>Product lifecycle management</li>
                <li>Real-time operational visibility</li>
              </ul>
            </div>
            <div className="w-full shrink-0 lg:w-80">
              <OneTouchOrdersChart />
            </div>
          </div>
        </div>
      </section>

      {/* 3) Supplier & Procurement */}
      <TwoColSection
        title={s.sectionProcurement}
        imageSrc="/images/oneT.jpg"
        imageAlt={s.imageAltOneT ?? "OneTouch procurement"}
      >
        <BulletList
          items={[
            "Supplier database management",
            "Purchase requests and orders",
            "Price tracking",
            "Contract terms",
            "Delivery monitoring",
            "Invoice and payment tracking",
            "Raw material management",
            "Packaging management",
          ]}
        />
      </TwoColSection>

      {/* 4) Inventory & Warehouse */}
      <TwoColSection
        title={s.sectionInventory}
        imageSrc="/images/oneT1.jpg"
        imageAlt={s.imageAltOneT1 ?? "OneTouch inventory and warehouse"}
      >
        <BulletList
          items={[
            "Multi-warehouse management",
            "Stock movements tracking",
            "Reception workflows",
            "Transfers between depots",
            "Minimum and maximum stock alerts",
            "Expiration date monitoring",
            "Loss and waste tracking",
            "Inventory valuation",
          ]}
        />
      </TwoColSection>

      {/* 5) Production Management */}
      <TwoColSection
        title={s.sectionProduction}
        imageSrc="https://images.unsplash.com/photo-1581093458791-9c7a0b5a7b3a?w=800&q=80"
        imageAlt="Production or factory"
      >
        <BulletList
          items={[
            "Manufacturing orders",
            "Bill of materials / recipes",
            "Resource planning",
            "Production scheduling",
            "Material consumption tracking",
            "Finished goods management",
            "Cost calculation",
            "Direct sales entry",
          ]}
        />
      </TwoColSection>

      {/* 6) Traceability & Compliance */}
      <TwoColSection
        title={s.sectionTraceability}
        imageSrc="/images/oneT2.jpg"
        imageAlt={s.imageAltOneT2 ?? "OneTouch traceability and quality control"}
      >
        <BulletList
          items={[
            "Batch and lot tracking",
            "Expiration date control (DLC)",
            "Quality control records",
            "Movement history",
            "Audit trails",
            "Regulatory compliance support",
            "Alerts for anomalies",
          ]}
        />
      </TwoColSection>

      {/* 7) Analytics & Cost Control */}
      <TwoColSection title={s.sectionAnalytics} rightContent={<OneTouchCostChart />}>
        <BulletList
          items={[
            "Operational dashboards",
            "Cost of production analysis",
            "Stock valuation reports",
            "Profitability insights",
            "Performance indicators",
            "Forecasting support",
            "Real-time KPIs",
          ]}
        />
      </TwoColSection>

      {/* 8) Multi-Site & Administration */}
      <TwoColSection
        title={s.sectionMultiSite}
        imageSrc="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
        imageAlt="Corporate operations"
      >
        <BulletList
          items={[
            "Multi-site deployment",
            "Centralized administration",
            "Role-based permissions",
            "User management",
            "Custom workflows",
            "Integration capabilities",
            "Scalable architecture",
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
            <OneTouchImpactChart />
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
