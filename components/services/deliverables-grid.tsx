"use client"

import { cn } from "@/lib/utils"

export type DeliverableItem = { title: string; desc: string }

export type DeliverablesGridProps = {
  title: string
  items: readonly DeliverableItem[]
  className?: string
}

export function DeliverablesGrid({ title, items, className }: DeliverablesGridProps) {
  return (
    <section className={cn("relative py-16 sm:py-20", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,0,0,0.02),transparent_50%)] dark:bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.03),transparent_50%)]" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
        <h2 className="font-hero text-2xl font-semibold text-foreground sm:text-3xl">{title}</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-white/5"
            >
              <h3 className="font-medium text-foreground">{item.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
