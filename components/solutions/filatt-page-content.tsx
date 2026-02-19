"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { FilattProblemChart, FilattImpactChart, FilattChannelChart, FilattServedChart } from "@/components/solutions/filatt-charts"

const SECTION_BG = "bg-[#fbfbfb] dark:bg-[#040404]"
const SECTION_RADIAL = "bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.04),transparent_50%)]"

type FilattPageT = {
  sectionChallenges: string
  sectionOverview: string
  sectionTicketing: string
  sectionQueue: string
  sectionAgent: string
  sectionDisplay: string
  sectionAppointments: string
  sectionAnalytics: string
  sectionBenefits: string
  sectionMultiSite: string
  ctaHeadline: string
  ctaSubtext: string
  requestDemo: string
  contactTeam: string
  challengesPara1?: string
  challengesBullets?: readonly string[]
  overviewPara?: string
  overviewBullets?: readonly string[]
  imageAltFilat?: string
  imageAltFilat2?: string
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

export function FilattPageContent() {
  const { t } = useI18n()
  const s = (t.filattPage ?? t) as FilattPageT

  return (
    <>
      {/* 1) Public Service Challenges */}
      <TwoColSection title={s.sectionChallenges} rightContent={<FilattProblemChart />}>
        <p>{s.challengesPara1}</p>
        <ul className="list-disc space-y-2 pl-5">
          {(s.challengesBullets ?? []).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TwoColSection>

      {/* 2) FilAtt Overview */}
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
              <FilattChannelChart />
            </div>
          </div>
        </div>
      </section>

      {/* 3) Hybrid Ticketing */}
      <TwoColSection
        title={s.sectionTicketing}
        imageSrc="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800&q=80"
        imageAlt="Ticket kiosk or scanning"
      >
        <p>
          FilAtt supports both paper and digital flows so every visitor is included. Printed tickets from kiosks and QR-code digital tickets are synchronized in real time, with unique ticket numbers and estimated waiting time display.
        </p>
        <BulletList
          items={[
            "Printed tickets from kiosks",
            "QR-code digital tickets",
            "Web or mobile access",
            "Unique ticket numbers",
            "Real-time synchronization",
            "Support for non-digital users",
            "Estimated waiting time display",
          ]}
        />
      </TwoColSection>

      {/* 4) Queue Engine */}
      <TwoColSection
        title={s.sectionQueue}
        imageSrc="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
        imageAlt="Operations or planning environment"
      >
        <BulletList
          items={[
            "FIFO and priority queues",
            "VIP handling",
            "Emergency cases",
            "Dynamic waiting time calculation",
            "Agent skill-based routing",
            "Automatic redirection",
            "Handling of no-shows",
          ]}
        />
      </TwoColSection>

      {/* 5) Agent Interface */}
      <TwoColSection
        title={s.sectionAgent}
        imageSrc="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80"
        imageAlt="Professional working at desk"
      >
        <BulletList
          items={[
            "Secure login",
            "Call next client",
            "View service details",
            "Transfer tickets",
            "Pause/resume service",
            "Close requests",
            "Real-time workload view",
          ]}
        />
      </TwoColSection>

      {/* 6) Display & Notifications */}
      <TwoColSection
        title={s.sectionDisplay}
        imageSrc="/images/filat.jpg"
        imageAlt={s.imageAltFilat ?? "FilAtt visitor display and communication"}
      >
        <BulletList
          items={[
            "Public display screens",
            "Ticket numbers called",
            "Counter identification",
            "Audio notifications",
            "Informational messages",
            "Promotional content capability",
            "Reduced confusion and stress",
          ]}
        />
      </TwoColSection>

      {/* 7) Appointment Management */}
      <TwoColSection
        title={s.sectionAppointments}
        imageSrc="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
        imageAlt="Calendar or booking scenario"
      >
        <BulletList
          items={[
            "Online appointment booking",
            "Service selection",
            "Time slot allocation",
            "Confirmation messages",
            "Reminder notifications",
            "Integration into queue on arrival",
            "Reduced congestion",
          ]}
        />
      </TwoColSection>

      {/* 8) Analytics & Decision Support */}
      <TwoColSection title={s.sectionAnalytics} rightContent={<FilattServedChart />}>
        <BulletList
          items={[
            "Real-time dashboards",
            "Visitor volume trends",
            "Peak hours analysis",
            "Waiting time statistics",
            "Agent performance metrics",
            "Channel usage (paper vs digital)",
            "Service optimization insights",
          ]}
        />
      </TwoColSection>

      {/* 9) Multi-site & Security */}
      <TwoColSection
        title={s.sectionMultiSite}
        imageSrc="/images/filat2.jpg"
        imageAlt={s.imageAltFilat2 ?? "FilAtt for large organizations"}
      >
        <BulletList
          items={[
            "Multi-agency deployment",
            "Centralized administration",
            "Role-based access control",
            "Data security & compliance",
            "Audit logs",
            "Integration capabilities",
            "High availability architecture",
          ]}
        />
      </TwoColSection>

      {/* 10) Business Impact */}
      <section className={cn("relative py-16 sm:py-24", SECTION_BG)}>
        <div className={cn("pointer-events-none absolute inset-0 -z-10", SECTION_RADIAL)} aria-hidden />
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="font-hero text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {s.sectionBenefits}
          </h2>
          <div className="mt-10 w-full">
            <FilattImpactChart />
          </div>
        </div>
      </section>

      {/* 11) Call To Action */}
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
