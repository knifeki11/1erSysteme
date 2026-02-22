"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type ServiceCategoryCardProps = {
  title: string
  pitch: string
  bullets: readonly string[]
  ctaLabel: string
  href: string
  className?: string
}

export function ServiceCategoryCard({
  title,
  pitch,
  bullets,
  ctaLabel,
  href,
  className,
}: ServiceCategoryCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-white/5",
        className
      )}
    >
      <h3 className="font-hero text-xl font-semibold text-foreground sm:text-2xl">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">{pitch}</p>
      <ul className="mt-4 flex flex-col gap-2">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
            {b}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        {ctaLabel}
        <ChevronRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  )
}
