"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  Area,
  AreaChart,
  Cell,
  LabelList,
} from "recharts"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"

const GRID_STROKE = "hsl(0 0% 90%)"
const AXIS_STROKE = "hsl(0 0% 45%)"
const COLORS = {
  bar: "hsl(38 28% 46%)",
  line: "hsl(36 24% 42%)",
  area: "hsl(38 22% 48%)",
}

/** Attendance by hour (sample event day) */
const ATTENDANCE_DATA = [
  { hour: "10h", visitors: 120 },
  { hour: "11h", visitors: 280 },
  { hour: "12h", visitors: 420 },
  { hour: "13h", visitors: 380 },
  { hour: "14h", visitors: 510 },
  { hour: "15h", visitors: 440 },
  { hour: "16h", visitors: 290 },
]

export function QuickPassAttendanceChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Attendance by hour (sample event day)</p>
      <div className="h-56 w-full min-h-[200px] sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ATTENDANCE_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
            <XAxis dataKey="hour" tick={{ fontSize: 12, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number) => [value, "Visitors"]}
              labelFormatter={(label) => `Hour: ${label}`}
            />
            <Bar dataKey="visitors" fill={COLORS.bar} radius={[4, 4, 0, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Real-time attendance visibility supports capacity and security decisions.
      </p>
    </div>
  )
}

/** Daily revenue (sample week) */
const REVENUE_DATA = [
  { day: "Mon", revenue: 1240 },
  { day: "Tue", revenue: 2180 },
  { day: "Wed", revenue: 1890 },
  { day: "Thu", revenue: 2450 },
  { day: "Fri", revenue: 3120 },
  { day: "Sat", revenue: 4280 },
  { day: "Sun", revenue: 2680 },
]

export function QuickPassRevenueChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Daily revenue (sample week, €)</p>
      <div className="h-56 w-full min-h-[200px] sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={REVENUE_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="quickpassRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.area} stopOpacity={0.35} />
                <stop offset="100%" stopColor={COLORS.area} stopOpacity={0.06} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} tickFormatter={(v) => "€" + (v / 1000).toFixed(1) + "k"} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number) => ["€" + value.toLocaleString(), "Revenue"]}
              labelFormatter={(label) => `Day: ${label}`}
            />
            <Area type="monotone" dataKey="revenue" stroke={COLORS.area} fill="url(#quickpassRevenue)" strokeWidth={1.5} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Automated revenue tracking and audit logs reduce leakage and support reporting.
      </p>
    </div>
  )
}

/** Tickets sold by channel (sample event) — Line trend */
const TICKETS_DATA = [
  { day: "D-7", online: 42, onSite: 8 },
  { day: "D-5", online: 128, onSite: 12 },
  { day: "D-3", online: 245, onSite: 28 },
  { day: "D-1", online: 312, onSite: 45 },
  { day: "D0", online: 88, onSite: 156 },
]

export function QuickPassTicketsChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Tickets sold by channel (sample event)</p>
      <div className="h-56 w-full min-h-[200px] sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={TICKETS_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number, name: string) => [value, name === "online" ? "Online" : "On-site"]}
              labelFormatter={(label) => label}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} formatter={(v) => (v === "online" ? "Online" : "On-site")} />
            <Line type="monotone" dataKey="online" stroke={COLORS.line} strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false} name="online" />
            <Line type="monotone" dataKey="onSite" stroke="hsl(38 18% 58%)" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false} name="onSite" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Multi-channel ticketing with real-time monitoring and secure validation.
      </p>
    </div>
  )
}

const LOSS_BAR_NEUTRAL = "hsl(0 0% 72%)"
const LOSS_BAR_TOP = "hsl(38 35% 38%)"
const IMPACT_BEFORE_COLOR = "hsl(0 0% 65%)"
const IMPACT_AFTER_COLOR = "hsl(var(--accent))"

/** Problem: where access and ticketing lose revenue and control (horizontal bar) */
export function QuickPassProblemChart({ className }: { className?: string }) {
  const { t } = useI18n()
  const q = (t as { quickpassPage?: Record<string, unknown> }).quickpassPage ?? {}
  const title = (q.chartLossTitle as string) ?? "Where Access and Ticketing Lose Revenue and Control"
  const subtitle = (q.chartLossSubtitle as string) ?? "Typical pain points without digital ticketing and access control"
  const insight = (q.chartLossInsight as string) ?? "Manual ticketing and poor visibility drive fraud, long queues, and revenue leakage."
  const tooltipLabel = (q.chartLossTooltipLabel as string) ?? "Share of impact"
  const data = [
    { name: (q.chartLossBar1 as string) ?? "Fraud / duplicate entries", value: 28, label: "28%", isTop: true },
    { name: (q.chartLossBar2 as string) ?? "Long queues at entrance", value: 22, label: "22%", isTop: false },
    { name: (q.chartLossBar3 as string) ?? "Manual ticketing errors", value: 18, label: "18%", isTop: false },
    { name: (q.chartLossBar4 as string) ?? "Cash handling risks", value: 14, label: "14%", isTop: false },
    { name: (q.chartLossBar5 as string) ?? "No real-time capacity", value: 10, label: "10%", isTop: false },
    { name: (q.chartLossBar6 as string) ?? "Revenue leakage", value: 8, label: "8%", isTop: false },
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
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} horizontal={false} />
            <XAxis type="number" domain={[0, 32]} tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
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

/** Business impact: before vs after QuickPass (grouped bar) */
export function QuickPassImpactChart({ className }: { className?: string }) {
  const { t } = useI18n()
  const q = (t as { quickpassPage?: Record<string, unknown> }).quickpassPage ?? {}
  const impactTitle = (q.chartImpactTitle as string) ?? "Impact of QuickPass on Access and Revenue"
  const impactSubtitle = (q.chartImpactSubtitle as string) ?? "Before vs after digital ticketing and access control"
  const impactBefore = (q.chartImpactBefore as string) ?? "Before"
  const impactAfter = (q.chartImpactAfter as string) ?? "After"
  const impactData = [
    { metric: (q.chartImpactMetric1 as string) ?? "Revenue captured", before: 72, after: 100, beforeLabel: "72%", afterLabel: "100%" },
    { metric: (q.chartImpactMetric2 as string) ?? "Entry throughput", before: 65, after: 95, beforeLabel: "65%", afterLabel: "95%" },
    { metric: (q.chartImpactMetric3 as string) ?? "Fraud incidents", before: 100, after: 25, beforeLabel: "100", afterLabel: "25" },
    { metric: (q.chartImpactMetric4 as string) ?? "Queue time", before: 18, after: 9, beforeLabel: "18 min", afterLabel: "9 min" },
  ]
  const kpiBadges = ((q.chartImpactKpis as readonly string[]) ?? ["+38% revenue captured", "+45% entry throughput", "-75% fraud", "-50% queue time"])
  const insight = (q.chartImpactInsight as string) ?? "Automated validation, real-time capacity, and audit trails reduce fraud and improve revenue capture."
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
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
            <XAxis dataKey="metric" tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} interval={0} />
            <YAxis domain={[0, 120]} tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
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
