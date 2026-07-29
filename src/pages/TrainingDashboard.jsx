import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  HiOutlinePlay, HiOutlineCheck, HiOutlineChevronRight,
  HiOutlineRefresh, HiOutlineChip,
} from 'react-icons/hi'
import PageLayout from '../components/layout/PageLayout'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import SectionHeader from '../components/ui/SectionHeader'
import { DATASETS, ML_MODELS, RL_MODELS, PPO_CONFIG } from '../utils/paperData'
import { resetSimulation, scheduleTask, API_BASE } from '../api/client'

const STEPS = [
  { id: 1, label: 'Select Dataset',     icon: '🗄️' },
  { id: 2, label: 'Select Features',    icon: '📋' },
  { id: 3, label: 'Choose Target',      icon: '🎯' },
  { id: 4, label: 'Select Model Type',  icon: '🤖' },
  { id: 5, label: 'Choose Model',       icon: '⚡' },
  { id: 6, label: 'Hyperparameters',    icon: '⚙️' },
  { id: 7, label: 'Train',              icon: '🚀' },
  { id: 8, label: 'View Results',       icon: '📊' },
]

const MOCK_LOG = [
  '[00:00] Initializing environment...',
  '[00:01] Loading dataset: HPC2N Workload Dataset',
  '[00:02] Preprocessing: 24-step sliding window applied',
  '[00:03] Feature scaling: MinMax normalization',
  '[00:04] Train/test split: 80/20 chronological',
  '[00:05] Initializing PPO agent (MLP Policy)',
  '[00:06] Starting training — Episode 1/100',
  '[00:08] Ep 10 | Reward: 2.34 | Throughput: 0.42',
  '[00:12] Ep 25 | Reward: 4.11 | Throughput: 0.51',
  '[00:18] Ep 50 | Reward: 5.67 | Throughput: 0.55',
  '[00:26] Ep 75 | Reward: 6.89 | Throughput: 0.57',
  '[00:32] Ep 100 | Reward: 7.23 | Throughput: 0.590',
  '[00:33] Training complete! Evaluating...',
  '[00:34] ✓ Final Throughput: 0.590',
  '[00:34] ✓ Drop Rate: 41.00%',
]

function StepIndicator({ steps, activeStep }) {
  return (
    <div className="flex items-center gap-0 mb-8 overflow-x-auto scrollbar-thin pb-2">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center">
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              activeStep === step.id
                ? 'bg-primary-600 text-white shadow-sm'
                : activeStep > step.id
                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-500 dark:text-surface-400'
            }`}
          >
            {activeStep > step.id
              ? <HiOutlineCheck className="text-emerald-500" />
              : <span>{step.icon}</span>
            }
            {step.label}
          </div>
          {i < steps.length - 1 && (
            <HiOutlineChevronRight className="text-surface-300 dark:text-surface-700 mx-1 flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  )
}

export default function TrainingDashboard() {
  const [step, setStep] = useState(1)
  const [selectedDataset, setSelectedDataset] = useState(null)
  const [selectedFeatures, setSelectedFeatures] = useState([])
  const [modelType, setModelType] = useState('RL')
  const [selectedModel, setSelectedModel] = useState('ppo')
  const [training, setTraining] = useState(false)
  const [progress, setProgress] = useState(0)
  const [logLines, setLogLines] = useState([])
  const [done, setDone] = useState(false)

  const [hyperparams, setHyperparams] = useState({
    learningRate: '0.0003',
    batchSize: '256',
    episodes: '100',
    discountFactor: '0.99',
    stepsPerUpdate: '1024',
  })

  const currentDataset = DATASETS.find((d) => d.id === selectedDataset)

  const startTraining = async () => {
    setTraining(true)
    setProgress(0)
    setLogLines([`[00:00] Connecting to Flask Backend ${API_BASE}...`])
    setDone(false)

    // Call Flask reset endpoint
    const resetRes = await resetSimulation()
    if (resetRes && resetRes.status === 'reset_success') {
      setLogLines((prev) => [...prev, '[00:01] ✓ Connected! Gymnasium CloudSchedulerEnv reset successfully'])
    } else {
      setLogLines((prev) => [...prev, '[00:01] ⚠️ Flask server offline — executing simulation mode'])
    }

    let logIdx = 0
    let prog = 0

    const interval = setInterval(async () => {
      if (logIdx < MOCK_LOG.length) {
        setLogLines((prev) => [...prev, MOCK_LOG[logIdx]])
        // Trigger live backend scheduling decision
        scheduleTask(selectedModel || 'ppo')
        logIdx++
      }
      prog += 100 / MOCK_LOG.length
      setProgress(Math.min(prog, 100))

      if (logIdx >= MOCK_LOG.length) {
        clearInterval(interval)
        setDone(true)
        setTraining(false)
        setStep(8)
      }
    }, 600)
  }

  return (
    <PageLayout>
      <div className="pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            label="Training Dashboard"
            title="Interactive Model Training"
            subtitle="Follow the step-by-step workflow to configure and train a machine learning or reinforcement learning model."
          />

          <StepIndicator steps={STEPS} activeStep={step} />

          {/* STEP 1: Dataset */}
          {step === 1 && (
            <Card>
              <h3 className="font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
                <span>🗄️</span> Step 1: Select Dataset
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {DATASETS.map((ds) => (
                  <button
                    key={ds.id}
                    onClick={() => setSelectedDataset(ds.id)}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${
                      selectedDataset === ds.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-700'
                    }`}
                  >
                    <p className="font-medium text-sm text-surface-900 dark:text-white">{ds.shortName}</p>
                    <p className="text-xs text-surface-400 mt-0.5">{ds.category} · {ds.size}</p>
                    <Badge variant={ds.category === 'Cloud' ? 'blue' : ds.category === 'HPC' ? 'green' : 'purple'} className="mt-2">
                      {ds.category}
                    </Badge>
                  </button>
                ))}
              </div>
              <button
                disabled={!selectedDataset}
                onClick={() => setStep(2)}
                className="btn-primary mt-5 disabled:opacity-40"
              >
                Continue →
              </button>
            </Card>
          )}

          {/* STEP 2: Features */}
          {step === 2 && currentDataset && (
            <Card>
              <h3 className="font-semibold text-surface-900 dark:text-white mb-4">
                🗄️ Dataset: <span className="text-primary-600">{currentDataset.name}</span>
              </h3>
              <h3 className="font-semibold text-surface-900 dark:text-white mb-4">📋 Step 2: Select Features</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {currentDataset.features.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFeatures((prev) =>
                      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
                    )}
                    className={`code-tag cursor-pointer transition-all ${
                      selectedFeatures.includes(f)
                        ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 border-primary-300 dark:border-primary-700'
                        : ''
                    }`}
                  >
                    {selectedFeatures.includes(f) ? '✓ ' : ''}{f}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setStep(1)} className="btn-outline">← Back</button>
                <button onClick={() => setStep(3)} className="btn-primary">Continue →</button>
              </div>
            </Card>
          )}

          {/* STEP 3: Target */}
          {step === 3 && currentDataset && (
            <Card>
              <h3 className="font-semibold text-surface-900 dark:text-white mb-4">🎯 Step 3: Target Variable</h3>
              <div className="p-4 rounded-xl border-2 border-primary-400 bg-primary-50 dark:bg-primary-900/20 mb-6">
                <p className="text-sm font-medium text-surface-900 dark:text-white">{currentDataset.targetVariable}</p>
                <p className="text-xs text-surface-400 mt-1">Pre-selected based on dataset: {currentDataset.name}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setStep(2)} className="btn-outline">← Back</button>
                <button onClick={() => setStep(4)} className="btn-primary">Continue →</button>
              </div>
            </Card>
          )}

          {/* STEP 4: Model Type */}
          {step === 4 && (
            <Card>
              <h3 className="font-semibold text-surface-900 dark:text-white mb-4">🤖 Step 4: Model Type</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  { id: 'ML',  label: 'Machine Learning', desc: 'SARIMAX, LSTM, GRU, BiLSTM, TCN, Transformer — for workload forecasting', icon: '📊' },
                  { id: 'RL',  label: 'Reinforcement Learning', desc: 'PPO, MAPPO — for task scheduling and resource allocation', icon: '🎯' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setModelType(t.id)}
                    className={`text-left p-5 rounded-xl border-2 transition-all ${
                      modelType === t.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-700'
                    }`}
                  >
                    <span className="text-2xl">{t.icon}</span>
                    <p className="font-semibold text-surface-900 dark:text-white mt-2">{t.label}</p>
                    <p className="text-xs text-surface-500 dark:text-surface-400 mt-1 leading-relaxed">{t.desc}</p>
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setStep(3)} className="btn-outline">← Back</button>
                <button onClick={() => setStep(5)} className="btn-primary">Continue →</button>
              </div>
            </Card>
          )}

          {/* STEP 5: Model Selection */}
          {step === 5 && (
            <Card>
              <h3 className="font-semibold text-surface-900 dark:text-white mb-4">
                ⚡ Step 5: Choose {modelType} Model
              </h3>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {(modelType === 'RL' ? RL_MODELS : ML_MODELS).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModel(m.id)}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${
                      selectedModel === m.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-700'
                    }`}
                  >
                    <p className="font-medium text-sm text-surface-900 dark:text-white">{m.name}</p>
                    <Badge variant={m.status === 'implemented' || m.status === 'winner' ? 'green' : m.status === 'specified' ? 'yellow' : 'gray'} className="mt-1">
                      {m.statusLabel || m.status}
                    </Badge>
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setStep(4)} className="btn-outline">← Back</button>
                <button onClick={() => setStep(6)} className="btn-primary">Continue →</button>
              </div>
            </Card>
          )}

          {/* STEP 6: Hyperparameters */}
          {step === 6 && (
            <Card>
              <h3 className="font-semibold text-surface-900 dark:text-white mb-2">⚙️ Step 6: Hyperparameters</h3>
              <p className="text-xs text-surface-400 mb-5">Default values are from the paper's training configuration (Table 5).</p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {Object.entries(hyperparams).map(([key, val]) => (
                  <div key={key}>
                    <label className="text-xs text-surface-500 dark:text-surface-400 font-medium block mb-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <input
                      className="input"
                      value={val}
                      onChange={(e) => setHyperparams((h) => ({ ...h, [key]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setStep(5)} className="btn-outline">← Back</button>
                <button onClick={() => setStep(7)} className="btn-primary">Continue →</button>
              </div>
            </Card>
          )}

          {/* STEP 7: Train */}
          {step === 7 && (
            <Card>
              <h3 className="font-semibold text-surface-900 dark:text-white mb-2">🚀 Step 7: Train</h3>
              <p className="text-xs text-surface-400 mb-5">Review your configuration and start training.</p>

              <div className="grid sm:grid-cols-3 gap-3 mb-6">
                <div className="metric-pill">
                  <span className="text-xs text-surface-400">Dataset</span>
                  <span className="text-sm font-medium text-surface-900 dark:text-white mt-0.5">
                    {currentDataset?.shortName || 'HPC2N'}
                  </span>
                </div>
                <div className="metric-pill">
                  <span className="text-xs text-surface-400">Model</span>
                  <span className="text-sm font-medium text-surface-900 dark:text-white mt-0.5">PPO</span>
                </div>
                <div className="metric-pill">
                  <span className="text-xs text-surface-400">Episodes</span>
                  <span className="text-sm font-medium text-surface-900 dark:text-white mt-0.5">{hyperparams.episodes}</span>
                </div>
              </div>

              {/* Training progress */}
              {(training || done) && (
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-surface-500 mb-2">
                    <span>Training progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                  {/* Log output */}
                  <div className="mt-4 bg-surface-900 dark:bg-surface-950 rounded-xl p-4 h-40 overflow-y-auto scrollbar-thin font-mono text-xs text-surface-300 space-y-1">
                    {logLines.map((line, i) => (
                      <p key={i} className={line.includes('✓') ? 'text-emerald-400' : ''}>{line}</p>
                    ))}
                    {training && (
                      <p className="animate-pulse text-primary-400">▌</p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <button onClick={() => setStep(6)} className="btn-outline" disabled={training}>← Back</button>
                {!done ? (
                  <button
                    onClick={startTraining}
                    disabled={training}
                    className="btn-primary gap-2"
                  >
                    {training
                      ? <><HiOutlineRefresh className="animate-spin" /> Training...</>
                      : <><HiOutlinePlay /> Start Training</>
                    }
                  </button>
                ) : (
                  <button onClick={() => setStep(8)} className="btn-primary gap-2">
                    <HiOutlineCheck /> View Results →
                  </button>
                )}
              </div>
            </Card>
          )}

          {/* STEP 8: Results */}
          {step === 8 && (
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <HiOutlineCheck className="text-emerald-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-surface-900 dark:text-white">Training Complete!</h3>
                  <p className="text-xs text-surface-400">PPO scheduler trained successfully</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Throughput', value: '0.590', color: 'text-primary-700 dark:text-primary-300', note: 'Highest among all schedulers' },
                  { label: 'Drop Rate',  value: '41.00%', color: 'text-emerald-600 dark:text-emerald-400', note: 'Lowest among all schedulers' },
                  { label: 'Episodes',   value: '100',    color: 'text-surface-900 dark:text-white', note: '300 steps/episode' },
                ].map((m) => (
                  <div key={m.label} className="metric-pill text-center">
                    <span className="text-xs text-surface-400">{m.label}</span>
                    <span className={`text-2xl font-bold ${m.color} mt-1`}>{m.value}</span>
                    <span className="text-xs text-surface-400">{m.note}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setStep(1); setDone(false); setProgress(0); setLogLines([]) }} className="btn-outline">
                  New Experiment
                </button>
                <a href="/results" className="btn-primary">View Full Results →</a>
              </div>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
