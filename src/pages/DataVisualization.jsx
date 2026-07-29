import { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar,
} from 'recharts'
import PageLayout from '../components/layout/PageLayout'
import SectionHeader from '../components/ui/SectionHeader'
import Card from '../components/ui/Card'
import Tabs from '../components/ui/Tabs'
import Badge from '../components/ui/Badge'
import {
  FORECASTING_RESULTS, SCHEDULING_RESULTS, SERVER_CONFIGS, TASK_CATEGORIES
} from '../utils/paperData'

const COLORS = {
  primary: '#2563eb',
  secondary: '#64748b',
  green: '#10b981',
  amber: '#f59e0b',
  red: '#ef4444',
  purple: '#8b5cf6',
}

/* Custom tooltip */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="card p-3 text-xs shadow-card-lg">
      <p className="font-semibold text-surface-900 dark:text-white mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  )
}

/* Chart 1: Forecasting Model Comparison */
function ForecastingChart() {
  const data = FORECASTING_RESULTS.map((r) => ({
    name: r.model.length > 12 ? r.model.slice(0, 12) + '…' : r.model,
    fullName: r.model,
    MAE: r.mae,
    RMSE: r.rmse,
    isWinner: r.isWinner,
  }))
  return (
    <div>
      <p className="text-sm text-surface-500 dark:text-surface-400 mb-4">
        MAE and RMSE comparison across 7 forecasting models. SARIMAX and Naive Persistence substantially
        outperform all deep learning models under chronological evaluation. Note: R² is omitted from the
        chart because its large negative values for DL models (down to −687.23) would compress the bars.
      </p>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: '#64748b' }}
            angle={-35} textAnchor="end" interval={0}
          />
          <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" />
          <Bar dataKey="MAE"  fill={COLORS.primary}    radius={[3, 3, 0, 0]} />
          <Bar dataKey="RMSE" fill={COLORS.secondary}  radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

/* Chart 2: Scheduling Throughput */
function SchedulingChart() {
  const data = SCHEDULING_RESULTS.map((r) => ({
    name: r.scheduler.replace(' (Ours)', ''),
    Throughput: r.throughput,
    isProposed: r.isProposed,
  }))
  return (
    <div>
      <p className="text-sm text-surface-500 dark:text-surface-400 mb-4">
        Throughput comparison of the single-agent PPO scheduler against three traditional scheduling
        baselines. PPO achieves the highest throughput of 0.590.
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
          <YAxis tick={{ fontSize: 12, fill: '#64748b' }} domain={[0.4, 0.65]} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="Throughput" radius={[6, 6, 0, 0]}
            fill={COLORS.primary}
            label={{ position: 'top', fontSize: 11, fill: '#475569' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

/* Chart 3: Server capabilities radar */
function ServerRadarChart() {
  const data = SERVER_CONFIGS.map((s) => ({
    server: s.type.split(' ')[0],
    CPU: s.cpu,
    RAM: s.ram,
    IO: s.io,
  }))
  const colors = [COLORS.primary, COLORS.green, COLORS.purple, COLORS.amber, COLORS.secondary, COLORS.red]
  return (
    <div>
      <p className="text-sm text-surface-500 dark:text-surface-400 mb-4">
        Server capability comparison across CPU, RAM, and I/O dimensions (from Table 2).
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={SERVER_CONFIGS.map((s) => ({
          subject: s.type.split(' ')[0],
          CPU: s.cpu * 50,
          RAM: s.ram * 50,
          IO: s.io * 50,
        }))}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
          <PolarRadiusAxis tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[0, 100]} />
          <Radar name="CPU" dataKey="CPU"  stroke={COLORS.primary}  fill={COLORS.primary}  fillOpacity={0.15} />
          <Radar name="RAM" dataKey="RAM"  stroke={COLORS.green}   fill={COLORS.green}   fillOpacity={0.15} />
          <Radar name="I/O" dataKey="IO"   stroke={COLORS.purple}  fill={COLORS.purple}  fillOpacity={0.15} />
          <Legend verticalAlign="bottom" />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

/* Chart 4: Task categories bar */
function TaskCategoryChart() {
  const data = TASK_CATEGORIES.map((t) => ({
    name: t.task.split(' ')[0],
    CPU: t.cpu,
    RAM: t.ram,
    IO: t.io,
    Duration: t.duration / 100,
  }))
  return (
    <div>
      <p className="text-sm text-surface-500 dark:text-surface-400 mb-4">
        Resource requirements per task category (normalized). Duration scaled by 1/100 for visualization (from Table 3).
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
          <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" />
          <Bar dataKey="CPU"      fill={COLORS.primary}   radius={[3, 3, 0, 0]} />
          <Bar dataKey="RAM"      fill={COLORS.green}     radius={[3, 3, 0, 0]} />
          <Bar dataKey="IO"       fill={COLORS.amber}     radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

/* Chart 5: RMSE comparison line */
function RMSELine() {
  const data = FORECASTING_RESULTS.map((r) => ({
    model: r.model.length > 10 ? r.model.slice(0, 10) + '…' : r.model,
    RMSE: r.rmse,
  }))
  return (
    <div>
      <p className="text-sm text-surface-500 dark:text-surface-400 mb-4">
        RMSE trend across models — clearly shows the dramatic jump in error from statistical to deep learning models under temporal regime shift.
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="model" tick={{ fontSize: 11, fill: '#64748b' }} angle={-35} textAnchor="end" interval={0} />
          <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="RMSE" stroke={COLORS.red} strokeWidth={2} dot={{ r: 4, fill: COLORS.primary }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const CHART_TABS = [
  { id: 'forecasting', label: 'Forecasting Comparison', component: <ForecastingChart /> },
  { id: 'scheduling',  label: 'Scheduling Throughput',  component: <SchedulingChart /> },
  { id: 'rmse',        label: 'RMSE Trend',             component: <RMSELine /> },
  { id: 'servers',     label: 'Server Capabilities',    component: <ServerRadarChart /> },
  { id: 'tasks',       label: 'Task Categories',        component: <TaskCategoryChart /> },
]

export default function DataVisualization() {
  return (
    <PageLayout>
      <div className="pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            label="Data Visualization"
            title="Interactive Charts"
            subtitle="All charts are based on experimental results and data tables from the research paper. Numbers are sourced directly from the PDF."
          />

          {/* Tabs */}
          <Tabs tabs={CHART_TABS.map((c) => c.label)}>
            {(active) => {
              const chart = CHART_TABS.find((c) => c.label === active)
              return (
                <Card className="p-6">
                  <h3 className="font-semibold text-surface-900 dark:text-white mb-1">{chart?.label}</h3>
                  <Badge variant="gray" className="mb-5">Source: Research Paper PDF</Badge>
                  {chart?.component}
                </Card>
              )
            }}
          </Tabs>

          {/* Key insights */}
          <div className="mt-12">
            <SectionHeader
              label="Key Insights"
              title="What the Data Shows"
            />
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: '🏆', title: 'SARIMAX Wins', text: 'RMSE 0.0708 vs 0.0789 for Naive Persistence and 2.1734 for Transformer. Statistical model outperforms all DL models.' },
                { icon: '📉', title: 'Temporal Regime Shift', text: 'DL models learned training distribution only. The final 20% contained bursts absent from training data, causing catastrophic R² values.' },
                { icon: '⚡', title: 'PPO Throughput', text: 'PPO scheduler achieves 0.590 throughput vs. 0.463 for Round Robin — a 27.4% improvement in resource utilization.' },
                { icon: '⚖️', title: 'Latency Trade-off', text: 'Least Connections achieves better latency and load variance than PPO, revealing a throughput vs. response-time trade-off.' },
              ].map((insight) => (
                <Card key={insight.title} hover className="flex gap-3">
                  <span className="text-2xl flex-shrink-0">{insight.icon}</span>
                  <div>
                    <p className="font-semibold text-surface-900 dark:text-white mb-1">{insight.title}</p>
                    <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{insight.text}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
