"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
  Cell,
  LineChart,
  Line,
  LabelList,
} from "recharts"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"

/* Subtle, theme-aligned colors (not flashy) */
const CHART_COLORS = {
  bar: "hsl(210 25% 45%)",
  areaPlanned: "hsl(220 15% 85%)",
  areaCompleted: "hsl(210 30% 42%)",
  bars: ["hsl(210 28% 48%)", "hsl(205 22% 55%)", "hsl(200 20% 60%)", "hsl(215 25% 50%)"],
}

const CARTESIAN_GRID_STROKE = "hsl(0 0% 90%)"
const DARK_GRID = "hsl(0 0% 20%)"
const AXIS_STROKE = "hsl(0 0% 45%)"
const DARK_AXIS = "hsl(0 0% 65%)"

/** Weekly order volume (sample month) — Overview section (replaces broken image) */
const OVERVIEW_ORDERS_DATA = [
  { week: "W1", orders: 412 },
  { week: "W2", orders: 438 },
  { week: "W3", orders: 395 },
  { week: "W4", orders: 461 },
  { week: "W5", orders: 449 },
]

export function DistrexOverviewChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Weekly order volume (sample month)</p>
      <div className="h-56 w-full min-h-[200px] sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={OVERVIEW_ORDERS_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CARTESIAN_GRID_STROKE} />
            <XAxis dataKey="week" tick={{ fontSize: 12, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number) => [value.toLocaleString(), "Orders"]}
              labelFormatter={(label) => `Week: ${label}`}
            />
            <Line type="monotone" dataKey="orders" stroke={CHART_COLORS.bar} strokeWidth={2} dot={{ fill: CHART_COLORS.bar, r: 3 }} isAnimationActive={false} name="Orders" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Centralized sales and delivery data gives management full visibility on activity trends.
      </p>
    </div>
  )
}

/** Daily cash collected (sample week) — Section 5 Cash Management */
const CASH_DATA = [
  { day: "Mon", amount: 12400 },
  { day: "Tue", amount: 15800 },
  { day: "Wed", amount: 14200 },
  { day: "Thu", amount: 18900 },
  { day: "Fri", amount: 22100 },
  { day: "Sat", amount: 9500 },
]

export function DistrexCashChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Daily cash collected (sample week)</p>
      <div className="h-56 w-full min-h-[200px] sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={CASH_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CARTESIAN_GRID_STROKE} className="dark:[stroke:var(--dark-grid)]" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: number) => [value.toLocaleString(), "Collected"]}
              labelFormatter={(label) => `Day: ${label}`}
            />
            <Bar dataKey="amount" fill={CHART_COLORS.bar} radius={[4, 4, 0, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Illustrative weekly pattern. Automated reconciliation and reporting reduce manual handling and improve accuracy.
      </p>
    </div>
  )
}

/** Visits completed vs planned (last 6 weeks) — Section 6 Geolocation / Routes */
const VISITS_DATA = [
  { week: "W1", planned: 420, completed: 398 },
  { week: "W2", planned: 435, completed: 421 },
  { week: "W3", planned: 410, completed: 395 },
  { week: "W4", planned: 448, completed: 432 },
  { week: "W5", planned: 460, completed: 441 },
  { week: "W6", planned: 455, completed: 447 },
]

export function DistrexVisitsChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Visits completed vs planned (last 6 weeks)</p>
      <div className="h-56 w-full min-h-[200px] sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={VISITS_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="areaPlanned" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_COLORS.areaPlanned} stopOpacity={0.6} />
                <stop offset="100%" stopColor={CHART_COLORS.areaPlanned} stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="areaCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_COLORS.areaCompleted} stopOpacity={0.5} />
                <stop offset="100%" stopColor={CHART_COLORS.areaCompleted} stopOpacity={0.08} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={CARTESIAN_GRID_STROKE} />
            <XAxis dataKey="week" tick={{ fontSize: 12, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number, name: string) => [value, name === "planned" ? "Planned" : "Completed"]}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} formatter={(v) => (v === "planned" ? "Planned" : "Completed")} />
            <Area type="monotone" dataKey="planned" stroke={CHART_COLORS.areaPlanned} fill="url(#areaPlanned)" strokeWidth={1.5} isAnimationActive={false} />
            <Area type="monotone" dataKey="completed" stroke={CHART_COLORS.areaCompleted} fill="url(#areaCompleted)" strokeWidth={1.5} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Route optimization and real-time tracking help field teams meet planned visits with high completion rates.
      </p>
    </div>
  )
}

/** Orders by status (month) — Section 8 Business Benefits */
const ORDERS_DATA = [
  { status: "Delivered", count: 1842, color: CHART_COLORS.bars[0] },
  { status: "Pending", count: 312, color: CHART_COLORS.bars[1] },
  { status: "In route", count: 198, color: CHART_COLORS.bars[2] },
  { status: "Returned", count: 47, color: CHART_COLORS.bars[3] },
]

export function DistrexOrdersByStatusChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Orders by status (sample month)</p>
      <div className="h-56 w-full min-h-[200px] sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ORDERS_DATA} layout="vertical" margin={{ top: 8, right: 24, left: 60, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CARTESIAN_GRID_STROKE} horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis type="category" dataKey="status" tick={{ fontSize: 12, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} width={52} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number) => [value.toLocaleString(), "Orders"]}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} isAnimationActive={false}>
              {ORDERS_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Full visibility on order status supports operational control and data-driven decisions.
      </p>
    </div>
  )
}

const LOSS_BAR_NEUTRAL = "hsl(0 0% 72%)"
const LOSS_BAR_TOP = "hsl(210 35% 38%)"
const IMPACT_BEFORE_COLOR = "hsl(0 0% 65%)"
const IMPACT_AFTER_COLOR = "hsl(var(--accent))"

/** Problem: where field distribution loses time and money (horizontal bar) */
export function DistrexProblemChart({ className }: { className?: string }) {
  const { t } = useI18n()
  const d = (t as { distrexPage?: Record<string, unknown> }).distrexPage ?? {}
  const title = (d.chartLossTitle as string) ?? "Where Field Distribution Loses Time and Money"
  const subtitle = (d.chartLossSubtitle as string) ?? "Typical pain points without integrated field operations"
  const insight = (d.chartLossInsight as string) ?? "Manual collection, poor visibility, and route inefficiency drive cost and missed visits."
  const tooltipLabel = (d.chartLossTooltipLabel as string) ?? "Share of impact"
  const data = [
    { name: (d.chartLossBar1 as string) ?? "Missed client visits", value: 26, label: "26%", isTop: true },
    { name: (d.chartLossBar2 as string) ?? "Delayed reporting", value: 22, label: "22%", isTop: false },
    { name: (d.chartLossBar3 as string) ?? "Stock discrepancies", value: 18, label: "18%", isTop: false },
    { name: (d.chartLossBar4 as string) ?? "Cash handling risks", value: 14, label: "14%", isTop: false },
    { name: (d.chartLossBar5 as string) ?? "Inefficient routes", value: 12, label: "12%", isTop: false },
    { name: (d.chartLossBar6 as string) ?? "Order collection errors", value: 8, label: "8%", isTop: false },
  ]
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 bg-card shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-card/90 dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]",
        "p-5 sm:p-6",
        className
      )}
    >
      <h3 className="font-hero text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-6 h-64 w-full min-h-[220px] sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 8, right: 48, left: 8, bottom: 8 }} barGap={6} barCategoryGap="12%">
            <CartesianGrid strokeDasharray="3 3" stroke={CARTESIAN_GRID_STROKE} horizontal={false} />
            <XAxis type="number" domain={[0, 30]} tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} width={130} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number) => [`${value}%`, tooltipLabel]}
              labelFormatter={(label) => label}
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} isAnimationActive={false} maxBarSize={24}>
              <LabelList dataKey="label" position="right" style={{ fontSize: 12, fontWeight: 600 }} fill="hsl(0 0% 25%)" />
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.isTop ? LOSS_BAR_TOP : LOSS_BAR_NEUTRAL} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{insight}</p>
    </div>
  )
}

/** Business impact: before vs after Distrex (grouped bar) */
export function DistrexImpactChart({ className }: { className?: string }) {
  const { t } = useI18n()
  const d = (t as { distrexPage?: Record<string, unknown> }).distrexPage ?? {}
  const impactTitle = (d.chartImpactTitle as string) ?? "Impact of Distrex on Field Performance"
  const impactSubtitle = (d.chartImpactSubtitle as string) ?? "Before vs after integrated orders, stock, and visits"
  const impactBefore = (d.chartImpactBefore as string) ?? "Before"
  const impactAfter = (d.chartImpactAfter as string) ?? "After"
  const impactData = [
    { metric: (d.chartImpactMetric1 as string) ?? "Visits completed", before: 72, after: 97, beforeLabel: "72%", afterLabel: "97%" },
    { metric: (d.chartImpactMetric2 as string) ?? "Order accuracy", before: 68, after: 97, beforeLabel: "68%", afterLabel: "97%" },
    { metric: (d.chartImpactMetric3 as string) ?? "Cash reconciled", before: 45, after: 98, beforeLabel: "45%", afterLabel: "98%" },
    { metric: (d.chartImpactMetric4 as string) ?? "Route efficiency", before: 75, after: 96, beforeLabel: "75%", afterLabel: "96%" },
  ]
  const kpiBadges = ((d.chartImpactKpis as readonly string[]) ?? ["+35% visits completed", "+42% order accuracy", "-60% reconciliation time", "+28% route efficiency"])
  const insight = (d.chartImpactInsight as string) ?? "Real-time sync and route optimization increase visits completed and order accuracy."
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 bg-card shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-card/90 dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]",
        "p-5 sm:p-6",
        className
      )}
    >
      <h3 className="font-hero text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl">{impactTitle}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{impactSubtitle}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {kpiBadges.map((label) => (
          <span key={label} className="rounded-md border border-border/60 bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground dark:border-white/15 dark:bg-white/10">
            {label}
          </span>
        ))}
      </div>
      <div className="mt-6 h-64 w-full min-h-[240px] sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={impactData} margin={{ top: 16, right: 12, left: 0, bottom: 8 }} barGap={4} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke={CARTESIAN_GRID_STROKE} vertical={false} />
            <XAxis dataKey="metric" tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} interval={0} />
            <YAxis domain={[0, 110]} tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number, name: string, props: { payload?: { beforeLabel: string; afterLabel: string } }) => {
                const p = props?.payload
                if (p && name === "before") return [p.beforeLabel, impactBefore]
                if (p && name === "after") return [p.afterLabel, impactAfter]
                return [String(value), name === "before" ? impactBefore : impactAfter]
              }}
              labelFormatter={(label) => label}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} formatter={(value) => (value === "before" ? impactBefore : impactAfter)} />
            <Bar dataKey="before" name="before" fill={IMPACT_BEFORE_COLOR} radius={[4, 4, 0, 0]} isAnimationActive={false} maxBarSize={48}>
              <LabelList dataKey="beforeLabel" position="top" className="fill-muted-foreground" style={{ fontSize: 11 }} />
            </Bar>
            <Bar dataKey="after" name="after" fill={IMPACT_AFTER_COLOR} radius={[4, 4, 0, 0]} isAnimationActive={false} maxBarSize={48}>
              <LabelList dataKey="afterLabel" position="top" className="fill-foreground" style={{ fontSize: 11 }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{insight}</p>
    </div>
  )
}
