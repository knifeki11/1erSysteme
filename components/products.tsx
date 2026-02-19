"use client"

import { useState } from "react"
import Link from "next/link"
import { Terminal, Printer, Cable, Scale, Server, Ticket, Check } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type ProductCategory = {
  title: string
  description: string
  items: ReadonlyArray<string>
  chips: ReadonlyArray<string>
  imageUrl?: string
}

type ProductsSection = {
  label: string
  title: string
  subtitle: string
  supportingParagraph?: string
  trustIndicators?: ReadonlyArray<string>
  integrationLine?: string
  explore: string
  ctaPrimary?: string
  ctaSecondary?: string
  itemsLabel: string
  callout?: string
  items: ReadonlyArray<ProductCategory & { icon: "cash" | "printer" | "accessories" | "scales" | "servers" | "consumables" }>
}

const iconMap = {
  cash: Terminal,
  printer: Printer,
  accessories: Cable,
  scales: Scale,
  servers: Server,
  consumables: Ticket,
}

function productImageSrc(url: string): string {
  try {
    const u = new URL(url)
    if (u.hostname.includes("hikvision.com")) {
      return `/api/proxy-image?url=${encodeURIComponent(url)}`
    }
  } catch {
    return url
  }
  return url
}

type ProductsProps = {
  standalone?: boolean
}

export function Products({ standalone }: ProductsProps) {
  const { t } = useI18n()
  const productsData = t.products as unknown as ProductsSection
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeItem = activeIndex === null ? null : productsData.items[activeIndex]
  const trustIndicators = productsData.trustIndicators ?? []
  const ctaPrimary = productsData.ctaPrimary ?? productsData.explore
  const ctaSecondary = productsData.ctaSecondary

  return (
    <section id="products" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        {standalone ? (
          <>
            <div className="absolute inset-0 bg-[#fbfbfb] dark:bg-[#040404]" />
            <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_10%,rgba(0,0,0,0.04),transparent_60%)] dark:bg-[radial-gradient(80%_60%_at_70%_10%,rgba(255,255,255,0.06),transparent_60%)]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[#f5f5f6] dark:bg-[#060606]" />
            <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_20%_50%,rgba(0,0,0,0.04),transparent_55%)] dark:bg-[radial-gradient(70%_50%_at_20%_50%,rgba(255,255,255,0.04),transparent_55%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-border/20 to-transparent dark:from-white/[0.03]" />
          </>
        )}
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={cn(standalone ? "pt-2" : "border-t border-border/60 pt-8")}>
          {standalone && (
            <p className="font-hero mb-8 max-w-3xl text-center text-sm text-muted-foreground sm:text-base md:mx-0 md:text-left">
              {(t.productsPage as { notSoldIndividually?: string } | undefined)?.notSoldIndividually ??
                "We don't sell products individually — they come as part of our complete solutions."}
            </p>
          )}

          <div className="grid gap-12 lg:grid-cols-[minmax(0,420px),1fr] lg:gap-16">
            {/* LEFT: Title, description, trust indicators */}
            <div className="relative">
              <div className="pointer-events-none absolute -left-4 top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_30%_30%,hsl(var(--accent)_/_0.08),transparent_70%)] dark:bg-[radial-gradient(circle_at_30%_30%,hsl(var(--accent)_/_0.06),transparent_70%)]" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                {productsData.label}
              </p>
              <h2 className="font-hero mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground">
                {productsData.title}
              </h2>
              <p className="font-hero mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {productsData.subtitle}
              </p>
              {productsData.supportingParagraph && (
                <p className="font-hero mt-3 text-sm leading-relaxed text-muted-foreground/90">
                  {productsData.supportingParagraph}
                </p>
              )}
              {trustIndicators.length > 0 && (
                <ul className="mt-6 space-y-2.5" role="list">
                  {trustIndicators.map((line) => (
                    <li key={line} className="flex items-center gap-3 text-sm text-foreground/90">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent" aria-hidden>
                        <Check className="h-3 w-3" strokeWidth={2.5} />
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* RIGHT: Equipment categories grid */}
            <div className="relative">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {productsData.items.map((item, index) => {
                  const Icon = iconMap[item.icon]
                  const cardContent = (
                    <>
                      {item.imageUrl ? (
                        <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg border border-border/40 bg-muted/30">
                          <img
                            src={productImageSrc(item.imageUrl)}
                            alt=""
                            className="h-full w-full object-contain object-center"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <span
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent"
                          aria-hidden
                        >
                          <Icon className="h-6 w-6" strokeWidth={1.8} />
                        </span>
                      )}
                      <h3 className="font-hero mt-4 text-base font-semibold tracking-[-0.02em] text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.chips.map((chip) => (
                          <span
                            key={chip}
                            className="rounded-md border border-border/60 bg-background/80 px-2.5 py-1 text-[11px] font-medium text-muted-foreground dark:border-white/15 dark:bg-white/5"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    </>
                  );

                  if (standalone) {
                    return (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={cn(
                          "group relative flex h-full cursor-pointer flex-col rounded-xl border border-border/70 bg-card p-5 text-left shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-200",
                          "hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08),0_0_0_1px_hsl(var(--accent)_/_0.1)] hover:dark:shadow-[0_8px_24px_rgba(0,0,0,0.25),0_0_0_1px_hsl(var(--accent)_/_0.15)]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                          "dark:border-white/10 dark:bg-card/80 dark:shadow-[0_2px_12px_rgba(0,0,0,0.2)]"
                        )}
                      >
                        {cardContent}
                      </button>
                    )
                  }

                  return (
                    <Link
                      key={item.title}
                      href="/products"
                      className={cn(
                        "group relative flex h-full flex-col rounded-xl border border-border/70 bg-card p-5 text-left shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-200",
                        "hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08),0_0_0_1px_hsl(var(--accent)_/_0.1)] hover:dark:shadow-[0_8px_24px_rgba(0,0,0,0.25),0_0_0_1px_hsl(var(--accent)_/_0.15)]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        "dark:border-white/10 dark:bg-card/80 dark:shadow-[0_2px_12px_rgba(0,0,0,0.2)]"
                      )}
                    >
                      {cardContent}
                    </Link>
                  )
                })}
              </div>

              {/* CTA area */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-200 hover:bg-foreground/90 hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-white dark:text-foreground dark:hover:bg-white/95"
                >
                  {ctaPrimary}
                  <span aria-hidden>→</span>
                </Link>
                {ctaSecondary && (
                  <Link
                    href="/#contact"
                    className="inline-flex items-center rounded-lg border border-border/80 bg-background/80 px-5 py-3 text-sm font-semibold text-foreground transition-all duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 dark:border-white/15 dark:bg-white/5"
                  >
                    {ctaSecondary}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={activeIndex !== null} onOpenChange={(open) => !open && setActiveIndex(null)}>
        <DialogContent className="max-w-lg rounded-xl">
          {activeItem && (
            <>
              {activeItem.imageUrl && (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border/40 bg-muted/30">
                  <img
                    src={productImageSrc(activeItem.imageUrl)}
                    alt=""
                    className="h-full w-full object-contain object-center"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <DialogHeader className="text-left">
                <DialogTitle className="font-hero text-xl">
                  {activeItem.title}
                </DialogTitle>
              </DialogHeader>
              <p className="font-hero text-sm text-muted-foreground">
                {activeItem.description}
              </p>
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {productsData.itemsLabel}
                </p>
                <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                  {activeItem.items.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span className="font-hero">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
