"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  LabelList,
} from "recharts"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"

const GRID_STROKE = "hsl(0 0% 90%)"
const AXIS_STROKE = "hsl(0 0% 45%)"
const COLORS = {
  line: "hsl(200 28% 42%)",
  pie: ["hsl(200 25% 48%)", "hsl(200 15% 82%)", "hsl(205 20% 55%)"],
  bar: "hsl(198 22% 50%)",
}

const IMPACT_BEFORE_COLOR = "hsl(0 0% 65%)"
const IMPACT_AFTER_COLOR = "hsl(var(--accent))"

const LOSS_BAR_NEUTRAL = "hsl(0 0% 72%)"
const LOSS_BAR_TOP = "hsl(220 35% 38%)"

export function RezerToOperationalLossChart({ className }: { className?: string }) {
  const { t } = useI18n()
  const r = (t as { rezertoPage?: Record<string, unknown> }).rezertoPage ?? {}
  const lossTitle = (r.chartLossTitle as string) ?? "Sources of Operational Loss in Reservation Management"
  const lossSubtitle = (r.chartLossSubtitle as string) ?? "Typical impact across multi-restaurant operations"
  const lossTopLabel = (r.chartLossTopLabel as string) ?? "No-shows account for the largest share of operational loss"
  const lossInsightLine = (r.chartLossInsightLine as string) ?? "Reservation inefficiencies can reduce effective revenue by 20–30% during peak periods."
  const tooltipLabel = (r.chartLossTooltipLabel as string) ?? "Share of impact"
  const operationalLossData = [
    { name: (r.chartLossNoShows as string) ?? "No-shows", value: 35, label: "35%", isTop: true },
    { name: (r.chartLossLateArrivals as string) ?? "Late arrivals", value: 22, label: "22%", isTop: false },
    { name: (r.chartLossOverbooking as string) ?? "Overbooking conflicts", value: 18, label: "18%", isTop: false },
    { name: (r.chartLossUnderutilized as string) ?? "Underutilized tables", value: 15, label: "15%", isTop: false },
    { name: (r.chartLossManualErrors as string) ?? "Manual coordination errors", value: 10, label: "10%", isTop: false },
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
        {lossTitle}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {lossSubtitle}
      </p>
      <p className="mt-2 flex items-center gap-2 text-xs font-medium text-foreground/90">
        <span className="flex h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(220_35%_38%)]" aria-hidden />
        {lossTopLabel}
      </p>
      <div className="mt-6 h-64 w-full min-h-[220px] sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={operationalLossData}
            layout="vertical"
            margin={{ top: 8, right: 48, left: 8, bottom: 8 }}
            barGap={6}
            barCategoryGap="12%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} horizontal={false} />
            <XAxis type="number" domain={[0, 40]} tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} width={120} />
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
              {operationalLossData.map((entry) => (
                <Cell key={entry.name} fill={entry.isTop ? LOSS_BAR_TOP : LOSS_BAR_NEUTRAL} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        {lossInsightLine}
      </p>
    </div>
  )
}

export function RezerToImpactChart({ className }: { className?: string }) {
  const { t } = useI18n()
  const r = (t as { rezertoPage?: Record<string, unknown> }).rezertoPage ?? {}
  const impactTitle = (r.chartImpactTitle as string) ?? "Operational Impact with RezerTo"
  const impactSubtitle = (r.chartImpactSubtitle as string) ?? "Measured improvements across multi-restaurant operations"
  const impactBefore = (r.chartImpactBefore as string) ?? "Before"
  const impactAfter = (r.chartImpactAfter as string) ?? "After"
  const impactData = [
    { metric: (r.chartImpactMetric1 as string) ?? "Table utilization", before: 62, after: 87, beforeLabel: "62%", afterLabel: "87%" },
    { metric: (r.chartImpactMetric2 as string) ?? "No-show rate", before: 18, after: 6, beforeLabel: "18%", afterLabel: "6%" },
    { metric: (r.chartImpactMetric3 as string) ?? "Avg wait time", before: 22, after: 9, beforeLabel: "22 min", afterLabel: "9 min" },
    { metric: (r.chartImpactMetric4 as string) ?? "Revenue per service", before: 100, after: 132, beforeLabel: "100", afterLabel: "132" },
  ]
  const kpiBadges = ((r.chartImpactKpis as readonly string[]) ?? ["+25% utilization", "-67% no-shows", "-60% wait time", "+32% revenue per service"])
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 bg-card shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-card/90 dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]",
        "p-5 sm:p-6",
        className
      )}
    >
      <h3 className="font-hero text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl">
        {impactTitle}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {impactSubtitle}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {kpiBadges.map((label) => (
          <span
            key={label}
            className="rounded-md border border-border/60 bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground dark:border-white/15 dark:bg-white/10"
          >
            {label}
          </span>
        ))}
      </div>
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
              domain={[0, 140]}
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
              formatter={(value: number, name: string, props: { payload?: { metric: string; beforeLabel: string; afterLabel: string } }) => {
                const p = props?.payload
                if (p && name === "before") return [p.beforeLabel, impactBefore]
                if (p && name === "after") return [p.afterLabel, impactAfter]
                return [String(value), name === "before" ? impactBefore : impactAfter]
              }}
              labelFormatter={(label) => label}
            />
            <Legend
              wrapperStyle={{ fontSize: 12 }}
              formatter={(value) => (value === "before" ? impactBefore : impactAfter)}
            />
            <Bar dataKey="before" name="before" fill={IMPACT_BEFORE_COLOR} radius={[4, 4, 0, 0]} isAnimationActive={false} maxBarSize={48}>
              <LabelList dataKey="beforeLabel" position="top" className="fill-muted-foreground" style={{ fontSize: 11 }} />
            </Bar>
            <Bar dataKey="after" name="after" fill={IMPACT_AFTER_COLOR} radius={[4, 4, 0, 0]} isAnimationActive={false} maxBarSize={48}>
              <LabelList dataKey="afterLabel" position="top" className="fill-foreground" style={{ fontSize: 11 }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

/** Reservations per day (sample week) — Section 1 or 2 */
const RESERVATIONS_DATA = [
  { day: "Mon", reservations: 42 },
  { day: "Tue", reservations: 58 },
  { day: "Wed", reservations: 61 },
  { day: "Thu", reservations: 78 },
  { day: "Fri", reservations: 124 },
  { day: "Sat", reservations: 156 },
  { day: "Sun", reservations: 98 },
]

export function RezerToReservationsChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Reservations per day (sample week)</p>
      <div className="h-56 w-full min-h-[200px] sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={RESERVATIONS_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number) => [value, "Reservations"]}
              labelFormatter={(label) => `Day: ${label}`}
            />
            <Line type="monotone" dataKey="reservations" stroke={COLORS.line} strokeWidth={2} dot={{ fill: COLORS.line, r: 3 }} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Real-time visibility on booking volume helps staff and kitchen plan capacity.
      </p>
    </div>
  )
}

/** Table occupancy (sample evening) — capacity used vs available */
const OCCUPANCY_DATA = [
  { name: "Seated", value: 68, color: COLORS.pie[0] },
  { name: "Reserved", value: 22, color: COLORS.pie[2] },
  { name: "Available", value: 10, color: COLORS.pie[1] },
]

export function RezerToOccupancyChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Table status (sample evening)</p>
      <div className="mx-auto h-56 w-full min-h-[200px] sm:h-64 sm:max-w-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={OCCUPANCY_DATA}
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
              {OCCUPANCY_DATA.map((entry, index) => (
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
        Live occupancy and reserved vs available tables support better seating decisions.
      </p>
    </div>
  )
}

/** No-shows vs showed (sample month) — Section 5 Benefits */
const NOSHOW_DATA = [
  { type: "Arrived", count: 892 },
  { type: "No-show", count: 48 },
  { type: "Cancelled", count: 62 },
]

export function RezerToNoShowChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Reservation outcomes (sample month)</p>
      <div className="h-56 w-full min-h-[200px] sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={NOSHOW_DATA} layout="vertical" margin={{ top: 8, right: 8, left: 72, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis type="category" dataKey="type" tick={{ fontSize: 12, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} width={68} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number) => [value.toLocaleString(), "Count"]}
            />
            <Bar dataKey="count" fill={COLORS.bar} radius={[0, 4, 4, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Confirmations and reminders help reduce no-shows and improve table turnover.
      </p>
    </div>
  )
}
