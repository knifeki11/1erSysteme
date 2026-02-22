"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

export type CTASectionProps = {
  title: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel: string
  secondaryHref: string
  className?: string
}

export function CTASection({
  title,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
}: CTASectionProps) {
  return (
    <section className={cn("relative py-16 sm:py-20", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_100%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(80%_50%_at_50%_100%,rgba(255,255,255,0.04),transparent_50%)]" aria-hidden />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center sm:px-10">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-10">
          <h2 className="font-hero text-2xl font-semibold text-foreground sm:text-3xl">{title}</h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              {primaryLabel}
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted/50 dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/10"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
