"use client"

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  BarChart,
  Bar,
  Cell,
  LabelList,
} from "recharts"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"

const GRID_STROKE = "hsl(0 0% 90%)"
const AXIS_STROKE = "hsl(0 0% 45%)"
const COLORS = {
  radar: "hsl(200 25% 48%)",
  radarFill: "hsla(200 25% 48% / 0.25)",
  bar: "hsl(198 22% 52%)",
}

const LOSS_BAR_NEUTRAL = "hsl(0 0% 72%)"
const LOSS_BAR_TOP = "hsl(220 35% 38%)"
const IMPACT_BEFORE_COLOR = "hsl(0 0% 65%)"
const IMPACT_AFTER_COLOR = "hsl(var(--accent))"

/** Section 1 — Where revenue is lost in traditional billiard operations (horizontal bar) */
export function SmartClubRevenueLossChart({ className }: { className?: string }) {
  const { t } = useI18n()
  const s = (t as { smartclubPage?: Record<string, unknown> }).smartclubPage ?? {}
  const title = (s.chartLossTitle as string) ?? "Where Revenue Is Lost in Traditional Billiard Operations"
  const subtitle = (s.chartLossSubtitle as string) ?? "Common issues in non-connected pool halls"
  const insight = (s.chartLossInsight as string) ?? "Manual or mechanical systems leave significant revenue invisible and difficult to control."
  const tooltipLabel = (s.chartLossTooltipLabel as string) ?? "Share of loss"
  const data = [
    { name: (s.chartLossBar1 as string) ?? "Untracked games / unpaid usage", value: 38, label: "38%", isTop: true },
    { name: (s.chartLossBar2 as string) ?? "Mechanical coin system abuse", value: 22, label: "22%", isTop: false },
    { name: (s.chartLossBar3 as string) ?? "Staff errors or fraud", value: 16, label: "16%", isTop: false },
    { name: (s.chartLossBar4 as string) ?? "Idle tables due to poor monitoring", value: 14, label: "14%", isTop: false },
    { name: (s.chartLossBar5 as string) ?? "Tournament mismanagement", value: 10, label: "10%", isTop: false },
  ]
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 bg-card shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-card/90 dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]",
        "p-5 sm:p-6",
        className
      )}
    >
      <h3 className="font-hero text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl">
        {title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-6 h-64 w-full min-h-[220px] sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 8, right: 48, left: 8, bottom: 8 }}
            barGap={6}
            barCategoryGap="12%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} horizontal={false} />
            <XAxis type="number" domain={[0, 45]} tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} width={140} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
              }}
              formatter={(value: number) => [`${value}%`, tooltipLabel]}
              labelFormatter={(label) => label}
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} isAnimationActive={false} maxBarSize={28}>
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

/** Section 2 — Impact of SmartClub: Before vs After (grouped vertical bar) */
export function SmartClubImpactChart({ className }: { className?: string }) {
  const { t } = useI18n()
  const s = (t as { smartclubPage?: Record<string, unknown> }).smartclubPage ?? {}
  const title = (s.chartImpactTitle as string) ?? "Impact of SmartClub on Revenue Control and Utilization"
  const subtitle = (s.chartImpactSubtitle as string) ?? "Typical improvements observed after digitalization"
  const insight = (s.chartImpactInsight as string) ?? "Automated tracking ensures every game is recorded and billed while maximizing table availability."
  const beforeLabel = (s.chartImpactBefore as string) ?? "Before"
  const afterLabel = (s.chartImpactAfter as string) ?? "After"
  const impactData = [
    {
      metric: (s.chartImpactMetric1 as string) ?? "Revenue captured",
      before: 72,
      after: 98,
      beforeLabel: "72%",
      afterLabel: "98%",
    },
    {
      metric: (s.chartImpactMetric2 as string) ?? "Table utilization",
      before: 55,
      after: 83,
      beforeLabel: "55%",
      afterLabel: "83%",
    },
    {
      metric: (s.chartImpactMetric3 as string) ?? "Fraud incidents",
      before: 90,
      after: 5,
      beforeLabel: (s.chartImpactBeforeHigh as string) ?? "High",
      afterLabel: (s.chartImpactAfterMinimal as string) ?? "Minimal",
    },
  ]
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 bg-card shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-card/90 dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]",
        "p-5 sm:p-6",
        className
      )}
    >
      <h3 className="font-hero text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl">
        {title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-6 h-64 w-full min-h-[240px] sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={impactData}
            margin={{ top: 16, right: 12, left: 0, bottom: 8 }}
            barGap={4}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
            <XAxis
              dataKey="metric"
              tick={{ fontSize: 11, fill: AXIS_STROKE }}
              axisLine={{ stroke: AXIS_STROKE }}
              tickLine={{ stroke: AXIS_STROKE }}
              interval={0}
            />
            <YAxis
              domain={[0, 110]}
              tick={{ fontSize: 11, fill: AXIS_STROKE }}
              axisLine={{ stroke: AXIS_STROKE }}
              tickLine={{ stroke: AXIS_STROKE }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
              }}
              formatter={(value: number, name: string, props: { payload?: { beforeLabel: string; afterLabel: string } }) => {
                const p = props?.payload
                if (p && name === "before") return [p.beforeLabel, beforeLabel]
                if (p && name === "after") return [p.afterLabel, afterLabel]
                return [String(value), name === "before" ? beforeLabel : afterLabel]
              }}
              labelFormatter={(label) => label}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} formatter={(value) => (value === "before" ? beforeLabel : afterLabel)} />
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

/** Legacy: Daily revenue (sample week) — kept for reference, not used on main page */
const REVENUE_DATA = [
  { day: "Mon", revenue: 420 },
  { day: "Tue", revenue: 580 },
  { day: "Wed", revenue: 610 },
  { day: "Thu", revenue: 720 },
  { day: "Fri", revenue: 1180 },
  { day: "Sat", revenue: 1420 },
  { day: "Sun", revenue: 890 },
]

export function SmartClubRevenueChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Daily revenue (sample week, €)</p>
      <div className="h-56 w-full min-h-[200px] sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={REVENUE_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} tickFormatter={(v) => `€${v}`} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number) => ["€" + value.toLocaleString(), "Revenue"]}
              labelFormatter={(label) => `Day: ${label}`}
            />
            <Bar dataKey="revenue" fill={COLORS.bar} radius={[4, 4, 0, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Live revenue and usage data per table and shift for full transparency.
      </p>
    </div>
  )
}

/** Table usage by time of day (radar) */
const USAGE_BY_HOUR_DATA = [
  { period: "12h", usage: 32 },
  { period: "14h", usage: 58 },
  { period: "16h", usage: 45 },
  { period: "18h", usage: 78 },
  { period: "20h", usage: 92 },
  { period: "22h", usage: 68 },
]

export function SmartClubUsageRadarChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Table usage by time of day (sample day, %)</p>
      <div className="mx-auto h-56 w-full min-h-[200px] sm:h-64 sm:max-w-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={USAGE_BY_HOUR_DATA}>
            <PolarGrid stroke={GRID_STROKE} />
            <PolarAngleAxis dataKey="period" tick={{ fontSize: 11, fill: AXIS_STROKE }} />
            <PolarRadiusAxis angle={30} tick={{ fontSize: 10, fill: AXIS_STROKE }} tickFormatter={(v) => v + "%"} />
            <Radar name="Usage" dataKey="usage" stroke={COLORS.radar} fill={COLORS.radarFill} strokeWidth={1.5} isAnimationActive={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number) => [value + "%", "Usage"]}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Visibility on peak hours supports staffing and pricing decisions.
      </p>
    </div>
  )
}

/** Games per table (sample week) — vertical bar */
const GAMES_PER_TABLE_DATA = [
  { table: "T1", games: 84 },
  { table: "T2", games: 92 },
  { table: "T3", games: 76 },
  { table: "T4", games: 88 },
  { table: "T5", games: 71 },
]

export function SmartClubGamesByTableChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Games per table (sample week)</p>
      <div className="h-56 w-full min-h-[200px] sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={GAMES_PER_TABLE_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
            <XAxis dataKey="table" tick={{ fontSize: 12, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number) => [value, "Games"]}
              labelFormatter={(label) => `Table ${label}`}
            />
            <Bar dataKey="games" fill={COLORS.bar} radius={[4, 4, 0, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Per-table usage helps identify popular tables and balance maintenance.
      </p>
    </div>
  )
}
