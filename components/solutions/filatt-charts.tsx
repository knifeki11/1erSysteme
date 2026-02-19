"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  LabelList,
} from "recharts"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"

const GRID_STROKE = "hsl(0 0% 90%)"
const AXIS_STROKE = "hsl(0 0% 45%)"
const COLORS = {
  bar: "hsl(260 20% 48%)",
  line: "hsl(258 22% 44%)",
  pie: ["hsl(260 25% 48%)", "hsl(260 18% 65%)", "hsl(258 15% 75%)"],
}

/** Average waiting time by hour (sample day) */
const WAIT_DATA = [
  { hour: "09h", avgMin: 4 },
  { hour: "10h", avgMin: 8 },
  { hour: "11h", avgMin: 12 },
  { hour: "12h", avgMin: 14 },
  { hour: "13h", avgMin: 6 },
  { hour: "14h", avgMin: 9 },
  { hour: "15h", avgMin: 11 },
]

export function FilattWaitingTimeChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Average waiting time by hour (sample day, min)</p>
      <div className="h-56 w-full min-h-[200px] sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={WAIT_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
            <XAxis dataKey="hour" tick={{ fontSize: 12, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} tickFormatter={(v) => v + " m"} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number) => [value + " min", "Avg wait"]}
              labelFormatter={(label) => `Hour: ${label}`}
            />
            <Bar dataKey="avgMin" fill={COLORS.bar} radius={[4, 4, 0, 0]} isAnimationActive={false} name="Avg (min)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Visibility on waiting times supports staff allocation and service optimization.
      </p>
    </div>
  )
}

/** Tickets by channel (paper vs digital) */
const CHANNEL_DATA = [
  { name: "Digital", value: 62, color: COLORS.pie[0] },
  { name: "Paper / kiosk", value: 38, color: COLORS.pie[1] },
]

export function FilattChannelChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Tickets by channel (sample month, %)</p>
      <div className="mx-auto h-56 w-full min-h-[200px] sm:h-64 sm:max-w-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={CHANNEL_DATA}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              isAnimationActive={false}
              label={({ name, value }) => `${name}: ${value}%`}
              labelLine={false}
            >
              {CHANNEL_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number, name: string) => [value + "%", name]}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Hybrid ticketing supports both digital and non-digital visitors.
      </p>
    </div>
  )
}

/** Visitors served per day (sample week) */
const SERVED_DATA = [
  { day: "Mon", served: 142 },
  { day: "Tue", served: 168 },
  { day: "Wed", served: 155 },
  { day: "Thu", served: 189 },
  { day: "Fri", served: 212 },
  { day: "Sat", served: 98 },
]

export function FilattServedChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Visitors served per day (sample week)</p>
      <div className="h-56 w-full min-h-[200px] sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={SERVED_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number) => [value, "Served"]}
              labelFormatter={(label) => `Day: ${label}`}
            />
            <Line type="monotone" dataKey="served" stroke={COLORS.line} strokeWidth={2} dot={{ fill: COLORS.line, r: 3 }} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Volume trends support capacity planning and peak-hour management.
      </p>
    </div>
  )
}

const LOSS_BAR_NEUTRAL = "hsl(0 0% 72%)"
const LOSS_BAR_TOP = "hsl(260 35% 38%)"
const IMPACT_BEFORE_COLOR = "hsl(0 0% 65%)"
const IMPACT_AFTER_COLOR = "hsl(var(--accent))"

/** Problem: where time and service are lost in manual queues (horizontal bar) */
export function FilattProblemChart({ className }: { className?: string }) {
  const { t } = useI18n()
  const f = (t as { filattPage?: Record<string, unknown> }).filattPage ?? {}
  const title = (f.chartLossTitle as string) ?? "Where Time and Service Are Lost in Manual Queues"
  const subtitle = (f.chartLossSubtitle as string) ?? "Typical pain points without unified queue management"
  const insight = (f.chartLossInsight as string) ?? "Manual queues and poor visibility drive long waits, visitor frustration, and inefficient staff use."
  const tooltipLabel = (f.chartLossTooltipLabel as string) ?? "Share of impact"
  const data = [
    { name: (f.chartLossBar1 as string) ?? "Long wait times", value: 28, label: "28%", isTop: true },
    { name: (f.chartLossBar2 as string) ?? "Visitor no-shows", value: 22, label: "22%", isTop: false },
    { name: (f.chartLossBar3 as string) ?? "Staff idle time", value: 18, label: "18%", isTop: false },
    { name: (f.chartLossBar4 as string) ?? "No real-time data", value: 14, label: "14%", isTop: false },
    { name: (f.chartLossBar5 as string) ?? "Paper ticket errors", value: 10, label: "10%", isTop: false },
    { name: (f.chartLossBar6 as string) ?? "Congestion at peak", value: 8, label: "8%", isTop: false },
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
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} width={120} />
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

/** Business impact: before vs after FilAtt (grouped bar) */
export function FilattImpactChart({ className }: { className?: string }) {
  const { t } = useI18n()
  const f = (t as { filattPage?: Record<string, unknown> }).filattPage ?? {}
  const impactTitle = (f.chartImpactTitle as string) ?? "Impact of FilAtt on Public Service"
  const impactSubtitle = (f.chartImpactSubtitle as string) ?? "Before vs after unified ticketing and queue management"
  const impactBefore = (f.chartImpactBefore as string) ?? "Before"
  const impactAfter = (f.chartImpactAfter as string) ?? "After"
  const impactData = [
    { metric: (f.chartImpactMetric1 as string) ?? "Avg wait time", before: 20, after: 10, beforeLabel: "20 min", afterLabel: "10 min" },
    { metric: (f.chartImpactMetric2 as string) ?? "Visitors served/day", before: 72, after: 97, beforeLabel: "72", afterLabel: "97" },
    { metric: (f.chartImpactMetric3 as string) ?? "No-show rate", before: 18, after: 11, beforeLabel: "18%", afterLabel: "11%" },
    { metric: (f.chartImpactMetric4 as string) ?? "Staff utilization", before: 68, after: 87, beforeLabel: "68%", afterLabel: "87%" },
  ]
  const kpiBadges = ((f.chartImpactKpis as readonly string[]) ?? ["-50% wait time", "+35% visitors served", "-40% no-shows", "+28% staff utilization"])
  const insight = (f.chartImpactInsight as string) ?? "Shorter waits, better capacity use, and data for decisions improve visitor satisfaction and efficiency."
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
