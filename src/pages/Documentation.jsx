import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { HiOutlineBookOpen, HiOutlineChevronRight } from 'react-icons/hi'
import PageLayout from '../components/layout/PageLayout'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import CodeBlock from '../components/ui/CodeBlock'
import { PAPER, PPO_CONFIG, MAPPO_CONFIG } from '../utils/paperData'

const SECTIONS = [
  { id: 'overview',        label: 'Overview' },
  { id: 'project-structure', label: 'Project Structure' },
  { id: 'datasets',        label: 'Datasets Setup' },
  { id: 'preprocessing',   label: 'Preprocessing' },
  { id: 'forecasting',     label: 'Forecasting Models' },
  { id: 'rl-env',          label: 'RL Environment' },
  { id: 'ppo-train',       label: 'PPO Training' },
  { id: 'mappo-train',     label: 'MAPPO Configuration' },
  { id: 'adaptive-reward', label: 'Adaptive Reward' },
  { id: 'evaluation',      label: 'Evaluation' },
  { id: 'api-usage',       label: 'API Usage' },
  { id: 'future',          label: 'Future Work' },
]

const SETUP_CODE = `# Clone the frontend
git clone https://github.com/cloudrl/cloudrl-frontend.git
cd cloudrl-frontend
npm install
npm run dev

# Clone the backend
git clone https://github.com/cloudrl/cloudrl-backend.git
cd cloudrl-backend
pip install -r requirements.txt
python app.py`

const PREPROCESSING_CODE = `import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler

def preprocess_workload(df, window_size=24, test_ratio=0.2):
    """
    Applies identical preprocessing to all datasets.
    - Chronological 80-20 train-test split (no shuffling)
    - MinMax feature scaling
    - 24-step sliding window for sequence models
    """
    values = df['cpu_utilization'].values.reshape(-1, 1)
    scaler = MinMaxScaler()
    scaled = scaler.fit_transform(values).flatten()

    # Chronological split (NO shuffle)
    split = int(len(scaled) * (1 - test_ratio))
    train, test = scaled[:split], scaled[split:]

    # Sliding window
    def make_sequences(data, w):
        X, y = [], []
        for i in range(w, len(data)):
            X.append(data[i-w:i])
            y.append(data[i])
        return np.array(X), np.array(y)

    X_train, y_train = make_sequences(train, window_size)
    X_test, y_test   = make_sequences(test,  window_size)

    return X_train, y_train, X_test, y_test, scaler`

const SARIMAX_CODE = `from statsmodels.tsa.statespace.sarimax import SARIMAX
import numpy as np

class SARIMAXForecaster:
    """
    Rolling one-step-ahead SARIMAX forecaster.
    Updates model state with latest true observation at each step,
    enabling adaptation to temporal regime changes.
    """
    def __init__(self, order=(1,1,1), seasonal_order=(1,1,1,12)):
        self.order = order
        self.seasonal_order = seasonal_order
        self.model = None
        self.history = []

    def fit(self, train_series):
        self.history = list(train_series)
        model = SARIMAX(
            self.history,
            order=self.order,
            seasonal_order=self.seasonal_order,
            enforce_stationarity=False,
            enforce_invertibility=False
        )
        self.model = model.fit(disp=False)
        return self

    def predict_rolling(self, test_series):
        """Rolling one-step-ahead prediction."""
        predictions = []
        history = self.history.copy()
        for true_val in test_series:
            model = SARIMAX(
                history,
                order=self.order,
                seasonal_order=self.seasonal_order
            )
            result = model.fit(disp=False)
            pred = result.forecast(steps=1)[0]
            predictions.append(pred)
            history.append(true_val)  # Update with true observation
        return np.array(predictions)`

const PPO_CODE = `from stable_baselines3 import PPO
from stable_baselines3.common.env_util import make_vec_env
from cloud_env import CloudSchedulingEnv

# Create environment
env = CloudSchedulingEnv(
    num_servers=6,
    episode_length=300,
    server_configs=SERVER_CONFIGS,
    task_categories=TASK_CATEGORIES,
)

# PPO configuration (Table 5 from paper)
model = PPO(
    policy='MlpPolicy',
    env=env,
    learning_rate=3e-4,
    n_steps=1024,
    batch_size=256,
    gamma=0.99,
    verbose=1,
)

# Train
model.learn(total_timesteps=300_000)

# Evaluate
obs = env.reset()
total_throughput = 0
for _ in range(1000):
    action, _ = model.predict(obs, deterministic=True)
    obs, reward, done, info = env.step(action)
    total_throughput += info.get('throughput', 0)
    if done:
        obs = env.reset()

print(f"Mean Throughput: {total_throughput / 1000:.3f}")  # Expected: ~0.590`

const ADAPTIVE_REWARD_CODE = `class AdaptiveRewardManager:
    """
    Automatically re-weights reward coefficients once per episode
    based on normalized violations of target service objectives.
    (Section 10 of the paper, Equations 12–16)
    """
    TARGETS = {
        'drop_rate':     0.02,   # < 2%
        'avg_latency':   50.0,   # < 50ms
        'queue_length':  5.0,    # < 5 requests
        'load_variance': 0.25,   # < 0.25
        'crash_rate':    0.0,    # = 0
    }

    def __init__(self, initial_weights, lr=0.1, w_min=0.05, w_max=1.0):
        self.weights = initial_weights.copy()
        self.lr = lr
        self.w_min = w_min
        self.w_max = w_max
        self.initial_weights = initial_weights.copy()

    def update(self, metrics: dict):
        """Call once per episode after aggregating outcomes."""
        errors = {}
        for k, target in self.TARGETS.items():
            obs = metrics.get(k, 0.0)
            if target != 0:
                errors[k] = (obs - target) / target   # Eq. 12
            else:
                errors[k] = obs                        # Eq. 13

        # Priority weights (Eq. 14)
        violations = sum(max(e, 0) for e in errors.values())
        priorities = {
            k: max(e, 0) / violations if violations > 0 else 0
            for k, e in errors.items()
        }

        # Update weights (Eq. 15)
        for k in self.weights:
            if errors.get(k, 0) > 0:
                self.weights[k] += self.lr * priorities.get(k, 0) * errors[k]
            else:
                self.weights[k] -= self.lr * (self.weights[k] - self.initial_weights[k])

        # Clamp (Eq. 16)
        self.weights = {
            k: max(self.w_min, min(self.w_max, v))
            for k, v in self.weights.items()
        }

    def compute_reward(self, step_metrics: dict) -> float:
        """Compute reward using current adaptive weights."""
        w = self.weights
        r = (
            w['acceptance'] * step_metrics['acceptance_rate']
          + w['throughput'] * step_metrics['throughput']
          + w['load_balance'] * step_metrics['load_balance']
          - w['latency'] * step_metrics['avg_latency']
          - w['drop_rate'] * step_metrics['drop_rate']
          - w['overload'] * step_metrics['overload_events']
          - w['queue'] * step_metrics['queue_length']
        )
        return r`

function DocSection({ id, title, children }) {
  return (
    <section id={id} className="mb-12 scroll-mt-20">
      <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-5 pb-3 border-b border-surface-200 dark:border-surface-800">
        {title}
      </h2>
      <div className="space-y-4 text-sm leading-7 text-surface-600 dark:text-surface-400">
        {children}
      </div>
    </section>
  )
}

export default function Documentation() {
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <PageLayout>
      <div className="pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex gap-10">
          {/* Sidebar */}
          <nav className="w-56 flex-shrink-0 sticky top-20 self-start max-h-[80vh] overflow-y-auto scrollbar-thin hidden lg:block">
            <p className="text-xs font-semibold uppercase tracking-wider text-surface-400 mb-3 px-3">
              Documentation
            </p>
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`sidebar-link mb-0.5 ${activeSection === s.id ? 'sidebar-link-active' : ''}`}
                onClick={() => setActiveSection(s.id)}
              >
                <HiOutlineChevronRight className="text-xs" />
                {s.label}
              </a>
            ))}
          </nav>

          {/* Content */}
          <div className="flex-1 min-w-0 max-w-3xl">
            <div className="mb-10">
              <Badge variant="blue" className="mb-3">
                <HiOutlineBookOpen className="mr-1" /> Documentation
              </Badge>
              <h1 className="page-title mb-2">Technical Documentation</h1>
              <p className="section-subtitle">
                Implementation guide for the RL-Based Dynamic Task Scheduling framework.
              </p>
            </div>

            <DocSection id="overview" title="Overview">
              <p>
                This project implements a reinforcement learning-based framework for dynamic task scheduling
                and resource allocation in cloud environments, as described in the paper:
              </p>
              <Card className="my-4 bg-primary-50 dark:bg-primary-900/10 border-primary-200 dark:border-primary-800/50">
                <p className="font-medium text-primary-800 dark:text-primary-200 text-sm">{PAPER.fullTitle}</p>
              </Card>
              <p>The framework has two main components, hosted in separate repositories:</p>
              <div className="grid sm:grid-cols-2 gap-3 mt-3">
                {[
                  { title: 'Frontend', tech: 'React + Vite + Tailwind', desc: 'Research portal, documentation, training dashboard' },
                  { title: 'Backend',  tech: 'Python + Flask',          desc: 'ML/RL model training, evaluation, API endpoints' },
                ].map((c) => (
                  <div key={c.title} className="p-4 rounded-xl border border-surface-200 dark:border-surface-800">
                    <p className="font-medium text-surface-900 dark:text-white">{c.title}</p>
                    <Badge variant="gray" className="mt-1 mb-2">{c.tech}</Badge>
                    <p className="text-xs text-surface-500 dark:text-surface-400">{c.desc}</p>
                  </div>
                ))}
              </div>
              <CodeBlock code={SETUP_CODE} language="bash" title="Quick Start" />
            </DocSection>

            <DocSection id="project-structure" title="Project Structure">
              <CodeBlock
                language="text"
                title="Frontend Directory"
                code={`final_year_project_frontend/
├── src/
│   ├── pages/              # 15 pages
│   │   ├── Home.jsx
│   │   ├── ResearchPaper.jsx
│   │   ├── Documentation.jsx
│   │   ├── DatasetLibrary.jsx
│   │   ├── MLModels.jsx
│   │   ├── RLModels.jsx
│   │   ├── TrainingDashboard.jsx
│   │   ├── Results.jsx
│   │   ├── Experiments.jsx
│   │   └── ...
│   ├── components/
│   │   ├── layout/         # Navbar, Footer, PageLayout
│   │   └── ui/             # Card, Badge, MetricCard, ...
│   ├── hooks/              # useTheme
│   └── utils/
│       ├── paperData.js    # All paper content as constants
│       └── formatters.js   # Utility functions
└── resources/
    └── sn-article-jcc.pdf  # Source paper`}
              />
              <CodeBlock
                language="text"
                title="Backend Directory (Flask)"
                code={`project_backend/
├── app.py                  # Flask entry point
├── models/
│   ├── forecasting.py      # SARIMAX, LSTM, GRU, BiLSTM, TCN, Transformer
│   └── rl_scheduler.py     # PPO, MAPPO, AdaptiveRewardManager
├── environments/
│   └── cloud_env.py        # Gymnasium cloud simulation
├── datasets/               # Dataset loaders
└── api/
    ├── train.py             # Training endpoints
    ├── evaluate.py          # Evaluation endpoints
    └── predict.py           # Forecasting endpoints`}
              />
            </DocSection>

            <DocSection id="datasets" title="Datasets Setup">
              <p>The framework evaluates 7 real-world datasets (Section 4 of the paper). Download links:</p>
              <ul className="space-y-2 list-disc list-inside mt-3">
                <li><strong>Google Cluster Trace v1/v2.1:</strong> Google Cluster Data on GitHub</li>
                <li><strong>Bitbrains GWA-T-12:</strong> Grid Workloads Archive (GWA)</li>
                <li><strong>Spitzer &amp; XMM-Newton:</strong> NASA/ESA Science Archives</li>
                <li><strong>Parallel Workloads Archive:</strong> workload.scs.illinois.edu/pwa.html</li>
                <li><strong>HPC2N:</strong> Part of Parallel Workloads Archive</li>
              </ul>
              <p className="mt-4">Place all datasets in <code className="code-tag">project_backend/datasets/</code> and
              use the provided loaders.</p>
            </DocSection>

            <DocSection id="preprocessing" title="Data Preprocessing">
              <p>Identical preprocessing is applied to all datasets as described in Section 5 of the paper.
                Key design decisions:</p>
              <ul className="space-y-1 list-disc list-inside mt-2">
                <li>Chronological 80–20 split (no shuffling — to avoid future data leakage)</li>
                <li>24-step sliding window (Equations 4–5)</li>
                <li>MinMax feature scaling</li>
              </ul>
              <CodeBlock code={PREPROCESSING_CODE} language="python" title="preprocessing.py" />
            </DocSection>

            <DocSection id="forecasting" title="Forecasting Models">
              <p>Seven forecasting models are implemented and evaluated (Section 6). SARIMAX is selected
                as the forecasting backbone based on experimental results (RMSE: 0.0708, R²: 0.270).</p>
              <CodeBlock code={SARIMAX_CODE} language="python" title="sarimax_forecaster.py" />
            </DocSection>

            <DocSection id="rl-env" title="RL Environment">
              <p>The cloud scheduling environment exposes a <code className="code-tag">gymnasium.Env</code> interface.
                State space: 50 features (11 × 4 servers + 6 task features). Action space: server selection.</p>
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                <Card className="p-4">
                  <p className="text-xs font-semibold text-surface-500 mb-2">State Space</p>
                  <p className="font-mono text-xs">|S| = 11 × 4 + 6 = 50</p>
                </Card>
                <Card className="p-4">
                  <p className="text-xs font-semibold text-surface-500 mb-2">Action Space</p>
                  <p className="font-mono text-xs">A = {'{'}0, 1, ..., N−1{'}'}</p>
                </Card>
              </div>
            </DocSection>

            <DocSection id="ppo-train" title="PPO Training">
              <p>Single-agent PPO is implemented using Stable-Baselines3 (Table 5 of the paper).</p>
              <CodeBlock code={PPO_CODE} language="python" title="train_ppo.py" />
              <div className="grid sm:grid-cols-3 gap-2 mt-4">
                {Object.entries(PPO_CONFIG).map(([k, v]) => (
                  <div key={k} className="p-3 rounded-lg border border-surface-100 dark:border-surface-800">
                    <p className="text-xs text-surface-400 capitalize">{k.replace(/([A-Z])/g, ' $1')}</p>
                    <p className="font-mono text-xs font-medium text-surface-900 dark:text-white mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
            </DocSection>

            <DocSection id="adaptive-reward" title="Adaptive Reward System">
              <p>The <code className="code-tag">AdaptiveRewardManager</code> (Section 10, Equations 12–16)
                automatically re-weights reward coefficients once per episode based on violations of target
                service objectives.</p>
              <CodeBlock code={ADAPTIVE_REWARD_CODE} language="python" title="adaptive_reward.py" />
            </DocSection>

            <DocSection id="mappo-train" title="MAPPO Configuration">
              <Card className="mb-4 bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30">
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  MAPPO training is not yet implemented. Only the architecture is specified in the paper.
                  The configuration below is as described in Section 13 / Table 4.
                </p>
              </Card>
              <div className="grid sm:grid-cols-2 gap-2">
                {Object.entries(MAPPO_CONFIG).map(([k, v]) => (
                  <div key={k} className="p-3 rounded-lg border border-surface-100 dark:border-surface-800">
                    <p className="text-xs text-surface-400 capitalize">{k.replace(/([A-Z])/g, ' $1')}</p>
                    <p className="text-xs font-medium text-surface-900 dark:text-white mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
            </DocSection>

            <DocSection id="evaluation" title="Evaluation">
              <p>Forecasting models are evaluated using MAE, RMSE, and R² on the chronological test split.
                Scheduling policies are evaluated by running the trained policy in evaluation mode for
                1000 steps and measuring throughput, drop rate, CPU utilization, and latency.</p>
            </DocSection>

            <DocSection id="future" title="Future Work">
              <ul className="space-y-2 list-disc list-inside">
                <li>Implement and evaluate AdaptiveRewardManager with single-agent PPO</li>
                <li>Implement Dec-POMDP environment and MAPPO training pipeline</li>
                <li>End-to-end integration of SARIMAX forecasts into RL state</li>
                <li>Kubernetes deployment for real-world validation</li>
                <li>Scalability studies varying number of agents and servers</li>
              </ul>
            </DocSection>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
