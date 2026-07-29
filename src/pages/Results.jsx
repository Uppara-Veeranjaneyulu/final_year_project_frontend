import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts'
import { HiOutlineDownload, HiOutlineChartBar } from 'react-icons/hi'
import PageLayout from '../components/layout/PageLayout'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import SectionHeader from '../components/ui/SectionHeader'
import { MetricCard } from '../components/ui/MetricCard'
import { FORECASTING_RESULTS, SCHEDULING_RESULTS } from '../utils/paperData'

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

export default function Results() {
  return (
    <PageLayout>
      <div className="pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between gap-4 mb-10">
            <SectionHeader
              label="Results"
              title="Experimental Results"
              subtitle="All results are sourced directly from the research paper PDF. No results are fabricated or estimated."
            />
            <button className="btn-outline gap-2 flex-shrink-0">
              <HiOutlineDownload /> Export
            </button>
          </div>

          {/* ── Forecasting Results ── */}
          <section className="mb-14">
            <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
              Forecasting Performance (Table 1)
            </h2>
            <p className="text-sm text-surface-500 dark:text-surface-400 mb-6">
              Seven forecasting models evaluated on identical preprocessing conditions (24-step window, 80–20 chronological split).
            </p>

            {/* Key metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <MetricCard label="Best RMSE"      value="0.0708"  sub="SARIMAX"           icon="🏆" color="blue" />
              <MetricCard label="Best R²"         value="0.270"   sub="SARIMAX"           icon="📈" color="green" />
              <MetricCard label="Worst RMSE"     value="2.1734"  sub="Transformer"        icon="📉" color="red" />
              <MetricCard label="Worst R²"        value="-687.23" sub="Temporal regime shift" icon="⚠️" color="yellow" />
            </div>

            {/* Comparison table */}
            <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800 mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700">
                    {['Rank', 'Model', 'Type', 'MAE', 'RMSE ↓', 'R²', 'Status'].map((h) => (
                      <th key={h} className="px-4 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                  {FORECASTING_RESULTS.map((r, i) => (
                    <tr key={r.model} className={`${r.isWinner ? 'bg-primary-50/60 dark:bg-primary-900/10' : 'bg-white dark:bg-surface-900'} hover:bg-surface-50 dark:hover:bg-surface-800/50`}>
                      <td className="px-4 py-3.5 text-surface-500 font-mono text-xs">#{i + 1}</td>
                      <td className="px-4 py-3.5 font-medium text-surface-900 dark:text-white whitespace-nowrap">
                        {r.model}
                        {r.isWinner && <Badge variant="blue" className="ml-2">Selected</Badge>}
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge variant={r.type === 'Statistical' ? 'blue' : r.type === 'Baseline' ? 'gray' : 'purple'}>{r.type}</Badge>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-surface-600 dark:text-surface-400">{r.mae.toFixed(4)}</td>
                      <td className={`px-4 py-3.5 font-mono font-semibold ${r.isWinner ? 'text-primary-700 dark:text-primary-300' : 'text-surface-600 dark:text-surface-400'}`}>
                        {r.rmse.toFixed(4)}
                      </td>
                      <td className={`px-4 py-3.5 font-mono ${r.r2 < 0 ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'}`}>
                        {r.r2.toFixed(3)}
                      </td>
                      <td className="px-4 py-3.5">
                        {r.isWinner
                          ? <Badge variant="blue" dot>Forecasting backbone</Badge>
                          : r.r2 < 0
                          ? <Badge variant="red">Failed (regime shift)</Badge>
                          : <Badge variant="gray">Baseline</Badge>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Chart */}
            <Card>
              <p className="font-medium text-surface-900 dark:text-white mb-4">MAE & RMSE Comparison</p>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart
                  data={FORECASTING_RESULTS.map((r) => ({
                    name: r.model.length > 10 ? r.model.slice(0, 10) + '…' : r.model,
                    MAE: r.mae, RMSE: r.rmse,
                  }))}
                  margin={{ top: 5, right: 20, left: 0, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} angle={-30} textAnchor="end" interval={0} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" />
                  <Bar dataKey="MAE"  fill="#2563eb" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="RMSE" fill="#64748b" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </section>

          {/* ── Scheduling Results ── */}
          <section>
            <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
              Scheduling Performance (Table 6)
            </h2>
            <p className="text-sm text-surface-500 dark:text-surface-400 mb-6">
              Single-agent PPO scheduler evaluated against three traditional baselines.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <MetricCard label="PPO Throughput"   value="0.590"   sub="Highest"    icon="⚡" color="blue" />
              <MetricCard label="PPO Drop Rate"    value="41.00%"  sub="Lowest"     icon="📉" color="green" />
              <MetricCard label="RR Throughput"    value="0.463"   sub="Round Robin" icon="🔄" color="yellow" />
              <MetricCard label="LC Throughput"    value="0.467"   sub="Least Conn." icon="🔗" color="yellow" />
            </div>

            <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800 mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700">
                    {['Scheduler', 'Throughput ↑', 'Drop Rate ↓', 'CPU Util.', 'Latency', 'Load Variance'].map((h) => (
                      <th key={h} className="px-4 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                  {SCHEDULING_RESULTS.map((r) => (
                    <tr key={r.scheduler} className={`${r.isProposed ? 'bg-primary-50/50 dark:bg-primary-900/10' : 'bg-white dark:bg-surface-900'} hover:bg-surface-50 dark:hover:bg-surface-800/50`}>
                      <td className="px-4 py-3.5 font-medium text-surface-900 dark:text-white whitespace-nowrap">
                        {r.scheduler}
                        {r.isProposed && <Badge variant="blue" className="ml-2">Proposed</Badge>}
                      </td>
                      <td className={`px-4 py-3.5 font-mono font-semibold ${r.isProposed ? 'text-primary-700 dark:text-primary-300' : 'text-surface-600 dark:text-surface-400'}`}>
                        {r.throughput.toFixed(3)}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-surface-600 dark:text-surface-400">
                        {r.dropRate !== null ? `${r.dropRate.toFixed(2)}%` : '—'}
                      </td>
                      <td className="px-4 py-3.5 text-surface-600 dark:text-surface-400">{r.cpuUtil}</td>
                      <td className="px-4 py-3.5 text-surface-600 dark:text-surface-400">{r.latency}</td>
                      <td className="px-4 py-3.5 text-surface-600 dark:text-surface-400">{r.loadVariance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Card>
              <p className="font-medium text-surface-900 dark:text-white mb-4">Throughput Comparison</p>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  data={SCHEDULING_RESULTS.map((r) => ({
                    name: r.scheduler.replace(' (Ours)', '').replace('Connections', 'Conn.'),
                    Throughput: r.throughput,
                  }))}
                  margin={{ top: 5, right: 20, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} domain={[0.4, 0.65]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="Throughput" fill="#2563eb" radius={[6, 6, 0, 0]}
                    label={{ position: 'top', fontSize: 11, fill: '#475569' }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Key findings */}
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <Card className="bg-primary-50 dark:bg-primary-900/10 border-primary-200 dark:border-primary-800/40">
                <p className="font-semibold text-primary-800 dark:text-primary-200 mb-2">✓ PPO Advantage</p>
                <p className="text-sm text-primary-700 dark:text-primary-300 leading-relaxed">
                  PPO achieved the highest throughput (0.590) and lowest drop rate (41.00%), demonstrating
                  the potential of learned resource allocation.
                </p>
              </Card>
              <Card className="bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30">
                <p className="font-semibold text-amber-800 dark:text-amber-200 mb-2">⚖️ Trade-off Observed</p>
                <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                  Least Connections achieved better latency and load variance, highlighting a trade-off
                  between aggressive resource utilization and response time.
                </p>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}
