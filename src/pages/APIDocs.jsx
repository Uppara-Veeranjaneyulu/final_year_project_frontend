import CodeBlock from '../components/ui/CodeBlock'
import Badge from '../components/ui/Badge'
import PageLayout from '../components/layout/PageLayout'
import Card from '../components/ui/Card'
import SectionHeader from '../components/ui/SectionHeader'
import { API_BASE } from '../api/client'

const ENDPOINTS = [
  {
    method: 'GET',
    path: '/health',
    desc: 'API backend health check status',
    response: '{ "status": "ok", "version": "1.0.0" }',
    auth: false,
  },
  {
    method: 'GET',
    path: '/api/v1/datasets/list',
    desc: 'List all 10 workload trace datasets',
    response: '{ "datasets": [{ "id": "google-cluster-v1", "name": "Google Cluster Workload Trace v1", "category": "Cloud" }] }',
    auth: false,
  },
  {
    method: 'GET',
    path: '/api/v1/datasets/:dataset_id/series',
    desc: 'Fetch dataset sample time series values',
    response: '{ "dataset_id": "google-cluster-v1", "length": 100, "series": [0.41, 0.45, 0.48] }',
    auth: false,
  },
  {
    method: 'POST',
    path: '/api/v1/simulation/reset',
    desc: 'Reset Gymnasium CloudSchedulerEnv environment',
    response: '{ "observation": [0.12, 0.45, 0.0, ...], "status": "reset_success" }',
    auth: false,
  },
  {
    method: 'POST',
    path: '/api/v1/simulation/step',
    desc: 'Step environment with action (server index 0..N-1)',
    body: '{ "action": 0 }',
    response: '{ "observation": [...], "reward": 2.45, "done": false, "metrics": { "throughput": 0.59 } }',
    auth: false,
  },
  {
    method: 'GET',
    path: '/api/v1/simulation/status',
    desc: 'Get current simulation metrics and AdaptiveReward status',
    response: '{ "current_step": 12, "completed_tasks": 10, "dropped_tasks": 2 }',
    auth: false,
  },
  {
    method: 'POST',
    path: '/api/v1/scheduler/schedule',
    desc: 'Execute task scheduling decision using PPO / Round Robin / Least Connections / Random',
    body: '{ "policy": "ppo" }',
    response: '{ "policy": "ppo", "selected_server": 1, "reward": 2.67, "metrics": { "throughput": 0.59 } }',
    auth: false,
  },
  {
    method: 'GET',
    path: '/api/v1/scheduler/metrics/reward-weights',
    desc: 'Fetch current weight vector & history from AdaptiveRewardManager',
    response: '{ "current_weights": { "throughput": 0.25, "drop_rate": 0.35 }, "adaptation_rate": 0.05 }',
    auth: false,
  },
  {
    method: 'POST',
    path: '/api/v1/forecasting/predict',
    desc: 'Predict workload intensity using SARIMAX or baseline model',
    body: '{ "history": [0.12, 0.15, 0.18, 0.22], "model": "sarimax" }',
    response: '{ "model": "sarimax", "predicted_workload": 0.24, "input_window_length": 4 }',
    auth: false,
  },
  {
    method: 'GET',
    path: '/api/v1/forecasting/evaluation',
    desc: 'Fetch paper Table 1 verified forecasting results across 7 models',
    response: '{ "results": [{ "model": "SARIMAX", "mae": 0.0248, "rmse": 0.0708, "r2": 0.270, "selected": true }] }',
    auth: false,
  },
]

const METHOD_COLORS = {
  GET:    'green',
  POST:   'blue',
  PUT:    'yellow',
  DELETE: 'red',
}

const EXAMPLE_PYTHON = `import requests

BASE_URL = "http://localhost:5000/api/v1"

# Predict workload using SARIMAX
resp = requests.post(f"{BASE_URL}/forecasting/predict", json={
    "history": [0.12, 0.15, 0.20, 0.25, 0.30],
    "model": "sarimax"
})
print("Predicted Workload:", resp.json()["predicted_workload"])

# Reset simulation and schedule a task via PPO
requests.post(f"{BASE_URL}/simulation/reset")
sched_resp = requests.post(f"{BASE_URL}/scheduler/schedule", json={
    "policy": "ppo"
})
data = sched_resp.json()
print(f"Selected Server: {data['selected_server']}")
print(f"Reward: {data['reward']:.4f}")`

const EXAMPLE_JS = `// Using fetch in the frontend
import { scheduleTask, resetSimulation } from './api/client'

// Reset Gymnasium environment
await resetSimulation()

// Schedule incoming task with PPO Policy
const result = await scheduleTask('ppo')
console.log('Selected Server:', result.selected_server)
console.log('Throughput:', result.metrics.throughput) // Expected: 0.590`

export default function APIDocs() {
  return (
    <PageLayout>
      <div className="pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            label="API Reference"
            title="REST API Documentation"
            subtitle={`The Flask backend exposes a REST API for training, evaluation, and prediction. Base URL: ${API_BASE}`}
          />

          {/* Base URL info */}
          <Card className="mb-8 p-4 bg-surface-50 dark:bg-surface-800/50">
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="text-surface-400 text-xs">Base URL</span>
                <p className="font-mono text-surface-900 dark:text-white">{API_BASE}/api/v1</p>
              </div>
              <div>
                <span className="text-surface-400 text-xs">Content Type</span>
                <p className="font-mono text-surface-900 dark:text-white">application/json</p>
              </div>
              <div>
                <span className="text-surface-400 text-xs">Authentication</span>
                <p className="font-mono text-surface-900 dark:text-white">None (local dev)</p>
              </div>
            </div>
          </Card>

          {/* Endpoints */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-5">Endpoints</h2>
            <div className="space-y-3">
              {ENDPOINTS.map((ep) => (
                <Card key={ep.path} hover className="p-0 overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center gap-3 p-4 border-b border-surface-100 dark:border-surface-800">
                    <Badge variant={METHOD_COLORS[ep.method]}>{ep.method}</Badge>
                    <code className="font-mono text-sm text-surface-900 dark:text-white">{ep.path}</code>
                    {ep.auth && <Badge variant="yellow" className="ml-auto flex-shrink-0">Auth required</Badge>}
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-3">
                    <p className="text-sm text-surface-600 dark:text-surface-400">{ep.desc}</p>

                    {ep.body && (
                      <div>
                        <p className="text-xs text-surface-400 mb-1">Request Body</p>
                        <code className="block text-xs font-mono bg-surface-50 dark:bg-surface-800 p-2 rounded text-surface-700 dark:text-surface-300">
                          {ep.body}
                        </code>
                      </div>
                    )}

                    <div>
                      <p className="text-xs text-surface-400 mb-1">Response</p>
                      <code className="block text-xs font-mono bg-surface-50 dark:bg-surface-800 p-2 rounded text-surface-700 dark:text-surface-300">
                        {ep.response}
                      </code>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Code examples */}
          <section>
            <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-5">Code Examples</h2>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Python Example</p>
                <CodeBlock code={EXAMPLE_PYTHON} language="python" title="train_and_evaluate.py" />
              </div>
              <div>
                <p className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">JavaScript / React Example</p>
                <CodeBlock code={EXAMPLE_JS} language="javascript" title="api-example.js" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}
