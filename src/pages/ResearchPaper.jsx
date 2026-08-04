import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineBookOpen } from 'react-icons/hi'
import PageLayout from '../components/layout/PageLayout'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import {
  PAPER, ABSTRACT, CONTRIBUTIONS, PAPER_SECTIONS,
  FORECASTING_RESULTS, SERVER_CONFIGS, TASK_CATEGORIES,
  SCHEDULING_RESULTS, PPO_CONFIG, MAPPO_CONFIG, REFERENCES,
  ADAPTIVE_REWARD, SPRINGER_TABLE_1, SPRINGER_TABLE_2, SPRINGER_TABLE_3,
} from '../utils/paperData'

/* ── Sidebar navigation ── */
function PaperSidebar({ activeSection, onSectionClick }) {
  return (
    <nav className="w-60 flex-shrink-0 sticky top-20 self-start max-h-[80vh] overflow-y-auto scrollbar-thin pr-2 hidden lg:block">
      <p className="text-xs font-semibold uppercase tracking-wider text-surface-400 mb-3 px-3">Contents</p>
      {PAPER_SECTIONS.map((sec) => (
        <button
          key={sec.id}
          onClick={() => onSectionClick(sec.id)}
          className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors mb-0.5 ${activeSection === sec.id
              ? 'text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/20 font-medium'
              : 'text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800'
            }`}
        >
          {sec.number && (
            <span className="text-xs font-mono w-5 flex-shrink-0 text-surface-400">{sec.number}</span>
          )}
          <span className="truncate">{sec.title}</span>
        </button>
      ))}
    </nav>
  )
}

/* ── Section container ── */
function PaperSection({ id, number, title, children }) {
  return (
    <section id={id} className="mb-14 scroll-mt-20">
      <div className="flex items-baseline gap-3 mb-5 pb-3 border-b border-surface-100 dark:border-surface-800">
        {number && (
          <span className="text-sm font-mono text-primary-500 dark:text-primary-400 font-semibold">{number}</span>
        )}
        <h2 className="text-xl font-bold text-surface-900 dark:text-white">{title}</h2>
      </div>
      <div className="text-sm leading-7 text-surface-600 dark:text-surface-400 space-y-4">
        {children}
      </div>
    </section>
  )
}

/* ── Equation block ── */
function Equation({ label, eq }) {
  return (
    <div className="card p-4 my-4 flex items-center gap-4">
      <div className="flex-1 font-mono text-sm text-surface-700 dark:text-surface-300 text-center">
        {eq}
      </div>
      {label && (
        <span className="text-xs text-surface-400 flex-shrink-0">({label})</span>
      )}
    </div>
  )
}

export default function ResearchPaper() {
  const [activeSection, setActiveSection] = useState('abstract')

  // Update active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    PAPER_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <PageLayout>
      <div className="pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Paper header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="mb-10 max-w-4xl mx-auto text-center"
          >
            <Badge variant="blue" className="mb-4">
              <HiOutlineBookOpen className="mr-1" />
              Research Paper
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white leading-tight mb-3">
              {PAPER.fullTitle}
            </h1>
            <div className="flex flex-wrap justify-center gap-1.5 mt-4">
              {PAPER.keywords.slice(0, 8).map((kw) => (
                <Badge key={kw} variant="gray">{kw}</Badge>
              ))}
            </div>
          </motion.div>

          {/* Layout: Sidebar + Content */}
          <div className="flex gap-10">
            <PaperSidebar activeSection={activeSection} onSectionClick={scrollTo} />

            {/* Main content */}
            <div className="flex-1 min-w-0 max-w-3xl">

              {/* Abstract */}
              <PaperSection id="abstract" title="Abstract">
                {ABSTRACT.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                <div className="mt-4 p-4 rounded-xl bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700">
                  <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2">Keywords</p>
                  <p className="text-sm text-surface-600 dark:text-surface-400">{PAPER.keywords.join(', ')}</p>
                </div>
              </PaperSection>

              {/* Introduction */}
              <PaperSection id="introduction" number="1" title="Introduction">
                <p>
                  Cloud computing has become a fundamental computing paradigm for hosting applications and services
                  requiring scalable and flexible computational resources. Modern cloud platforms execute
                  heterogeneous workloads with significantly different CPU, memory, storage, and accelerator
                  requirements. Efficiently assigning incoming tasks to available resources is therefore an
                  important challenge in cloud resource management.
                </p>
                <p>
                  Traditional scheduling and load balancing techniques, including Round Robin, First-Come-First-Serve,
                  Min-Min, Max-Min, and Least Connections, use predefined rules for assigning tasks to computing
                  resources. Although these approaches are computationally efficient, they generally lack the
                  ability to continuously adapt their decisions to rapidly changing workload conditions.
                </p>
                <p>
                  Dynamic workloads introduce additional challenges. Sudden increases in task arrival rates may
                  result in overloaded servers, increased response time, resource contention, request drops,
                  and violations of Service-Level Agreements (SLAs). Conversely, over-provisioning resources
                  during periods of low workload results in inefficient resource utilization and increased
                  operational cost.
                </p>
                <p>
                  A single centralized RL agent has two structural limitations: (1) it does not scale gracefully
                  as the number of servers grows; (2) a fixed-weight reward function requires manual tuning of
                  coefficients and cannot automatically shift emphasis when the dominant failure mode changes.
                </p>
                <div className="mt-4">
                  <p className="font-semibold text-surface-800 dark:text-surface-200 mb-3">
                    Main contributions of this work:
                  </p>
                  <ol className="space-y-2 list-decimal list-inside">
                    {CONTRIBUTIONS.map((c, i) => (
                      <li key={i} className="leading-relaxed">{c}</li>
                    ))}
                  </ol>
                </div>
              </PaperSection>

              {/* Background */}
              <PaperSection id="background" number="2" title="Background">
                <p>
                  Cloud applications experience continuously changing workloads. Traditional scheduling mechanisms
                  typically make decisions based only on the current state of computing resources and do not
                  consider future workload behaviour.
                </p>
                <p>
                  In the single-agent formulation, the problem is expressed as determining an optimal resource
                  allocation policy π that maps the system state S_t and predicted future workload {"Ŵ_{t+1}"}
                  to a scheduling action A_t:
                </p>
                <Equation label="1" eq="A_t = π(S_t, Ŵ_{t+1})" />
                <p>
                  In the multi-agent formulation, the single global policy π is replaced by a set of N
                  local policies {"{π_i}"}, one per server agent, each mapping a local observation {"o_{i,t}"}
                  to a local action {"a_{i,t}"}:
                </p>
                <Equation label="2" eq="a_{i,t} = π_i(o_{i,t}, Ŵ_{t+1}),  i = 1, …, N" />
              </PaperSection>

              {/* Related Work */}
              <PaperSection id="related-work" number="3" title="Related Work">
                <p>
                  Load balancing and task scheduling have been extensively studied in cloud computing. Earlier
                  research primarily focused on heuristic, metaheuristic, and rule-based scheduling techniques.
                  Traditional algorithms such as Round Robin provide simple and fair distribution of tasks but
                  do not consider resource utilization or individual task requirements.
                </p>
                <p>
                  Several studies have investigated optimization and swarm-intelligence approaches including
                  Genetic Algorithms, Particle Swarm Optimization, Ant Colony Optimization, and Grey Wolf
                  Optimization. These demonstrate improvements in makespan and energy consumption but may
                  incur significant optimization overhead.
                </p>
                <p>
                  Multi-Agent Reinforcement Learning (MARL) formulates sequential decision-making problems
                  as a decentralized partially observable Markov decision process (Dec-POMDP). MADDPG
                  introduced the CTDE paradigm; QMIX uses value decomposition under monotonicity constraints;
                  COMA addresses credit assignment; and MAPPO extends PPO to centralized-critic multi-agent
                  settings with competitive performance [16].
                </p>
              </PaperSection>

              {/* Datasets */}
              <PaperSection id="datasets" number="4" title="Workload Datasets and Experimental Protocol">
                <p>
                  To address reviewer requirements regarding dataset role transparency, ten benchmark workload
                  datasets across production cloud, HPC supercomputing, network traffic, and scientific observatories
                  were systematically categorized into distinct experimental roles (forecasting, RL environment simulation,
                  cross-domain transfer validation, and stress-testing).
                </p>

                <p className="font-medium text-surface-800 dark:text-surface-200 mt-4">Table I: Dataset Overview & Sources</p>
                <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800 my-3">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700">
                        {['Dataset', 'Domain', 'Source', 'Time Span', 'Resolution', 'Samples', 'Primary Purpose'].map((h) => (
                          <th key={h} className="px-3 py-2.5 text-left font-semibold text-surface-500 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                      {SPRINGER_TABLE_1.map((row) => (
                        <tr key={row.dataset} className="bg-white dark:bg-surface-900">
                          <td className="px-3 py-2 font-medium text-surface-900 dark:text-white whitespace-nowrap">{row.dataset}</td>
                          <td className="px-3 py-2 text-surface-600 dark:text-surface-400">{row.domain}</td>
                          <td className="px-3 py-2 font-mono text-[11px] text-surface-500">{row.source}</td>
                          <td className="px-3 py-2 text-surface-600 dark:text-surface-400">{row.timeSpan}</td>
                          <td className="px-3 py-2 text-surface-600 dark:text-surface-400">{row.resolution}</td>
                          <td className="px-3 py-2 font-mono text-surface-600 dark:text-surface-400">{row.samples}</td>
                          <td className="px-3 py-2 text-surface-600 dark:text-surface-400">{row.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="font-medium text-surface-800 dark:text-surface-200 mt-6">Table II: Dataset Allocation & Usage Protocol</p>
                <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800 my-3">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700">
                        {['Dataset', 'Forecasting', 'RL Train', 'RL Eval', 'Benchmark', 'Ext. Val.', 'Merged', 'Purpose'].map((h) => (
                          <th key={h} className="px-2.5 py-2.5 text-left font-semibold text-surface-500 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                      {SPRINGER_TABLE_2.map((row) => (
                        <tr key={row.dataset} className="bg-white dark:bg-surface-900">
                          <td className="px-2.5 py-2 font-medium text-surface-900 dark:text-white whitespace-nowrap">{row.dataset}</td>
                          <td className="px-2.5 py-2 text-center">{row.forecasting === 'Yes' ? <Badge variant="blue">Yes</Badge> : 'No'}</td>
                          <td className="px-2.5 py-2 text-center">{row.rlTraining === 'Yes' ? <Badge variant="green">Yes</Badge> : 'No'}</td>
                          <td className="px-2.5 py-2 text-center">{row.rlEvaluation === 'Yes' ? <Badge variant="purple">Yes</Badge> : 'No'}</td>
                          <td className="px-2.5 py-2 text-center">{row.benchmarkOnly === 'Yes' ? <Badge variant="amber">Yes</Badge> : 'No'}</td>
                          <td className="px-2.5 py-2 text-center">{row.externalVal === 'Yes' ? <Badge variant="sky">Yes</Badge> : 'No'}</td>
                          <td className="px-2.5 py-2 text-center">{row.merged}</td>
                          <td className="px-2.5 py-2 text-surface-600 dark:text-surface-400">{row.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="font-medium text-surface-800 dark:text-surface-200 mt-6">Table III: Dataset Preprocessing & Partitioning Pipeline</p>
                <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800 my-3">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700">
                        {['Dataset', 'Cleaning', 'Missing Values', 'Feature Engineering', 'Normalization', 'Resampling', 'Train/Val/Test'].map((h) => (
                          <th key={h} className="px-2.5 py-2.5 text-left font-semibold text-surface-500 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                      {SPRINGER_TABLE_3.map((row) => (
                        <tr key={row.dataset} className="bg-white dark:bg-surface-900">
                          <td className="px-2.5 py-2 font-medium text-surface-900 dark:text-white whitespace-nowrap">{row.dataset}</td>
                          <td className="px-2.5 py-2 text-surface-600 dark:text-surface-400">{row.cleaning}</td>
                          <td className="px-2.5 py-2 text-surface-600 dark:text-surface-400">{row.missing}</td>
                          <td className="px-2.5 py-2 text-surface-600 dark:text-surface-400">{row.featureEng}</td>
                          <td className="px-2.5 py-2 text-surface-600 dark:text-surface-400">{row.norm}</td>
                          <td className="px-2.5 py-2 text-surface-600 dark:text-surface-400">{row.resampling}</td>
                          <td className="px-2.5 py-2 font-mono text-surface-700 dark:text-surface-300">{row.train} / {row.val} / {row.test}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </PaperSection>

              {/* Preprocessing */}
              <PaperSection id="preprocessing" number="5" title="Data Preprocessing">
                <p>
                  To ensure a fair comparison between forecasting models, identical preprocessing was applied
                  to all evaluated methods. The workload time series was arranged chronologically and
                  transformed using a sliding-window approach. A window size of 24 historical observations
                  was used to predict the subsequent workload value.
                </p>
                <Equation label="3" eq="X = {x₁, x₂, ..., xT}" />
                <p>The forecasting input at time t is:</p>
                <Equation label="4" eq="Xₜ = [x_{t-23}, x_{t-22}, ..., xₜ]" />
                <p>The prediction target is:</p>
                <Equation label="5" eq="yₜ = x_{t+1}" />
                <p>
                  The data was divided chronologically into 80% training and 20% testing. Random shuffling
                  was intentionally avoided because it would introduce future information into the training
                  period and produce unrealistic time-series evaluation.
                </p>
              </PaperSection>

              {/* Forecasting Models */}
              <PaperSection id="forecasting-models" number="6" title="Forecasting Models">
                {[
                  { n: '6.1', name: 'Naive Persistence', desc: 'The persistence baseline assumes the next workload value equals the most recently observed workload: x̂_{t+1} = xₜ. Despite simplicity, it provides an important baseline.' },
                  { n: '6.2', name: 'SARIMAX', desc: 'Seasonal AutoRegressive Integrated Moving Average with eXogenous factors. Extends ARIMA by incorporating seasonal dependencies. Uses rolling one-step-ahead forecasting that updates model state from latest true observation.' },
                  { n: '6.3', name: 'Long Short-Term Memory (LSTM)', desc: 'LSTM networks use gated recurrent units to learn long-term temporal dependencies. Trained using 24-step sliding window sequences.' },
                  { n: '6.4', name: 'Gated Recurrent Unit (GRU)', desc: 'A simplified recurrent architecture using update and reset gates. Reduces complexity vs. LSTM while retaining sequential dependency modelling.' },
                  { n: '6.5', name: 'Bidirectional LSTM', desc: 'Processes sequences in both forward and reverse directions during training, allowing the network to learn contextual relationships across the input window.' },
                  { n: '6.6', name: 'Temporal Convolutional Network (TCN)', desc: 'Uses causal dilated convolutions to capture temporal dependencies over increasingly large receptive fields.' },
                  { n: '6.7', name: 'Transformer Encoder', desc: 'Attention-based sequence modelling evaluated to determine whether it could effectively learn workload patterns from historical observations.' },
                ].map((m) => (
                  <div key={m.n} className="flex gap-3">
                    <span className="text-xs font-mono text-primary-500 font-semibold mt-1 w-7 flex-shrink-0">{m.n}</span>
                    <div>
                      <p className="font-medium text-surface-800 dark:text-surface-200">{m.name}</p>
                      <p className="text-sm text-surface-500 dark:text-surface-400 mt-0.5 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </PaperSection>

              {/* Forecasting Results */}
              <PaperSection id="forecasting-results" number="7" title="Forecasting Results and Model Selection">
                <p>
                  Forecasting performance was evaluated using MAE, RMSE, and R². Table 1 presents the
                  experimental results.
                </p>
                <Equation label="8" eq="MAE = (1/n) Σ|yᵢ − ŷᵢ|" />
                <Equation label="9" eq="RMSE = √[(1/n) Σ(yᵢ − ŷᵢ)²]" />
                <Equation label="10" eq="R² = 1 − [Σ(yᵢ − ŷᵢ)²] / [Σ(yᵢ − ȳ)²]" />
                <p className="font-medium text-surface-800 dark:text-surface-200">Table 1: Forecasting model performance</p>
                <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800 my-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700">
                        {['Model', 'Type', 'MAE', 'RMSE ↓', 'R²'].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                      {FORECASTING_RESULTS.map((r) => (
                        <tr key={r.model} className={r.isWinner ? 'bg-primary-50/40 dark:bg-primary-900/10' : 'bg-white dark:bg-surface-900'}>
                          <td className="px-4 py-3 font-medium text-surface-900 dark:text-white whitespace-nowrap">
                            {r.model} {r.isWinner && <Badge variant="blue">Selected</Badge>}
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={r.type === 'Statistical' ? 'blue' : r.type === 'Baseline' ? 'gray' : 'purple'}>{r.type}</Badge>
                          </td>
                          <td className="px-4 py-3 font-mono text-surface-600 dark:text-surface-400">{r.mae.toFixed(4)}</td>
                          <td className={`px-4 py-3 font-mono font-semibold ${r.isWinner ? 'text-primary-700 dark:text-primary-300' : 'text-surface-600 dark:text-surface-400'}`}>{r.rmse.toFixed(4)}</td>
                          <td className={`px-4 py-3 font-mono ${r.r2 < 0 ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'}`}>{r.r2.toFixed(3)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p>
                  SARIMAX achieved the lowest RMSE and the highest R² among the evaluated models. A notable
                  observation is the poor generalization of neural forecasting models — the final 20% of workload
                  contained traffic bursts absent from training. This temporal regime shift caused neural models
                  to produce predictions concentrated around the normal workload range observed during training.
                  SARIMAX's rolling update strategy demonstrated greater robustness under this shift.
                </p>
                <Card className="mt-4 bg-primary-50 dark:bg-primary-900/10 border-primary-200 dark:border-primary-800/50">
                  <p className="text-sm font-medium text-primary-800 dark:text-primary-200">
                    SARIMAX selected as the forecasting backbone (RMSE: 0.0708, R²: 0.270)
                  </p>
                </Card>
              </PaperSection>

              {/* Proposed Framework */}
              <PaperSection id="framework" number="8" title="Proposed Framework">
                <p>The proposed framework combines workload forecasting, an adaptive reward mechanism, and
                  reinforcement learning-based resource allocation. The system consists of six primary components:</p>
                <ol className="space-y-2 list-decimal list-inside mt-3">
                  {['Workload Data Collection', 'Data Preprocessing', 'SARIMAX Workload Forecasting',
                    'Adaptive Dynamic Reward System (AdaptiveRewardManager)',
                    'Reinforcement Learning Scheduling Engine (single-agent PPO baseline, extended to multi-agent MAPPO)',
                    'Heterogeneous Resource Environment'].map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                </ol>
                <Equation label="11" eq="Workload → Preprocessing → SARIMAX → RL Scheduler → Resource Allocation" />
                <p>
                  The AdaptiveRewardManager closes a feedback loop: the reward used by the RL Scheduler
                  at every episode is produced from the aggregated outcome of the previous episode.
                </p>
              </PaperSection>

              {/* Cloud Environment */}
              <PaperSection id="environment" number="9" title="Heterogeneous Cloud Environment">
                <p>The simulation environment models servers with different computational capabilities.</p>
                <p className="font-medium text-surface-800 dark:text-surface-200 mt-3">Table 2: Server configurations</p>
                <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800 my-4">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700">
                      {['Server Type', 'CPU', 'RAM', 'GPU', 'I/O'].map((h) => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">{h}</th>)}
                    </tr></thead>
                    <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                      {SERVER_CONFIGS.map((srv) => (
                        <tr key={srv.type} className="bg-white dark:bg-surface-900">
                          <td className="px-4 py-3 text-surface-700 dark:text-surface-300">{srv.type}</td>
                          <td className="px-4 py-3 font-mono text-surface-600 dark:text-surface-400">{srv.cpu.toFixed(1)}</td>
                          <td className="px-4 py-3 font-mono text-surface-600 dark:text-surface-400">{srv.ram.toFixed(1)}</td>
                          <td className="px-4 py-3">{srv.gpu ? <Badge variant="green">Yes</Badge> : <Badge variant="gray">No</Badge>}</td>
                          <td className="px-4 py-3 font-mono text-surface-600 dark:text-surface-400">{srv.io.toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="font-medium text-surface-800 dark:text-surface-200 mt-5">Table 3: Simulated task categories</p>
                <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800 my-4">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700">
                      {['Task', 'CPU', 'RAM', 'GPU', 'I/O', 'Duration (s)'].map((h) => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">{h}</th>)}
                    </tr></thead>
                    <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                      {TASK_CATEGORIES.map((tc) => (
                        <tr key={tc.task} className="bg-white dark:bg-surface-900">
                          <td className="px-4 py-3 text-surface-700 dark:text-surface-300">{tc.task}</td>
                          <td className="px-4 py-3 font-mono text-surface-600 dark:text-surface-400">{tc.cpu.toFixed(1)}</td>
                          <td className="px-4 py-3 font-mono text-surface-600 dark:text-surface-400">{tc.ram.toFixed(1)}</td>
                          <td className="px-4 py-3">{tc.gpu ? <Badge variant="green">Yes</Badge> : <Badge variant="gray">No</Badge>}</td>
                          <td className="px-4 py-3 font-mono text-surface-600 dark:text-surface-400">{tc.io.toFixed(1)}</td>
                          <td className="px-4 py-3 font-mono text-surface-600 dark:text-surface-400">{tc.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </PaperSection>

              {/* Adaptive Reward System */}
              <PaperSection id="adaptive-reward" number="10" title="Adaptive Dynamic Reward System">
                <p>
                  The Adaptive Dynamic Reward System is implemented as the <code className="code-tag">AdaptiveRewardManager</code>,
                  which maintains target objectives, adaptive coefficients, update rules, and safe bounds.
                  It runs once per training episode.
                </p>
                <p className="font-medium mt-4 text-surface-800 dark:text-surface-200">Target Objectives:</p>
                <div className="grid sm:grid-cols-2 gap-2 mt-2">
                  {ADAPTIVE_REWARD.targets.map((t) => (
                    <div key={t.metric} className="flex justify-between items-center p-3 rounded-lg border border-surface-100 dark:border-surface-800 text-sm">
                      <span className="text-surface-600 dark:text-surface-400">{t.metric}</span>
                      <Badge variant="blue">{t.target}</Badge>
                    </div>
                  ))}
                </div>
                <p className="mt-4">Normalized error for each objective:</p>
                <Equation label="12" eq="eᵢ = (oᵢ − gᵢ) / gᵢ  [for non-zero targets]" />
                <Equation label="13" eq="eᵢ = oᵢ             [for zero targets e.g. crash rate]" />
                <p>Priority allocation (violations normalized to relative importance):</p>
                <Equation label="14" eq="pᵢ = max(eᵢ, 0) / Σⱼ max(eⱼ, 0)" />
                <p>Adaptive weight update rule:</p>
                <Equation label="15" eq="wᵢ(t+1) = wᵢ(t) + η·pᵢ·eᵢ        if eᵢ > 0 (violation)\n         wᵢ(t) − η·(wᵢ(t) − w⁰ᵢ)    if eᵢ ≤ 0 (satisfied)" />
                <p>Clamping to safe bounds:</p>
                <Equation label="16" eq="wᵢ(t+1) = clip(wᵢ(t+1), w_min, w_max)" />
              </PaperSection>

              {/* Single-Agent RL */}
              <PaperSection id="single-agent" number="11" title="Single-Agent Reinforcement Learning Formulation">
                <p>The resource allocation problem is formulated as a Markov Decision Process:</p>
                <Equation label="17" eq="M = (S, A, P, R, γ)" />
                <p><strong>State Space:</strong> 11 features per server × 4 servers + 6 task features = 50 features total</p>
                <Equation label="18" eq="|S| = (4 × 11) + 6 = 50" />
                <p><strong>Action Space:</strong> Select one of N available servers</p>
                <Equation label="19" eq="A = {0, 1, ..., N−1}" />
                <p><strong>Reward Function (adaptive form):</strong></p>
                <Equation label="20" eq="Rₜ = w₁(t)Aₜ + w₂(t)Tₜ + w₃(t)Bₜ − w₄(t)Lₜ − w₅(t)Dₜ − w₆(t)Oₜ − w₇(t)Qₜ" />
                <div className="grid sm:grid-cols-2 gap-2 mt-3">
                  {ADAPTIVE_REWARD.rewardComponents.map((c) => (
                    <div key={c.symbol} className="flex gap-2 p-2.5 rounded-lg border border-surface-100 dark:border-surface-800 text-sm">
                      <code className="code-tag flex-shrink-0">{c.symbol}</code>
                      <span className={`flex-shrink-0 font-bold ${c.sign === '+' ? 'text-emerald-500' : 'text-red-500'}`}>{c.sign}</span>
                      <span className="text-surface-600 dark:text-surface-400">{c.name} — {c.description}</span>
                    </div>
                  ))}
                </div>
              </PaperSection>

              {/* PPO */}
              <PaperSection id="ppo" number="12" title="Proximal Policy Optimization (PPO)">
                <p>
                  PPO was selected for the single-agent baseline because it provides stable policy updates
                  while limiting excessively large changes to the learned policy, and because it extends
                  naturally to MAPPO.
                </p>
                <p>The PPO probability ratio:</p>
                <Equation label="21" eq="rₜ(θ) = πθ(aₜ|sₜ) / πθ_old(aₜ|sₜ)" />
                <p>The clipped PPO objective:</p>
                <Equation label="22" eq="L^CLIP(θ) = E[min(rₜ(θ)Âₜ, clip(rₜ(θ), 1−ε, 1+ε)Âₜ)]" />
              </PaperSection>

              {/* MARL */}
              <PaperSection id="marl" number="13" title="Multi-Agent Reinforcement Learning Extension">
                <Card className="bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30 mb-5">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <strong>Note:</strong> The MARL extension is fully specified architecturally. No empirical training
                    results are reported here — evaluation is identified as the immediate next phase of this work.
                  </p>
                </Card>
                <p>The multi-agent Dec-POMDP formulation:</p>
                <Equation label="23" eq="M = ⟨N, S, {Aᵢ}, P, {Rᵢ}, {Oᵢ}, Ω, γ⟩" />
                <p><strong>Local observation per agent (fixed size regardless of N):</strong></p>
                <Equation label="24" eq="|oᵢ| = 11 + 6 + 2 = 19" />
                <p><strong>Local action space:</strong></p>
                <Equation label="25" eq="Aᵢ = {Accept} ∪ {Forward₁, ..., Forward_Kᵢ} ∪ {Reject}" />
                <p><strong>MAPPO clipped objective for agent i:</strong></p>
                <Equation label="28" eq="L^CLIP_i(θᵢ) = E[min(rᵢ,ₜ(θᵢ)Âᵢ,ₜ, clip(rᵢ,ₜ(θᵢ), 1−ε, 1+ε)Âᵢ,ₜ)]" />
                <p className="font-medium mt-4 text-surface-800 dark:text-surface-200">Table 4: Proposed MAPPO training configuration</p>
                <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800 my-4">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700">
                      {['Parameter', 'Value'].map((h) => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">{h}</th>)}
                    </tr></thead>
                    <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                      {Object.entries(MAPPO_CONFIG).filter(([key]) => key !== 'status').map(([key, val]) => (
                        <tr key={key} className="bg-white dark:bg-surface-900">
                          <td className="px-4 py-3 font-mono text-xs text-surface-600 dark:text-surface-400">{key}</td>
                          <td className="px-4 py-3 text-surface-700 dark:text-surface-300">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </PaperSection>

              {/* Implementation */}
              <PaperSection id="implementation" number="14" title="Implementation Details">
                <p>
                  The cloud simulation and reinforcement learning environment were implemented using Python.
                  Gymnasium was used to expose the single-agent scheduling problem as a standard RL environment,
                  and Stable-Baselines3 was used to implement and train the single-agent PPO baseline.
                </p>
                <p className="font-medium mt-4 text-surface-800 dark:text-surface-200">Table 5: Single-agent PPO training configuration</p>
                <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800 my-4">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700">
                      {['Parameter', 'Value'].map((h) => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">{h}</th>)}
                    </tr></thead>
                    <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                      {Object.entries(PPO_CONFIG).map(([key, val]) => (
                        <tr key={key} className="bg-white dark:bg-surface-900">
                          <td className="px-4 py-3 font-mono text-xs text-surface-600 dark:text-surface-400">{key}</td>
                          <td className="px-4 py-3 text-surface-700 dark:text-surface-300">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </PaperSection>

              {/* Results */}
              <PaperSection id="results" number="15" title="Scheduling Results and Discussion">
                <p>Table 6 presents the scheduling performance using the single-agent PPO scheduler.</p>
                <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800 my-4">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700">
                      {['Scheduler', 'Throughput ↑', 'Drop Rate ↓', 'CPU Util.', 'Latency', 'Load Variance'].map((h) => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">{h}</th>)}
                    </tr></thead>
                    <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
                      {SCHEDULING_RESULTS.map((sched) => (
                        <tr key={sched.scheduler} className={sched.isProposed ? 'bg-primary-50/50 dark:bg-primary-900/10' : 'bg-white dark:bg-surface-900'}>
                          <td className="px-4 py-3 font-medium text-surface-900 dark:text-white whitespace-nowrap">
                            {sched.scheduler} {sched.isProposed && <Badge variant="blue">Ours</Badge>}
                          </td>
                          <td className={`px-4 py-3 font-mono font-semibold ${sched.isProposed ? 'text-primary-700 dark:text-primary-300' : 'text-surface-600 dark:text-surface-400'}`}>{sched.throughput.toFixed(3)}</td>
                          <td className="px-4 py-3 font-mono text-surface-600 dark:text-surface-400">{sched.dropRate !== null ? `${sched.dropRate.toFixed(2)}%` : '—'}</td>
                          <td className="px-4 py-3 text-surface-600 dark:text-surface-400">{sched.cpuUtil}</td>
                          <td className="px-4 py-3 text-surface-600 dark:text-surface-400">{sched.latency}</td>
                          <td className="px-4 py-3 text-surface-600 dark:text-surface-400">{sched.loadVariance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p>
                  PPO achieved the highest throughput of 0.590, compared with 0.467 for Least Connections,
                  0.463 for Round Robin, and 0.451 for Random scheduling. PPO also achieved the lowest
                  request drop rate of 41.00%.
                </p>
                <p>
                  Trade-off: Least Connections achieved better latency and load variance, highlighting a
                  trade-off between aggressive resource utilization and response time.
                </p>
              </PaperSection>

              {/* Discussion */}
              <PaperSection id="discussion" number="16" title="Discussion">
                <p>Three key findings:</p>
                <ol className="space-y-3 list-decimal list-inside mt-3">
                  <li>SARIMAX outperforms all evaluated deep learning models for workload forecasting under chronological evaluation due to its rolling one-step-ahead update strategy and robustness to temporal regime shift.</li>
                  <li>A single centralized PPO agent with a fixed reward function improves throughput and drop rate vs. traditional schedulers, but at the cost of higher latency and CPU utilization.</li>
                  <li>The Adaptive Reward System and MAPPO extension target these two limitations: automatic reward re-weighting and decentralized scalable scheduling.</li>
                </ol>
              </PaperSection>

              {/* Open Issues */}
              <PaperSection id="open-issues" number="17" title="Discussion on Open Issues">
                <ul className="space-y-2 list-disc list-inside">
                  <li>Workload formats and temporal resolutions differ significantly across cloud, HPC, and scientific observation traces, requiring dataset-specific preprocessing.</li>
                  <li>The chronological 80–20 split provides realistic evaluation but performance may vary across alternative temporal periods.</li>
                  <li>RL experiments are conducted in a simulated environment; deployment on real container orchestration platforms such as Kubernetes is required to evaluate network overhead and scheduling delay.</li>
                  <li>The Adaptive Reward System and MAPPO extension have not yet been empirically trained — no performance numbers are reported for them.</li>
                  <li>Forecasting and RL components require end-to-end evaluation with forecast values explicitly incorporated into the RL state.</li>
                </ul>
              </PaperSection>

              {/* Conclusion */}
              <PaperSection id="conclusion" number="18" title="Conclusion and Future Work">
                <p>
                  This paper presented a reinforcement learning-based framework for dynamic task scheduling
                  and resource allocation supported by workload forecasting, and introduced two architectural
                  extensions toward a fully adaptive, decentralized scheduler.
                </p>
                <p>
                  Seven real-world workload datasets were considered, and seven forecasting approaches were
                  evaluated using identical preprocessing and chronological train-test conditions. SARIMAX
                  achieved the best overall forecasting performance with RMSE of 0.0708 and R² of 0.270.
                </p>
                <p>
                  A single-agent PPO scheduler using a fixed-weight reward function achieved the highest
                  throughput of 0.590 and lowest drop rate of 41.00%.
                </p>
                <p className="font-medium text-surface-800 dark:text-surface-200 mt-4">Future Work:</p>
                <ul className="space-y-1.5 list-disc list-inside mt-2">
                  <li>Empirical implementation and evaluation of the AdaptiveRewardManager with single-agent PPO</li>
                  <li>Implementation of the Dec-POMDP environment and MAPPO training pipeline (Table 4)</li>
                  <li>Controlled comparison of four configurations: PPO-fixed, PPO-adaptive, MAPPO-fixed, MAPPO-adaptive</li>
                  <li>Tighter integration of SARIMAX forecasts into RL state representation</li>
                  <li>Investigation of communication channels between neighboring agents beyond the two-value neighbor summary</li>
                  <li>Scalability studies varying the number of agents</li>
                  <li>Kubernetes deployment for real-world validation</li>
                </ul>
              </PaperSection>

              {/* References */}
              <PaperSection id="references" title="References">
                <ol className="space-y-2">
                  {REFERENCES.map((ref, i) => (
                    <li key={i} className="text-sm leading-relaxed text-surface-500 dark:text-surface-400">
                      {ref}
                    </li>
                  ))}
                </ol>
              </PaperSection>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
