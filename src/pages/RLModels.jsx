import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi'
import PageLayout from '../components/layout/PageLayout'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import SectionHeader from '../components/ui/SectionHeader'
import { RL_MODELS, PPO_CONFIG, MAPPO_CONFIG, SCHEDULING_RESULTS } from '../utils/paperData'

function RLModelCard({ model }) {
  const [expanded, setExpanded] = useState(false)

  const statusColors = {
    implemented: 'green',
    specified: 'yellow',
    available: 'gray',
  }

  return (
    <Card
      hover
      className={`${model.id === 'ppo' ? 'border-primary-200 dark:border-primary-800/50' :
                    model.id === 'mappo' ? 'border-amber-200 dark:border-amber-800/30' : ''}`}
    >
      {/* Header */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant={statusColors[model.status]}>
            {model.statusLabel}
          </Badge>
          <Badge variant="gray">{model.category}</Badge>
        </div>
        <h3 className="font-semibold text-surface-900 dark:text-white">{model.name}</h3>
      </div>

      <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed mb-4">{model.description}</p>

      {/* Equation */}
      {model.equation && (
        <div className="card p-3 mb-4 bg-surface-50 dark:bg-surface-800/50">
          <p className="text-xs text-surface-400 mb-1">Objective</p>
          <p className="font-mono text-xs text-surface-700 dark:text-surface-300 leading-relaxed">{model.equation}</p>
        </div>
      )}

      {/* Results badge */}
      {model.results && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="metric-pill text-center">
            <span className="text-xs text-surface-400">Throughput</span>
            <span className="text-lg font-bold text-primary-700 dark:text-primary-300">{model.results.throughput}</span>
          </div>
          <div className="metric-pill text-center">
            <span className="text-xs text-surface-400">Drop Rate</span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{model.results.dropRate}</span>
          </div>
          {model.results.note && (
            <p className="col-span-2 text-xs text-surface-400 text-center">{model.results.note}</p>
          )}
        </div>
      )}

      {/* No results — pending */}
      {model.results === null && model.status === 'specified' && (
        <Card className="mb-4 bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30">
          <p className="text-xs text-amber-700 dark:text-amber-300">
            No empirical results available yet. Architecture fully specified; evaluation is the immediate next phase.
          </p>
        </Card>
      )}

      {/* Training config */}
      {(model.id === 'ppo' || model.id === 'mappo') && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between text-sm text-surface-500 dark:text-surface-400 pt-3 border-t border-surface-100 dark:border-surface-800 hover:text-surface-900 dark:hover:text-white transition-colors"
        >
          <span>Training Configuration</span>
          {expanded ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
        </button>
      )}

      {/* Advantages */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full flex items-center justify-between text-sm text-surface-500 dark:text-surface-400 pt-3 ${model.id !== 'ppo' && model.id !== 'mappo' ? 'border-t border-surface-100 dark:border-surface-800' : ''} hover:text-surface-900 dark:hover:text-white transition-colors`}
      >
        <span>Advantages & Disadvantages</span>
        {expanded ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-3 grid sm:grid-cols-2 gap-3"
          >
            <div>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">✓ Advantages</p>
              <ul className="space-y-1">
                {model.advantages.map((a) => (
                  <li key={a} className="text-xs text-surface-500 dark:text-surface-400 flex gap-1.5">
                    <span className="text-emerald-500 flex-shrink-0">+</span> {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-red-500 mb-2">✗ Disadvantages</p>
              <ul className="space-y-1">
                {model.disadvantages.map((d) => (
                  <li key={d} className="text-xs text-surface-500 dark:text-surface-400 flex gap-1.5">
                    <span className="text-red-400 flex-shrink-0">−</span> {d}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

export default function RLModels() {
  return (
    <PageLayout>
      <div className="pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label="RL Models"
            title="Reinforcement Learning Model Library"
            subtitle="Models used in this research: PPO (implemented & evaluated) and MAPPO (architecture specified). Additional RL baselines listed for reference."
          />

          {/* PPO Results highlight */}
          <div className="grid sm:grid-cols-4 gap-3 mb-10">
            {[
              { label: 'PPO Throughput',     value: '0.590', sub: 'Highest among all', color: 'text-primary-700 dark:text-primary-300' },
              { label: 'PPO Drop Rate',      value: '41.00%', sub: 'Lowest (best)',      color: 'text-emerald-600 dark:text-emerald-400' },
              { label: 'PPO vs Round Robin', value: '+27.4%', sub: 'Throughput gain',   color: 'text-primary-700 dark:text-primary-300' },
              { label: 'MAPPO Status',       value: 'Pending', sub: 'Evaluation next',  color: 'text-amber-600 dark:text-amber-400' },
            ].map((m) => (
              <Card key={m.label} className="text-center p-4">
                <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
                <p className="text-xs font-medium text-surface-700 dark:text-surface-300 mt-1">{m.label}</p>
                <p className="text-xs text-surface-400 mt-0.5">{m.sub}</p>
              </Card>
            ))}
          </div>

          {/* RL model grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RL_MODELS.map((model, i) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <RLModelCard model={model} />
              </motion.div>
            ))}
          </div>

          {/* Scheduling comparison */}
          <div className="mt-14">
            <SectionHeader label="Results" title="PPO vs. Traditional Schedulers" />
            <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700">
                    {['Scheduler', 'Throughput ↑', 'Drop Rate ↓', 'CPU Util.', 'Latency', 'Load Variance'].map((h) => (
                      <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                  {SCHEDULING_RESULTS.map((r) => (
                    <tr key={r.scheduler} className={`${r.isProposed ? 'bg-primary-50/50 dark:bg-primary-900/10' : 'bg-white dark:bg-surface-900'} hover:bg-surface-50 dark:hover:bg-surface-800/50`}>
                      <td className="px-5 py-3.5 font-medium text-surface-900 dark:text-white whitespace-nowrap">
                        {r.scheduler}
                        {r.isProposed && <Badge variant="blue" className="ml-2">Ours</Badge>}
                      </td>
                      <td className={`px-5 py-3.5 font-mono font-semibold ${r.isProposed ? 'text-primary-700 dark:text-primary-300' : 'text-surface-600 dark:text-surface-400'}`}>
                        {r.throughput.toFixed(3)}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-surface-600 dark:text-surface-400">
                        {r.dropRate !== null ? `${r.dropRate.toFixed(2)}%` : '—'}
                      </td>
                      <td className="px-5 py-3.5 text-surface-600 dark:text-surface-400">{r.cpuUtil}</td>
                      <td className="px-5 py-3.5 text-surface-600 dark:text-surface-400">{r.latency}</td>
                      <td className="px-5 py-3.5 text-surface-600 dark:text-surface-400">{r.loadVariance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-surface-400 mt-3 text-center">
              Source: Section 15, Table 6 of the research paper. Single-agent PPO with fixed-weight reward function.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
