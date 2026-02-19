"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  ComposedChart,
  Cell,
  AreaChart,
  Area,
  LabelList,
} from "recharts"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"

const GRID_STROKE = "hsl(0 0% 90%)"
const AXIS_STROKE = "hsl(0 0% 45%)"
const COLORS = {
  inHouse: "hsl(185 28% 44%)",
  atLaundry: "hsl(185 18% 62%)",
  line: "hsl(192 25% 48%)",
  bar: "hsl(188 22% 52%)",
}

/** Section 1 — Hidden linen losses and disputes over time (stacked area, 12 months €) */
const LINEN_LOSS_DATA = [
  { month: "M1", unaccounted: 3200, disputes: 900, replacement: 1400 },
  { month: "M2", unaccounted: 3400, disputes: 850, replacement: 1500 },
  { month: "M3", unaccounted: 3600, disputes: 950, replacement: 1600 },
  { month: "M4", unaccounted: 4200, disputes: 1100, replacement: 1800 },
  { month: "M5", unaccounted: 3800, disputes: 1000, replacement: 1700 },
  { month: "M6", unaccounted: 4500, disputes: 1200, replacement: 1900 },
  { month: "M7", unaccounted: 4100, disputes: 1150, replacement: 1800 },
  { month: "M8", unaccounted: 4700, disputes: 1300, replacement: 2100 },
  { month: "M9", unaccounted: 4300, disputes: 1200, replacement: 2000 },
  { month: "M10", unaccounted: 4900, disputes: 1400, replacement: 2200 },
  { month: "M11", unaccounted: 5200, disputes: 1500, replacement: 2400 },
  { month: "M12", unaccounted: 5600, disputes: 1600, replacement: 2600 },
]

const LINEN_LOSS_COLORS = {
  unaccounted: "hsl(220 35% 42%)",
  disputes: "hsl(30 25% 52%)",
  replacement: "hsl(0 0% 62%)",
}

export function TagFlowLinenLossChart({ className }: { className?: string }) {
  const { t } = useI18n()
  const s = (t as { tagflowPage?: Record<string, unknown> }).tagflowPage ?? {}
  const title = (s.chartLossTitle as string) ?? "Hidden Linen Losses and Disputes Over Time"
  const subtitle = (s.chartLossSubtitle as string) ?? "Typical hotel situation without RFID tracking"
  const insight = (s.chartLossInsight as string) ?? "Without unit-level traceability, losses and disputes accumulate and often remain invisible until year-end."
  const legendUnaccounted = (s.chartLossLegend1 as string) ?? "Unaccounted losses"
  const legendDisputes = (s.chartLossLegend2 as string) ?? "Laundry disputes"
  const legendReplacement = (s.chartLossLegend3 as string) ?? "Replacement purchases"
  const formatEuro = (v: number) => `€${(v / 1000).toFixed(0)}k`
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 bg-card shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-card/90 dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]",
        "p-5 sm:p-6",
        className
      )}
      role="figure"
      aria-label={title}
    >
      <h3 className="font-hero text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl">
        {title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-6 h-64 w-full min-h-[220px] sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={LINEN_LOSS_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="tagflowUnaccounted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={LINEN_LOSS_COLORS.unaccounted} stopOpacity={0.5} />
                <stop offset="100%" stopColor={LINEN_LOSS_COLORS.unaccounted} stopOpacity={0.08} />
              </linearGradient>
              <linearGradient id="tagflowDisputes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={LINEN_LOSS_COLORS.disputes} stopOpacity={0.5} />
                <stop offset="100%" stopColor={LINEN_LOSS_COLORS.disputes} stopOpacity={0.08} />
              </linearGradient>
              <linearGradient id="tagflowReplacement" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={LINEN_LOSS_COLORS.replacement} stopOpacity={0.45} />
                <stop offset="100%" stopColor={LINEN_LOSS_COLORS.replacement} stopOpacity={0.06} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: AXIS_STROKE }}
              axisLine={{ stroke: AXIS_STROKE }}
              tickLine={{ stroke: AXIS_STROKE }}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 11, fill: AXIS_STROKE }}
              axisLine={{ stroke: AXIS_STROKE }}
              tickLine={{ stroke: AXIS_STROKE }}
              tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
              }}
              formatter={(value: number, name: string) => [
                `€${value.toLocaleString()}`,
                name === "unaccounted" ? legendUnaccounted : name === "disputes" ? legendDisputes : legendReplacement,
              ]}
              labelFormatter={(label) => label}
            />
            <Legend
              wrapperStyle={{ fontSize: 11 }}
              formatter={(value) =>
                value === "unaccounted" ? legendUnaccounted : value === "disputes" ? legendDisputes : legendReplacement
              }
            />
            <Area
              type="monotone"
              dataKey="unaccounted"
              stackId="a"
              stroke={LINEN_LOSS_COLORS.unaccounted}
              fill="url(#tagflowUnaccounted)"
              strokeWidth={1}
              isAnimationActive={false}
              name="unaccounted"
            />
            <Area
              type="monotone"
              dataKey="disputes"
              stackId="a"
              stroke={LINEN_LOSS_COLORS.disputes}
              fill="url(#tagflowDisputes)"
              strokeWidth={1}
              isAnimationActive={false}
              name="disputes"
            />
            <Area
              type="monotone"
              dataKey="replacement"
              stackId="a"
              stroke={LINEN_LOSS_COLORS.replacement}
              fill="url(#tagflowReplacement)"
              strokeWidth={1}
              isAnimationActive={false}
              name="replacement"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{insight}</p>
    </div>
  )
}

/** Section 2 — Annual savings waterfall (Baseline → reductions → Net) */
const WATERFALL_DATA = [
  { name: "baseline", value: 60000, label: "Baseline", isTotal: true },
  { name: "lostLinen", value: -28000, label: "Lost linen", isTotal: false },
  { name: "disputes", value: -12000, label: "Disputes", isTotal: false },
  { name: "inventory", value: -7000, label: "Inventory time", isTotal: false },
  { name: "emergency", value: -9000, label: "Emergency purchases", isTotal: false },
  { name: "net", value: 4000, label: "Net cost", isTotal: true },
]

const WATERFALL_BASELINE_COLOR = "hsl(0 0% 58%)"
const WATERFALL_SAVINGS_COLOR = "hsl(142 45% 42%)"
const WATERFALL_NET_COLOR = "hsl(220 25% 48%)"

export function TagFlowSavingsWaterfallChart({ className }: { className?: string }) {
  const { t } = useI18n()
  const s = (t as { tagflowPage?: Record<string, unknown> }).tagflowPage ?? {}
  const title = (s.chartWaterfallTitle as string) ?? "Annual Savings Breakdown After TagFlow"
  const subtitle = (s.chartWaterfallSubtitle as string) ?? "How RFID tracking converts losses into measurable savings"
  const insight = (s.chartWaterfallInsight as string) ?? "TagFlow turns diffuse losses into traceable data and immediate savings."
  const kpi1 = (s.chartWaterfallKpi1 as string) ?? "Losses reduced: -30% to -70%"
  const kpi2 = (s.chartWaterfallKpi2 as string) ?? "Inventory: minutes, not hours"
  const kpi3 = (s.chartWaterfallKpi3 as string) ?? "Laundry disputes: significantly reduced"
  const formatEuro = (v: number) => `€${Math.abs(v).toLocaleString()}`
  const dataWithLabels = WATERFALL_DATA.map((d) => ({
    ...d,
    valueLabel: d.value >= 0 ? `€${(d.value / 1000).toFixed(0)}k` : `-€${(Math.abs(d.value) / 1000).toFixed(0)}k`,
  }))
  const barLabels = [
    (s.chartWaterfallBar1 as string) ?? "Baseline",
    (s.chartWaterfallBar2 as string) ?? "Lost linen",
    (s.chartWaterfallBar3 as string) ?? "Disputes",
    (s.chartWaterfallBar4 as string) ?? "Inventory time",
    (s.chartWaterfallBar5 as string) ?? "Emergency purchases",
    (s.chartWaterfallBar6 as string) ?? "Net cost",
  ]
  const waterfallDataTranslated = dataWithLabels.map((d, i) => ({ ...d, label: barLabels[i] ?? d.label }))
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 bg-card shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-card/90 dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]",
        "p-5 sm:p-6",
        className
      )}
      role="figure"
      aria-label={title}
    >
      <h3 className="font-hero text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl">
        {title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-md border border-border/60 bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground dark:border-white/15 dark:bg-white/10">
          {kpi1}
        </span>
        <span className="rounded-md border border-border/60 bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground dark:border-white/15 dark:bg-white/10">
          {kpi2}
        </span>
        <span className="rounded-md border border-border/60 bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground dark:border-white/15 dark:bg-white/10">
          {kpi3}
        </span>
      </div>
      <div className="mt-6 h-64 w-full min-h-[240px] sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={waterfallDataTranslated}
            margin={{ top: 24, right: 12, left: 0, bottom: 8 }}
            barGap={4}
            barCategoryGap="14%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10, fill: AXIS_STROKE }}
              axisLine={{ stroke: AXIS_STROKE }}
              tickLine={{ stroke: AXIS_STROKE }}
              interval={0}
            />
            <YAxis
              domain={[-32000, 65000]}
              tick={{ fontSize: 11, fill: AXIS_STROKE }}
              axisLine={{ stroke: AXIS_STROKE }}
              tickLine={{ stroke: AXIS_STROKE }}
              tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
              }}
              formatter={(value: number, _name: string, props: { payload?: { valueLabel: string } }) => [
                props?.payload?.valueLabel ?? formatEuro(value),
                "",
              ]}
              labelFormatter={(label) => label}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} isAnimationActive={false} maxBarSize={48}>
              <LabelList
                dataKey="value"
                position="top"
                style={{ fontSize: 10, fontWeight: 600 }}
                fill="hsl(0 0% 25%)"
                formatter={(value: number) => {
                  const n = Number(value)
                  if (typeof n !== "number" || Number.isNaN(n)) return ""
                  return n >= 0 ? `€${(n / 1000).toFixed(0)}k` : `-€${(Math.abs(n) / 1000).toFixed(0)}k`
                }}
              />
              {waterfallDataTranslated.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={
                    entry.isTotal
                      ? entry.value > 10000
                        ? WATERFALL_BASELINE_COLOR
                        : WATERFALL_NET_COLOR
                      : WATERFALL_SAVINGS_COLOR
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{insight}</p>
    </div>
  )
}

/** Items by zone (stacked bar) — Section 1 or 5 */
const ZONE_DATA = [
  { zone: "Rooms", inHouse: 420, atLaundry: 180 },
  { zone: "Spa", inHouse: 95, atLaundry: 45 },
  { zone: "Pool", inHouse: 120, atLaundry: 60 },
  { zone: "Laundry", inHouse: 0, atLaundry: 380 },
]

export function TagFlowItemsByZoneChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Tracked items by zone (sample day)</p>
      <div className="h-56 w-full min-h-[200px] sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ZONE_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
            <XAxis dataKey="zone" tick={{ fontSize: 12, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number, name: string) => [value, name === "inHouse" ? "On site" : "At laundry"]}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} formatter={(v) => (v === "inHouse" ? "On site" : "At laundry")} />
            <Bar dataKey="inHouse" stackId="a" fill={COLORS.inHouse} radius={[0, 0, 0, 0]} isAnimationActive={false} name="inHouse" />
            <Bar dataKey="atLaundry" stackId="a" fill={COLORS.atLaundry} radius={[4, 4, 0, 0]} isAnimationActive={false} name="atLaundry" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Real-time visibility by zone supports inventory control and reduces losses.
      </p>
    </div>
  )
}

/** Daily scan events (sample week) — Line */
const SCANS_DATA = [
  { day: "Mon", scans: 1240 },
  { day: "Tue", scans: 1180 },
  { day: "Wed", scans: 1320 },
  { day: "Thu", scans: 1410 },
  { day: "Fri", scans: 1580 },
  { day: "Sat", scans: 1690 },
  { day: "Sun", scans: 1420 },
]

export function TagFlowScansChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">RFID scan events per day (sample week)</p>
      <div className="h-56 w-full min-h-[200px] sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={SCANS_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number) => [value.toLocaleString(), "Scans"]}
              labelFormatter={(label) => `Day: ${label}`}
            />
            <Line type="monotone" dataKey="scans" stroke={COLORS.line} strokeWidth={2} dot={{ fill: COLORS.line, r: 3 }} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Automated tracking replaces manual counts and provides full traceability.
      </p>
    </div>
  )
}

/** Alerts by type (sample month) — horizontal bar with colors */
const ALERTS_DATA = [
  { type: "Unauthorized exit", count: 12, color: "hsl(12 45% 48%)" },
  { type: "Zone mismatch", count: 28, color: COLORS.bar },
  { type: "Low stock", count: 8, color: "hsl(185 20% 58%)" },
]

export function TagFlowAlertsChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Alerts by type (sample month)</p>
      <div className="h-56 w-full min-h-[200px] sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ALERTS_DATA} layout="vertical" margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis type="category" dataKey="type" tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} width={110} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number) => [value, "Alerts"]}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} isAnimationActive={false}>
              {ALERTS_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Instant notifications help prevent loss and resolve issues quickly.
      </p>
    </div>
  )
}
