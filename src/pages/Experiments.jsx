import { useState, useEffect } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import PageLayout from '../components/layout/PageLayout'
import Badge from '../components/ui/Badge'
import SectionHeader from '../components/ui/SectionHeader'
import { getForecastingEvaluation } from '../api/client'

const INITIAL_EXPERIMENTS = [
  { id: 'EXP-001', dataset: 'HPC2N', model: 'SARIMAX',      type: 'Forecasting', mae: 0.0248, rmse: 0.0708, r2: 0.270,   status: 'completed', date: 'Apr 2024',  note: 'Best forecasting model — selected as backbone' },
  { id: 'EXP-002', dataset: 'HPC2N', model: 'Naive Persistence', type: 'Forecasting', mae: 0.0196, rmse: 0.0789, r2: 0.092, status: 'completed', date: 'Apr 2024', note: 'Strong baseline; lower MAE but worse RMSE than SARIMAX' },
  { id: 'EXP-003', dataset: 'HPC2N', model: 'GRU',           type: 'Forecasting', mae: 0.2000, rmse: 0.2352, r2: -7.06,  status: 'completed', date: 'Apr 2024',  note: 'Failed under temporal regime shift' },
  { id: 'EXP-004', dataset: 'HPC2N', model: 'LSTM',          type: 'Forecasting', mae: 0.4806, rmse: 0.4981, r2: -35.15, status: 'completed', date: 'Apr 2024',  note: 'Severe regime shift failure' },
  { id: 'EXP-005', dataset: 'HPC2N', model: 'TCN',           type: 'Forecasting', mae: 0.7047, rmse: 0.7419, r2: -79.19, status: 'completed', date: 'Apr 2024',  note: 'Causal dilated convolutions — regime shift' },
  { id: 'EXP-006', dataset: 'HPC2N', model: 'Bidirectional LSTM', type: 'Forecasting', mae: 0.7683, rmse: 0.8043, r2: -93.25, status: 'completed', date: 'Apr 2024', note: 'Worst RNN result' },
  { id: 'EXP-007', dataset: 'HPC2N', model: 'Transformer Encoder',   type: 'Forecasting', mae: 2.0538, rmse: 2.1734, r2: -687.23, status: 'completed', date: 'Apr 2024', note: 'Catastrophic failure under regime shift' },
  { id: 'EXP-008', dataset: 'Cloud Simulation', model: 'PPO',        type: 'Scheduling', throughput: 0.590, dropRate: '41.00%', status: 'completed', date: 'Aug 2024', note: 'Highest throughput, lowest drop rate' },
  { id: 'EXP-009', dataset: 'Cloud Simulation', model: 'Least Connections', type: 'Scheduling', throughput: 0.467, dropRate: '—', status: 'completed', date: 'Aug 2024', note: 'Better latency/load variance than PPO' },
  { id: 'EXP-010', dataset: 'Cloud Simulation', model: 'Round Robin', type: 'Scheduling', throughput: 0.463, dropRate: '—', status: 'completed', date: 'Aug 2024', note: 'Standard baseline' },
  { id: 'EXP-011', dataset: 'Cloud Simulation', model: 'Random',      type: 'Scheduling', throughput: 0.451, dropRate: '—', status: 'completed', date: 'Aug 2024', note: 'Lowest throughput baseline' },
  { id: 'EXP-012', dataset: 'Cloud Simulation', model: 'PPO + AdaptiveReward', type: 'Scheduling', throughput: null, dropRate: null, status: 'pending', date: '2025 (Planned)', note: 'Adaptive reward enabled; evaluation pending' },
  { id: 'EXP-013', dataset: 'Cloud Simulation', model: 'MAPPO',       type: 'Scheduling', throughput: null, dropRate: null, status: 'pending', date: '2025 (Planned)', note: 'Multi-agent Dec-POMDP; architecture specified, training pending' },
]

const TYPE_COLORS = { Forecasting: 'blue', Scheduling: 'green' }
const STATUS_COLORS = { completed: 'green', pending: 'yellow', failed: 'red' }

export default function Experiments() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [experiments, setExperiments] = useState(INITIAL_EXPERIMENTS)

  useEffect(() => {
    async function syncBackendEvaluation() {
      const apiData = await getForecastingEvaluation()
      if (apiData && apiData.results) {
        const liveMap = new Map(apiData.results.map((r) => [r.model.toLowerCase(), r]))
        setExperiments((prev) =>
          prev.map((e) => {
            const live = liveMap.get(e.model.toLowerCase())
            return live ? { ...e, mae: live.mae, rmse: live.rmse, r2: live.r2 } : e
          })
        )
      }
    }
    syncBackendEvaluation()
  }, [])

  const filtered = experiments.filter((e) => {
    const matchType = typeFilter === 'All' || e.type === typeFilter
    const matchSearch = e.model.toLowerCase().includes(search.toLowerCase()) ||
                        e.id.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  return (
    <PageLayout>
      <div className="pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label="Experiments"
            title="Experiment Tracker"
            subtitle="All experiments conducted in this research, sourced from Table 1 and Table 6 of the paper. Pending experiments are next-phase work."
          />

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1 max-w-sm">
              <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
              <input
                className="input pl-9"
                placeholder="Search experiments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {['All', 'Forecasting', 'Scheduling'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`btn-sm ${typeFilter === t ? 'btn-primary' : 'btn-outline'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8">
            {[
              { label: 'Total', value: experiments.length },
              { label: 'Completed', value: experiments.filter((e) => e.status === 'completed').length },
              { label: 'Pending', value: experiments.filter((e) => e.status === 'pending').length },
              { label: 'Forecasting', value: experiments.filter((e) => e.type === 'Forecasting').length },
              { label: 'Scheduling', value: experiments.filter((e) => e.type === 'Scheduling').length },
            ].map((s) => (
              <div key={s.label} className="card p-4 text-center">
                <p className="text-2xl font-bold text-surface-900 dark:text-white">{s.value}</p>
                <p className="text-xs text-surface-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700">
                  {['Exp ID', 'Model', 'Type', 'Dataset', 'Key Metric', 'Status', 'Date', 'Notes'].map((h) => (
                    <th key={h} className="px-4 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                {filtered.map((exp, i) => (
                  <tr key={exp.id} className={`${i % 2 === 0 ? 'bg-white dark:bg-surface-900' : 'bg-surface-50/50 dark:bg-surface-800/20'} hover:bg-primary-50/20 dark:hover:bg-primary-900/5 transition-colors`}>
                    <td className="px-4 py-3.5 font-mono text-xs text-surface-500">{exp.id}</td>
                    <td className="px-4 py-3.5 font-medium text-surface-900 dark:text-white whitespace-nowrap">{exp.model}</td>
                    <td className="px-4 py-3.5">
                      <Badge variant={TYPE_COLORS[exp.type] || 'gray'}>{exp.type}</Badge>
                    </td>
                    <td className="px-4 py-3.5 text-surface-600 dark:text-surface-400 text-xs">{exp.dataset}</td>
                    <td className="px-4 py-3.5 font-mono text-xs text-surface-600 dark:text-surface-400">
                      {exp.rmse ? `RMSE: ${exp.rmse}` : exp.throughput ? `Thru: ${exp.throughput}` : '—'}
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge variant={STATUS_COLORS[exp.status]} dot>{exp.status}</Badge>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-surface-500 whitespace-nowrap">{exp.date}</td>
                    <td className="px-4 py-3.5 text-xs text-surface-500 max-w-xs truncate">{exp.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-surface-400 mt-3 text-center">
            {filtered.length} experiments shown · All data from the research paper
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
