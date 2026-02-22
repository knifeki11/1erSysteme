"use client"

import { cn } from "@/lib/utils"

export type StepItem = { label?: string; title: string }

export type ProcessStepperProps = {
  title?: string
  steps: readonly StepItem[]
  className?: string
}

export function ProcessStepper({ title, steps, className }: ProcessStepperProps) {
  return (
    <section className={cn("relative py-16 sm:py-20", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_100%,rgba(0,0,0,0.02),transparent_50%)] dark:bg-[radial-gradient(80%_50%_at_50%_100%,rgba(255,255,255,0.03),transparent_50%)]" aria-hidden />
      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-10">
        {title && (
          <h2 className="font-hero text-2xl font-semibold text-foreground sm:text-3xl">{title}</h2>
        )}
        {/* Desktop: horizontal stepper */}
        <div className="mt-8 hidden md:grid md:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-xl border border-border bg-card/50 px-4 py-5 text-center dark:border-white/10 dark:bg-white/5"
            >
              <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
                {step.label ?? String(i + 1)}
              </span>
              <span className="mt-2 text-sm font-medium text-foreground">{step.title}</span>
            </div>
          ))}
        </div>
        {/* Mobile: vertical list */}
        <div className="mt-8 flex flex-col gap-3 md:hidden">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl border border-border bg-card/50 px-4 py-3 dark:border-white/10 dark:bg-white/5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-medium text-primary">
                {step.label ?? i + 1}
              </span>
              <span className="text-sm font-medium text-foreground">{step.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
