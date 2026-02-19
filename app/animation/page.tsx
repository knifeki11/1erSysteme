"use client"

import dynamic from "next/dynamic"
import { PageShell } from "@/components/page-shell"

const Spline = dynamic(
  () => import("@splinetool/react-spline").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[70vh] w-full items-center justify-center rounded-lg bg-muted/30 dark:bg-white/5">
        <span className="text-sm text-muted-foreground">Loading animation…</span>
      </div>
    ),
  }
)

export default function AnimationPage() {
  return (
    <PageShell>
      <section className="relative min-h-screen w-full">
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-none px-6 py-6">
            <h1 className="font-hero text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Animation test
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Spline scene from <code className="rounded bg-muted px-1.5 py-0.5 text-xs">/public/animated-bg/scene (1).splinecode</code>
            </p>
          </div>
          <div className="relative h-[70vh] w-full shrink-0 overflow-hidden rounded-lg border border-border/50 dark:border-white/10">
            <Spline
              scene="/animated-bg/scene%20(1).splinecode"
              className="h-full w-full"
            />
          </div>
        </div>
      </section>
    </PageShell>
  )
}
