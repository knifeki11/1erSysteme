"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTheme } from "@/lib/theme-context"

type SolutionsWheelItem = {
  name: string
  description: string
  src: string
  tags: string[]
}

type SolutionsWheelProps = {
  eyebrow: string
  title: string
  items: SolutionsWheelItem[]
  exploreCta: string
}

const wheelEase: [number, number, number, number] = [0.22, 0.61, 0.36, 1]

export function SolutionsWheel({ eyebrow, title, items, exploreCta }: SolutionsWheelProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [activeIndex, setActiveIndex] = useState(0)
  const [wheelRotation, setWheelRotation] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const [radius, setRadius] = useState(190)
  const nodeSize = 96
  const ringPadding = -6
  const touchStartX = useRef<number | null>(null)
  const wheelRef = useRef<HTMLDivElement | null>(null)
  const rotationRef = useRef(0)

  useEffect(() => {
    const updateRadius = () => {
      if (!wheelRef.current) return
      const size = wheelRef.current.getBoundingClientRect().width
      const nextRadius = Math.max(0, size / 2 - nodeSize / 2 - ringPadding)
      setRadius(nextRadius)
    }

    updateRadius()
    const observer = new ResizeObserver(updateRadius)
    if (wheelRef.current) {
      observer.observe(wheelRef.current)
    }
    window.addEventListener("resize", updateRadius)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", updateRadius)
    }
  }, [])

  useEffect(() => {
    if (!autoRotate) return
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length)
    }, 5000)
    return () => window.clearInterval(id)
  }, [autoRotate, items.length])

  const step = 360 / items.length

  useEffect(() => {
    rotationRef.current = wheelRotation
  }, [wheelRotation])

  useEffect(() => {
    const desired = -activeIndex * step
    const current = rotationRef.current
    let target = desired
    let delta = target - current
    while (delta > 180) {
      target -= 360
      delta = target - current
    }
    while (delta < -180) {
      target += 360
      delta = target - current
    }
    setWheelRotation(target)
  }, [activeIndex, step])

  const positions = useMemo(() => {
    return items.map((_, index) => {
      const angle = (index * 360) / items.length
      const rad = (angle * Math.PI) / 180
      return {
        angle,
        x: Math.cos(rad) * radius,
        y: Math.sin(rad) * radius,
      }
    })
  }, [items, radius])

  const activeItem = items[activeIndex]

  const handleSelect = (index: number) => {
    setActiveIndex(index)
    setAutoRotate(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault()
      setActiveIndex((prev) => (prev + 1) % items.length)
      setAutoRotate(false)
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
      setAutoRotate(false)
    }
    if (event.key === "Enter") {
      event.preventDefault()
      setActiveIndex((prev) => prev)
      setAutoRotate(false)
    }
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return
    const deltaX = event.changedTouches[0]?.clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(deltaX) < 30) return
    if (deltaX > 0) {
      setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
      setAutoRotate(false)
    } else {
      setActiveIndex((prev) => (prev + 1) % items.length)
      setAutoRotate(false)
    }
  }

  return (
    <section id="solutions-wheel" className="bg-background py-20 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
        <div className="w-full lg:max-w-[420px]">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{eyebrow}</p>
          <h2 className="mt-3 font-hero text-3xl font-semibold tracking-[-0.02em] text-foreground sm:text-4xl">
            {activeItem?.name || title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{activeItem.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {activeItem.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-foreground/70 dark:border-white/15 dark:bg-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={`/?solution=${encodeURIComponent(activeItem?.name || "")}#contact`}
              className="inline-flex items-center rounded-full border border-foreground/10 bg-foreground/5 px-5 py-2 text-sm font-medium text-accent transition-all duration-200 hover:border-accent/40 hover:shadow-[0_0_16px_rgba(0,122,255,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 dark:border-white/15 dark:bg-white/5"
            >
              {exploreCta}
            </Link>
          </div>
        </div>

        <div
          className="relative flex w-full items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          tabIndex={0}
          role="group"
          aria-label="Solutions wheel"
        >
          <div ref={wheelRef} className="relative aspect-square w-full max-w-[520px] lg:max-w-[600px]">
            <div
              className="absolute inset-[-10%] rounded-full blur-3xl"
              style={{
                background: isDark
                  ? "radial-gradient(circle, rgba(12,32,56,0.45), rgba(12,32,56,0))"
                  : "radial-gradient(circle, rgba(96,132,180,0.12), rgba(96,132,180,0))",
              }}
            />
            <div className="absolute inset-0 rounded-full border border-foreground/10 bg-gradient-to-b from-white/60 to-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:border-white/10 dark:from-white/5 dark:to-black/10" />
            <div className="absolute inset-0 rounded-full">
              <svg className="h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
                <circle cx="50" cy="50" r="46" fill="none" stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)"} strokeWidth="0.6" />
                <circle cx="50" cy="50" r="32" fill="none" stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.08)"} strokeWidth="0.6" />
                <circle cx="50" cy="50" r="18" fill="none" stroke={isDark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.1)"} strokeWidth="0.6" />
                {[18, 32, 46].flatMap((ring) =>
                  Array.from({ length: items.length }).map((_, index) => {
                    const angle = (index * 360) / items.length
                    const rad = (angle * Math.PI) / 180
                    const x = 50 + Math.cos(rad) * ring
                    const y = 50 + Math.sin(rad) * ring
                    return (
                      <circle
                        key={`${ring}-${index}`}
                        cx={x}
                        cy={y}
                        r="0.35"
                        fill={isDark ? "rgba(255,255,255,0.18)" : "rgba(15,23,42,0.18)"}
                      />
                    )
                  })
                )}
              </svg>
            </div>
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{ rotate: wheelRotation }}
              transition={{ type: "spring", stiffness: 140, damping: 18, mass: 0.6 }}
              style={{ width: 0, height: 0 }}
            >
              {positions.map((position, index) => {
                const angle = (Math.atan2(position.y, position.x) * 180) / Math.PI
                const distance = Math.sqrt(position.x ** 2 + position.y ** 2)
                const isActive = index === activeIndex
                return (
                  <div
                    key={`${items[index].name}-line`}
                    className="absolute left-0 top-0 h-px origin-left"
                    style={{
                      width: `${distance}px`,
                      transform: `rotate(${angle}deg)`,
                      background: isActive
                        ? "linear-gradient(90deg, rgba(0,122,255,0.35), rgba(0,122,255,0.05))"
                        : isDark
                          ? "rgba(255,255,255,0.12)"
                          : "rgba(15,23,42,0.12)",
                      height: isActive ? "2px" : "1px",
                      boxShadow: isActive ? "0 0 12px rgba(0,122,255,0.35)" : "none",
                    }}
                  />
                )
              })}
              {items.map((item, index) => {
                const position = positions[index]
                const isActive = index === activeIndex
                return (
                  <motion.button
                    key={item.name}
                    type="button"
                    onClick={() => handleSelect(index)}
                    className="group absolute flex flex-col items-center focus-visible:outline-none"
                    whileHover={{ scale: 1.04 }}
                    animate={{ scale: isActive ? 1.05 : 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 16 }}
                    style={{
                      x: position.x - nodeSize / 2,
                      y: position.y - nodeSize / 2,
                    }}
                    aria-label={`Select ${item.name}`}
                    title={item.name}
                  >
                    <div className="relative" style={{ transform: `rotate(${-wheelRotation}deg)` }}>
                      {isActive && (
                        <span className="absolute -inset-2 rounded-3xl border border-accent/30 shadow-[0_0_18px_rgba(0,122,255,0.25)]" />
                      )}
                      <div
                        className={`flex h-24 w-24 items-center justify-center rounded-2xl border-[0.5px] p-1.5 text-foreground shadow-sm transition-all duration-200 ${
                          isActive
                            ? "border-accent/30 bg-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.12)] dark:bg-slate-900/70"
                            : "border-foreground/10 bg-white/70 dark:border-white/10 dark:bg-white/5"
                        } group-hover:border-accent/30 dark:text-white`}
                      >
                        {item.src ? (
                          <Image
                            src={item.src}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="h-20 w-20 object-contain"
                          />
                        ) : (
                          <span className="text-sm font-semibold tracking-[0.2em]">{item.name.slice(0, 2)}</span>
                        )}
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </motion.div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,rgba(0,122,255,0.18),transparent_65%)] blur-2xl" />
              <div className="flex h-32 w-32 items-center justify-center rounded-full border border-foreground/10 bg-white/85 shadow-[0_18px_36px_rgba(0,0,0,0.12)] backdrop-blur dark:border-white/10 dark:bg-white/5">
                <Image src="/images/final_logo/Logo%20(2).svg" alt="1erSysteme" width={72} height={72} className="h-16 w-16 object-contain" />
              </div>
            </div>
          </div>

          <div className="absolute -bottom-10 flex items-center gap-3 sm:hidden">
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev - 1 + items.length) % items.length)}
              className="rounded-full border border-foreground/10 bg-foreground/5 px-3 py-2 text-xs font-medium text-foreground/70 transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev + 1) % items.length)}
              className="rounded-full border border-foreground/10 bg-foreground/5 px-3 py-2 text-xs font-medium text-foreground/70 transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
