"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  Cell,
  Legend,
  LabelList,
} from "recharts"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"

const GRID_STROKE = "hsl(0 0% 90%)"
const AXIS_STROKE = "hsl(0 0% 45%)"
const COLORS = {
  area: "hsl(142 28% 42%)",
  bar: ["hsl(142 25% 48%)", "hsl(142 20% 58%)", "hsl(142 18% 65%)", "hsl(142 22% 52%)"],
  line: "hsl(140 24% 44%)",
}

/** Stock level trend (sample product, last 7 days) */
const STOCK_DATA = [
  { day: "Mon", level: 420 },
  { day: "Tue", level: 385 },
  { day: "Wed", level: 348 },
  { day: "Thu", level: 412 },
  { day: "Fri", level: 368 },
  { day: "Sat", level: 335 },
  { day: "Sun", level: 290 },
]

export function OneTouchStockChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Stock level (sample SKU, last 7 days)</p>
      <div className="h-56 w-full min-h-[200px] sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={STOCK_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="onetouchStock" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.area} stopOpacity={0.35} />
                <stop offset="100%" stopColor={COLORS.area} stopOpacity={0.06} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number) => [value, "Units"]}
              labelFormatter={(label) => `Day: ${label}`}
            />
            <Area type="monotone" dataKey="level" stroke={COLORS.area} fill="url(#onetouchStock)" strokeWidth={1.5} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Real-time stock visibility supports reorder alerts and inventory control.
      </p>
    </div>
  )
}

/** Orders by status (sample month) — horizontal bar */
const ORDERS_DATA = [
  { status: "Delivered", count: 184, color: COLORS.bar[0] },
  { status: "In progress", count: 42, color: COLORS.bar[1] },
  { status: "Pending", count: 28, color: COLORS.bar[2] },
  { status: "Delayed", count: 6, color: COLORS.bar[3] },
]

export function OneTouchOrdersChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Purchase orders by status (sample month)</p>
      <div className="h-56 w-full min-h-[200px] sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ORDERS_DATA} layout="vertical" margin={{ top: 8, right: 8, left: 72, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis type="category" dataKey="status" tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} width={70} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number) => [value, "Orders"]}
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
        Procurement and delivery monitoring improve supplier coordination.
      </p>
    </div>
  )
}

/** Production cost trend (sample week) */
const COST_DATA = [
  { day: "Mon", cost: 4.2 },
  { day: "Tue", cost: 4.1 },
  { day: "Wed", cost: 3.9 },
  { day: "Thu", cost: 4.0 },
  { day: "Fri", cost: 3.8 },
  { day: "Sat", cost: 3.7 },
]

export function OneTouchCostChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Unit cost trend (sample product, €)</p>
      <div className="h-56 w-full min-h-[200px] sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={COST_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} tickFormatter={(v) => "€" + v} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number) => ["€" + value.toFixed(2), "Unit cost"]}
              labelFormatter={(label) => `Day: ${label}`}
            />
            <Line type="monotone" dataKey="cost" stroke={COLORS.line} strokeWidth={2} dot={{ fill: COLORS.line, r: 3 }} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Cost monitoring supports production and procurement decisions.
      </p>
    </div>
  )
}

const LOSS_BAR_NEUTRAL = "hsl(0 0% 72%)"
const LOSS_BAR_TOP = "hsl(142 35% 38%)"
const IMPACT_BEFORE_COLOR = "hsl(0 0% 65%)"
const IMPACT_AFTER_COLOR = "hsl(var(--accent))"

/** Problem: operational cost of poor inventory control (horizontal bar) */
export function OneTouchProblemChart({ className }: { className?: string }) {
  const { t } = useI18n()
  const o = (t as { onetouchPage?: Record<string, unknown> }).onetouchPage ?? {}
  const title = (o.chartLossTitle as string) ?? "Operational Cost of Poor Inventory Control"
  const subtitle = (o.chartLossSubtitle as string) ?? "Typical pain points without unified inventory and traceability"
  const insight = (o.chartLossInsight as string) ?? "Manual counts, poor visibility, and fragmented data drive stock-outs, waste, and production delays."
  const tooltipLabel = (o.chartLossTooltipLabel as string) ?? "Share of impact"
  const data = [
    { name: (o.chartLossBar1 as string) ?? "Stock-outs", value: 26, label: "26%", isTop: true },
    { name: (o.chartLossBar2 as string) ?? "Overstock", value: 22, label: "22%", isTop: false },
    { name: (o.chartLossBar3 as string) ?? "Manual count errors", value: 18, label: "18%", isTop: false },
    { name: (o.chartLossBar4 as string) ?? "Expired / waste", value: 14, label: "14%", isTop: false },
    { name: (o.chartLossBar5 as string) ?? "Supplier disputes", value: 12, label: "12%", isTop: false },
    { name: (o.chartLossBar6 as string) ?? "Production delays", value: 8, label: "8%", isTop: false },
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

/** Business impact: before vs after OneTouch (grouped bar) */
export function OneTouchImpactChart({ className }: { className?: string }) {
  const { t } = useI18n()
  const o = (t as { onetouchPage?: Record<string, unknown> }).onetouchPage ?? {}
  const impactTitle = (o.chartImpactTitle as string) ?? "Impact of OneTouch on Operations"
  const impactSubtitle = (o.chartImpactSubtitle as string) ?? "Before vs after unified inventory, procurement, and traceability"
  const impactBefore = (o.chartImpactBefore as string) ?? "Before"
  const impactAfter = (o.chartImpactAfter as string) ?? "After"
  const impactData = [
    { metric: (o.chartImpactMetric1 as string) ?? "Stock accuracy", before: 62, after: 97, beforeLabel: "62%", afterLabel: "97%" },
    { metric: (o.chartImpactMetric2 as string) ?? "On-time delivery", before: 68, after: 92, beforeLabel: "68%", afterLabel: "92%" },
    { metric: (o.chartImpactMetric3 as string) ?? "Inventory time", before: 100, after: 30, beforeLabel: "100%", afterLabel: "30%" },
    { metric: (o.chartImpactMetric4 as string) ?? "Waste / expiry", before: 100, after: 50, beforeLabel: "100%", afterLabel: "50%" },
  ]
  const kpiBadges = ((o.chartImpactKpis as readonly string[]) ?? ["+40% stock accuracy", "+35% on-time delivery", "-70% inventory time", "-50% waste"])
  const insight = (o.chartImpactInsight as string) ?? "Real-time stock, automated reorders, and full traceability reduce waste and improve on-time delivery."
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
