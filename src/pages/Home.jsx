import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  HiOutlineArrowRight, HiOutlineBeaker, HiOutlineChartBar,
  HiOutlineDocumentText, HiOutlineLightBulb, HiOutlineCheckCircle,
  HiOutlineServer, HiOutlineChip,
} from 'react-icons/hi'
import { MdOutlineScience, MdOutlineCloud } from 'react-icons/md'
import PageLayout from '../components/layout/PageLayout'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import SectionHeader from '../components/ui/SectionHeader'
import { MetricCard } from '../components/ui/MetricCard'
import {
  PAPER, CONTRIBUTIONS, FORECASTING_RESULTS, SCHEDULING_RESULTS
} from '../utils/paperData'

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' }
  }),
}

// Framework pipeline steps
const PIPELINE = [
  { step: 1, label: 'Workload Data', desc: '7 real-world datasets' },
  { step: 2, label: 'Preprocessing', desc: '24-step sliding window' },
  { step: 3, label: 'SARIMAX',       desc: 'RMSE: 0.0708' },
  { step: 4, label: 'Adaptive Reward', desc: 'AdaptiveRewardManager' },
  { step: 5, label: 'RL Scheduler',  desc: 'PPO / MAPPO' },
  { step: 6, label: 'Cloud Env',     desc: '6 server types' },
]

const HIGHLIGHTS = [
  { label: '7 Datasets',         desc: 'Google Cluster, Bitbrains, HPC2N, Spitzer, XMM-Newton, PWA' },
  { label: '7 Forecasting Models', desc: 'SARIMAX, GRU, LSTM, BiLSTM, TCN, Transformer, Persistence' },
  { label: 'SARIMAX Winner',     desc: 'RMSE 0.0708, R² 0.270 — Best forecasting model' },
  { label: 'PPO Scheduler',       desc: 'Highest throughput 0.590, Lowest drop rate 41.00%' },
  { label: 'Adaptive Reward',     desc: 'AdaptiveRewardManager auto-tunes reward coefficients' },
  { label: 'MARL Extension',      desc: 'Dec-POMDP with MAPPO — fully specified architecture' },
]

export default function Home() {
  return (
    <PageLayout>
      {/* ===================== HERO ===================== */}
      <section className="pt-28 pb-20 px-4 sm:px-6 bg-gradient-to-b from-white via-surface-50/50 to-white dark:from-surface-950 dark:via-surface-900/50 dark:to-surface-950">
        <div className="max-w-5xl mx-auto text-center">
          {/* Title */}
          <motion.h1
            custom={0} variants={fadeUp} initial="hidden" animate="show"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-900 dark:text-white leading-tight mb-4"
          >
            Reinforcement Learning‑Based
            <span className="block text-gradient">Dynamic Task Scheduling</span>
            <span className="block text-3xl sm:text-4xl font-semibold text-surface-600 dark:text-surface-400 mt-2">
              &amp; Resource Allocation
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={1} variants={fadeUp} initial="hidden" animate="show"
            className="text-lg text-surface-500 dark:text-surface-400 max-w-3xl mx-auto mb-8"
          >
            {PAPER.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={4} variants={fadeUp} initial="hidden" animate="show"
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link to="/documentation" className="btn-primary btn-lg gap-2">
              <HiOutlineDocumentText className="text-base" />
              Explore Docs
            </Link>
            <Link to="/training" className="btn-outline btn-lg gap-2">
              <HiOutlineBeaker className="text-base" />
              Try Model
            </Link>
            <Link to="/results" className="btn-ghost btn-lg gap-2">
              <HiOutlineChartBar className="text-base" />
              View Results
              <HiOutlineArrowRight className="text-sm" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===================== KEY METRICS ===================== */}
      <section className="section-sm bg-white dark:bg-surface-950 border-y border-surface-100 dark:border-surface-800">
        <div className="container-lg">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Datasets',    value: '7',        sub: 'Real-world traces',       color: 'blue'   },
              { label: 'Models',      value: '7',        sub: 'Forecasting approaches',  color: 'purple' },
              { label: 'Best RMSE',   value: '0.0708',   sub: 'SARIMAX',                 color: 'green'  },
              { label: 'Throughput',  value: '0.590',    sub: 'PPO Scheduler',           color: 'blue'   },
              { label: 'Drop Rate',   value: '41.00%',   sub: 'PPO (Lowest)',            color: 'green'  },
              { label: 'MARL Agents', value: 'N = 6',    sub: 'Dec-POMDP Architecture', color: 'yellow' },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="card p-4 text-center"
              >
                <p className="text-xl font-bold text-surface-900 dark:text-white mt-2">{m.value}</p>
                <p className="text-xs font-medium text-surface-600 dark:text-surface-400 mt-0.5">{m.label}</p>
                <p className="text-xs text-surface-400 dark:text-surface-500">{m.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== HIGHLIGHTS ===================== */}
      <section className="section bg-white dark:bg-surface-950">
        <div className="container-lg">
          <SectionHeader
            label="Project Highlights"
            title="What This Research Covers"
            subtitle="A comprehensive study combining workload forecasting, reinforcement learning, and multi-agent systems for cloud resource management."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HIGHLIGHTS.map((h, i) => (
              <Card key={h.label} hover animate className="flex gap-4">
                <div>
                  <p className="font-semibold text-surface-900 dark:text-white mb-1">{h.label}</p>
                  <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{h.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FRAMEWORK PIPELINE ===================== */}
      <section className="section bg-surface-50/50 dark:bg-surface-900/30">
        <div className="container-lg">
          <SectionHeader
            label="Architecture Overview"
            title="The Proposed Framework Pipeline"
            subtitle="Six integrated components form the end-to-end resource allocation system."
          />

          {/* Pipeline visual */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-0 mb-10">
            {PIPELINE.map((p, i) => (
              <div key={p.step} className="flex items-center gap-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card p-4 text-center w-32 sm:w-36"
                >
                  <p className="text-xs font-semibold text-surface-900 dark:text-white mt-2">{p.label}</p>
                  <p className="text-xs text-surface-400 dark:text-surface-500 mt-0.5">{p.desc}</p>
                </motion.div>
                {i < PIPELINE.length - 1 && (
                  <HiOutlineArrowRight className="text-surface-300 dark:text-surface-600 hidden sm:block flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Framework equation */}
          <div className="card p-6 max-w-3xl mx-auto text-center">
            <p className="text-xs text-surface-400 uppercase tracking-widest mb-3">Framework Flow (Eq. 11 from paper)</p>
            <p className="font-mono text-sm sm:text-base text-surface-700 dark:text-surface-300 leading-relaxed">
              Workload → Preprocessing → SARIMAX → RL Scheduler → Resource Allocation
            </p>
            <p className="text-xs text-surface-400 mt-3">
              The AdaptiveRewardManager closes a feedback loop around the scheduler after every episode.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== RESEARCH CONTRIBUTIONS ===================== */}
      <section className="section bg-white dark:bg-surface-950">
        <div className="container-lg">
          <SectionHeader
            label="Research Contributions"
            title="9 Key Contributions"
            subtitle="As listed in Section 1 of the paper."
          />
          <div className="grid sm:grid-cols-2 gap-3">
            {CONTRIBUTIONS.map((c, i) => (
              <motion.div
                key={i}
                custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="flex gap-3 p-4 rounded-xl border border-surface-100 dark:border-surface-800 hover:border-primary-200 dark:hover:border-primary-800/50 transition-colors"
              >
                <HiOutlineCheckCircle className="text-primary-500 text-xl flex-shrink-0 mt-0.5" />
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">{c}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FORECASTING RESULTS TEASER ===================== */}
      <section className="section bg-surface-50/50 dark:bg-surface-900/30">
        <div className="container-lg">
          <SectionHeader
            label="Model Comparison"
            title="Forecasting Results (Table 1)"
            subtitle="SARIMAX outperforms all evaluated deep learning models under chronological evaluation."
          />
          <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Model</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Type</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">MAE</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">RMSE ↓</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">R²</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                {FORECASTING_RESULTS.map((r, i) => (
                  <tr
                    key={r.model}
                    className={`${r.isWinner ? 'bg-primary-50/50 dark:bg-primary-900/10' : 'bg-white dark:bg-surface-900'} hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors`}
                  >
                    <td className="px-5 py-3.5 font-medium text-surface-900 dark:text-white whitespace-nowrap">
                      {r.model}
                      {r.isWinner && <Badge variant="blue" className="ml-2">Selected</Badge>}
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={r.type === 'Statistical' ? 'blue' : r.type === 'Baseline' ? 'gray' : 'purple'}>
                        {r.type}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-surface-600 dark:text-surface-400 font-mono">{r.mae.toFixed(4)}</td>
                    <td className="px-5 py-3.5 font-mono">
                      <span className={r.isWinner ? 'text-primary-700 dark:text-primary-300 font-bold' : 'text-surface-600 dark:text-surface-400'}>
                        {r.rmse.toFixed(4)}
                      </span>
                    </td>
                    <td className={`px-5 py-3.5 font-mono ${r.r2 < 0 ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {r.r2.toFixed(3)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
            <Link to="/results" className="btn-ghost gap-1 text-sm">
              View full results <HiOutlineArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== EXPLORE PLATFORM ===================== */}
      <section className="section bg-white dark:bg-surface-950">
        <div className="container-lg">
          <SectionHeader
            label="Explore"
            title="Everything You Need"
            subtitle="From reading the paper to training models — all in one platform."
            center
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <HiOutlineDocumentText className="text-2xl" />, title: 'Research Paper', desc: 'Read all 28 pages beautifully formatted', href: '/research-paper', color: 'blue'   },
              { icon: <MdOutlineCloud className="text-2xl" />,         title: 'Dataset Library', desc: 'Browse and explore all 7 datasets',    href: '/datasets',       color: 'indigo' },
              { icon: <HiOutlineChip className="text-2xl" />,         title: 'Train Models',   desc: 'Train ML and RL models interactively',  href: '/training',       color: 'green'  },
              { icon: <MdOutlineScience className="text-2xl" />,      title: 'Experiments',    desc: 'Track and compare all experiments',      href: '/experiments',    color: 'purple' },
            ].map((item) => (
              <Link key={item.href} to={item.href}>
                <Card hover className="h-full group cursor-pointer">
                  <div className="p-6 flex flex-col items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-surface-900 dark:text-white mb-1">{item.title}</p>
                      <p className="text-sm text-surface-500 dark:text-surface-400">{item.desc}</p>
                    </div>
                    <HiOutlineArrowRight className="text-surface-300 group-hover:text-primary-500 transition-colors mt-auto" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
