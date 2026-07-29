import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi'
import PageLayout from '../components/layout/PageLayout'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import SectionHeader from '../components/ui/SectionHeader'
import { ML_MODELS, FORECASTING_RESULTS } from '../utils/paperData'

function ModelCard({ model }) {
  const [expanded, setExpanded] = useState(false)

  const statusColors = {
    winner: 'blue',
    evaluated: 'gray',
    available: 'green',
  }

  return (
    <Card hover className={`${model.status === 'winner' ? 'border-primary-200 dark:border-primary-800/50' : ''}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant={statusColors[model.status] || 'gray'}>
              {model.status === 'winner' ? '🏆 Selected' : model.status === 'evaluated' ? 'Evaluated' : 'Available'}
            </Badge>
            <Badge variant="purple">{model.category}</Badge>
          </div>
          <h3 className="font-semibold text-surface-900 dark:text-white">{model.name}</h3>
          <p className="text-xs text-surface-400 mt-0.5">{model.fullName}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed mb-4">{model.description}</p>

      {/* Performance metrics (if available) */}
      {model.performance && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: 'MAE', value: model.performance.mae.toFixed(4) },
            { label: 'RMSE', value: model.performance.rmse.toFixed(4) },
            { label: 'R²', value: model.performance.r2.toFixed(3) },
          ].map((m) => (
            <div key={m.label} className="metric-pill text-center">
              <span className="text-xs text-surface-400">{m.label}</span>
              <span className={`text-sm font-bold mt-0.5 ${m.label === 'R²' && model.performance.r2 < 0 ? 'text-red-500' : 'text-surface-900 dark:text-white'}`}>
                {m.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Hyperparameters */}
      {model.hyperparameters && (
        <div className="mb-4">
          <p className="text-xs text-surface-400 mb-1.5">Key Hyperparameters</p>
          <div className="flex flex-wrap gap-1">
            {model.hyperparameters.map((h) => (
              <span key={h} className="code-tag">{h}</span>
            ))}
          </div>
        </div>
      )}

      {/* Expand/collapse advantages & disadvantages */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-sm text-surface-500 dark:text-surface-400 pt-3 border-t border-surface-100 dark:border-surface-800 hover:text-surface-900 dark:hover:text-white transition-colors"
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
            transition={{ duration: 0.2 }}
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

export default function MLModels() {
  return (
    <PageLayout>
      <div className="pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label="ML Models"
            title="Forecasting Model Library"
            subtitle="All 7 forecasting models evaluated in the paper under identical preprocessing conditions with a 24-step sliding window and 80–20 chronological split."
          />

          {/* Key finding banner */}
          <Card className="mb-8 bg-primary-50 dark:bg-primary-900/10 border-primary-200 dark:border-primary-800/50">
            <div className="flex gap-4">
              <span className="text-2xl">🔬</span>
              <div>
                <p className="font-semibold text-primary-800 dark:text-primary-200 mb-1">
                  Key Finding: Temporal Regime Shift
                </p>
                <p className="text-sm text-primary-700 dark:text-primary-300 leading-relaxed">
                  Deep learning models (GRU, LSTM, BiLSTM, TCN, Transformer) successfully learned patterns
                  during the training period but failed to generalize to the chronologically held-out test period.
                  The final 20% of the workload contained traffic bursts and operating regimes not represented in training.
                  SARIMAX's rolling one-step-ahead update strategy demonstrated greater robustness under this temporal distribution shift.
                </p>
              </div>
            </div>
          </Card>

          {/* Model grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ML_MODELS.map((model, i) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <ModelCard model={model} />
              </motion.div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="mt-14">
            <SectionHeader label="Results" title="Performance Comparison (Table 1)" />
            <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700">
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Model</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Category</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">MAE</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">RMSE ↓</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">R²</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Rank</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                  {FORECASTING_RESULTS.map((r, i) => (
                    <tr key={r.model} className={`${r.isWinner ? 'bg-primary-50/60 dark:bg-primary-900/10' : 'bg-white dark:bg-surface-900'} hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors`}>
                      <td className="px-5 py-3.5 font-medium text-surface-900 dark:text-white whitespace-nowrap">
                        {r.model}
                        {r.isWinner && <Badge variant="blue" className="ml-2">Selected</Badge>}
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge variant={r.type === 'Statistical' ? 'blue' : r.type === 'Baseline' ? 'gray' : 'purple'}>
                          {r.type}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-surface-600 dark:text-surface-400">{r.mae.toFixed(4)}</td>
                      <td className={`px-5 py-3.5 font-mono font-semibold ${r.isWinner ? 'text-primary-700 dark:text-primary-300' : 'text-surface-600 dark:text-surface-400'}`}>
                        {r.rmse.toFixed(4)}
                      </td>
                      <td className={`px-5 py-3.5 font-mono ${r.r2 < 0 ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'}`}>
                        {r.r2.toFixed(3)}
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge variant={i === 0 ? 'blue' : i === 1 ? 'green' : 'red'}>
                          {i === 0 ? '🥇 Best' : i === 1 ? '🥈 2nd' : `#${i + 1}`}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
