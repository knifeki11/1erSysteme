"use client"

import {
  BarChart,
  ComposedChart,
  Line,
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
  LabelList,
} from "recharts"
import { useI18n } from "@/lib/i18n-context"
import { cn } from "@/lib/utils"

const GRID_STROKE = "hsl(0 0% 90%)"
const AXIS_STROKE = "hsl(0 0% 45%)"
const COLORS = {
  bar: "hsl(32 28% 48%)",
  line: "hsl(32 22% 42%)",
  pie: ["hsl(32 25% 48%)", "hsl(32 18% 62%)", "hsl(32 15% 72%)", "hsl(32 20% 55%)"],
}

/** Daily transactions and revenue (Composed) — Section 2 or 5 */
const DAILY_DATA = [
  { day: "Mon", transactions: 312, revenue: 1240 },
  { day: "Tue", transactions: 348, revenue: 1380 },
  { day: "Wed", transactions: 335, revenue: 1310 },
  { day: "Thu", transactions: 382, revenue: 1520 },
  { day: "Fri", transactions: 418, revenue: 1680 },
  { day: "Sat", transactions: 290, revenue: 1120 },
]

export function CantiPosDailyChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Daily transactions and revenue (sample week)</p>
      <div className="h-56 w-full min-h-[200px] sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={DAILY_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis yAxisId="left" tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} tickFormatter={(v) => `€${v}`} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number, name: string) => [name === "revenue" ? "€" + value : value, name === "revenue" ? "Revenue" : "Transactions"]}
              labelFormatter={(label) => `Day: ${label}`}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar yAxisId="left" dataKey="transactions" fill={COLORS.bar} radius={[4, 4, 0, 0]} isAnimationActive={false} name="Transactions" />
            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke={COLORS.line} strokeWidth={2} dot={{ fill: COLORS.line, r: 3 }} isAnimationActive={false} name="Revenue (€)" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Real-time monitoring of transactions and revenue supports operational control.
      </p>
    </div>
  )
}

/** Payment methods (pie) */
const PAYMENT_DATA = [
  { name: "Prepaid balance", value: 52, color: COLORS.pie[0] },
  { name: "Subsidy", value: 28, color: COLORS.pie[1] },
  { name: "Card", value: 14, color: COLORS.pie[2] },
  { name: "Cash", value: 6, color: COLORS.pie[3] },
]

export function CantiPosPaymentMixChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Payment mix (sample month, %)</p>
      <div className="mx-auto h-56 w-full min-h-[200px] sm:h-64 sm:max-w-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={PAYMENT_DATA}
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={76}
              paddingAngle={2}
              dataKey="value"
              isAnimationActive={false}
              label={({ name, value }) => `${name}: ${value}%`}
              labelLine={false}
            >
              {PAYMENT_DATA.map((entry, index) => (
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
        Visibility on payment methods supports subsidy and balance management.
      </p>
    </div>
  )
}

/** Meals served by site (bar) */
const MEALS_DATA = [
  { site: "Site A", meals: 1240 },
  { site: "Site B", meals: 980 },
  { site: "Site C", meals: 756 },
]

export function CantiPosMealsBySiteChart({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card/40 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]", className)}>
      <p className="mb-3 text-sm font-medium text-foreground">Meals served per site (sample week)</p>
      <div className="h-56 w-full min-h-[200px] sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={MEALS_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
            <XAxis dataKey="site" tick={{ fontSize: 12, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <YAxis tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              formatter={(value: number) => [value.toLocaleString(), "Meals"]}
              labelFormatter={(label) => `Site: ${label}`}
            />
            <Bar dataKey="meals" fill={COLORS.bar} radius={[4, 4, 0, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Multi-site reporting supports centralized management and comparison.
      </p>
    </div>
  )
}

const LOSS_BAR_NEUTRAL = "hsl(0 0% 72%)"
const LOSS_BAR_TOP = "hsl(32 35% 38%)"
const IMPACT_BEFORE_COLOR = "hsl(0 0% 65%)"
const IMPACT_AFTER_COLOR = "hsl(var(--accent))"

/** Problem: sources of loss/friction in collective catering (horizontal bar) */
export function CantiPosProblemChart({ className }: { className?: string }) {
  const { t } = useI18n()
  const c = (t as { cantiposPage?: Record<string, unknown> }).cantiposPage ?? {}
  const title = (c.chartLossTitle as string) ?? "Sources of Loss and Friction in Collective Catering"
  const subtitle = (c.chartLossSubtitle as string) ?? "Typical pain points without integrated cashless management"
  const insight = (c.chartLossInsight as string) ?? "Manual processes and poor visibility drive long queues, revenue leakage, and heavy admin load."
  const tooltipLabel = (c.chartLossTooltipLabel as string) ?? "Share of impact"
  const data = [
    { name: (c.chartLossBar1 as string) ?? "Subsidy abuse / fraud", value: 28, label: "28%", isTop: true },
    { name: (c.chartLossBar2 as string) ?? "Long queues at peak", value: 22, label: "22%", isTop: false },
    { name: (c.chartLossBar3 as string) ?? "Manual cash handling errors", value: 18, label: "18%", isTop: false },
    { name: (c.chartLossBar4 as string) ?? "Account balance disputes", value: 14, label: "14%", isTop: false },
    { name: (c.chartLossBar5 as string) ?? "Multi-site visibility gaps", value: 10, label: "10%", isTop: false },
    { name: (c.chartLossBar6 as string) ?? "Administrative overload", value: 8, label: "8%", isTop: false },
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
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: AXIS_STROKE }} axisLine={{ stroke: AXIS_STROKE }} tickLine={{ stroke: AXIS_STROKE }} width={140} />
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

/** Business impact: before vs after CantiPos (grouped bar) */
export function CantiPosImpactChart({ className }: { className?: string }) {
  const { t } = useI18n()
  const c = (t as { cantiposPage?: Record<string, unknown> }).cantiposPage ?? {}
  const impactTitle = (c.chartImpactTitle as string) ?? "Impact of CantiPos on Canteen Operations"
  const impactSubtitle = (c.chartImpactSubtitle as string) ?? "Before vs after integrated cashless and subsidy control"
  const impactBefore = (c.chartImpactBefore as string) ?? "Before"
  const impactAfter = (c.chartImpactAfter as string) ?? "After"
  const impactData = [
    { metric: (c.chartImpactMetric1 as string) ?? "Peak queue time", before: 18, after: 8, beforeLabel: "18 min", afterLabel: "8 min" },
    { metric: (c.chartImpactMetric2 as string) ?? "Revenue captured", before: 78, after: 100, beforeLabel: "78%", afterLabel: "100%" },
    { metric: (c.chartImpactMetric3 as string) ?? "Admin time (hrs/week)", before: 25, after: 15, beforeLabel: "25", afterLabel: "15" },
    { metric: (c.chartImpactMetric4 as string) ?? "Fraud incidents", before: 100, after: 30, beforeLabel: "100", afterLabel: "30" },
  ]
  const kpiBadges = ((c.chartImpactKpis as readonly string[]) ?? ["-55% queue time", "+28% revenue capture", "-40% admin time", "-70% fraud incidents"])
  const insight = (c.chartImpactInsight as string) ?? "Faster checkout, full traceability, and automated subsidy rules reduce loss and admin time."
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
