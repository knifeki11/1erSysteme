"use client"

import Link from "next/link"
import { useTheme } from "@/lib/theme-context"
import { cn } from "@/lib/utils"

export type ServiceHeroProps = {
  eyebrow?: string
  title: string
  subtitle: string
  ctaPrimary?: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  /** When true, hero uses inverted header theme (dark text on light) */
  darkSection?: boolean
  className?: string
}

export function ServiceHero({
  eyebrow,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  darkSection = false,
  className,
}: ServiceHeroProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const useInverted = darkSection ? !isDark : isDark

  return (
    <section
      className={cn("relative flex min-h-[50vh] flex-col justify-center overflow-hidden py-20 sm:py-28", className)}
      data-header-theme={useInverted ? "inverted" : undefined}
    >
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.04),transparent_50%)]" aria-hidden />
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center sm:px-10">
        {eyebrow && (
          <p
            className={cn(
              "mb-3 text-xs font-medium uppercase tracking-widest",
              useInverted ? "text-white/80" : "text-muted-foreground"
            )}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className={cn(
            "font-hero text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl",
            useInverted ? "text-white" : "text-foreground"
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "mt-4 max-w-2xl mx-auto text-base sm:text-lg",
            useInverted ? "text-white/85" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
        {(ctaPrimary || ctaSecondary) && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {ctaPrimary && (
              <Link
                href={ctaPrimary.href}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                {ctaPrimary.label}
              </Link>
            )}
            {ctaSecondary && (
              <Link
                href={ctaSecondary.href}
                className={cn(
                  "inline-flex items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors",
                  useInverted
                    ? "border-white/40 text-white hover:bg-white/10"
                    : "border-border bg-background text-foreground hover:bg-muted/50"
                )}
              >
                {ctaSecondary.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
