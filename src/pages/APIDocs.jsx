import CodeBlock from '../components/ui/CodeBlock'
import Badge from '../components/ui/Badge'
import PageLayout from '../components/layout/PageLayout'
import Card from '../components/ui/Card'
import SectionHeader from '../components/ui/SectionHeader'
import { API_BASE } from '../api/client'

const ENDPOINTS = [
  {
    method: 'GET',
    path: '/api/health',
    desc: 'Backend health check',
    response: '{ "status": "ok", "version": "1.0.0" }',
    auth: false,
  },
  {
    method: 'GET',
    path: '/api/datasets',
    desc: 'List all available datasets',
    response: '{ "datasets": [{ "id": "hpc2n", "name": "HPC2N", "size": "Medium" }] }',
    auth: false,
  },
  {
    method: 'POST',
    path: '/api/train/forecasting',
    desc: 'Train a forecasting model',
    body: '{ "dataset": "hpc2n", "model": "sarimax", "window_size": 24 }',
    response: '{ "job_id": "exp-001", "status": "started" }',
    auth: true,
  },
  {
    method: 'POST',
    path: '/api/train/rl',
    desc: 'Train an RL scheduling model',
    body: '{ "model": "ppo", "episodes": 100, "batch_size": 256 }',
    response: '{ "job_id": "exp-008", "status": "started" }',
    auth: true,
  },
  {
    method: 'GET',
    path: '/api/results/:job_id',
    desc: 'Get training results for a job',
    response: '{ "mae": 0.0248, "rmse": 0.0708, "r2": 0.270 }',
    auth: false,
  },
  {
    method: 'POST',
    path: '/api/predict',
    desc: 'Run workload prediction',
    body: '{ "model": "sarimax", "series": [0.12, 0.15, ...], "steps": 1 }',
    response: '{ "prediction": 0.14, "confidence": 0.95 }',
    auth: false,
  },
  {
    method: 'GET',
    path: '/api/experiments',
    desc: 'List all experiments',
    response: '{ "experiments": [{ "id": "EXP-001", "status": "completed" }] }',
    auth: false,
  },
  {
    method: 'DELETE',
    path: '/api/experiments/:id',
    desc: 'Delete an experiment',
    response: '{ "deleted": "EXP-001" }',
    auth: true,
  },
]

const METHOD_COLORS = {
  GET:    'green',
  POST:   'blue',
  PUT:    'yellow',
  DELETE: 'red',
}

const EXAMPLE_PYTHON = `import requests

BASE_URL = "http://localhost:5000/api"

# Train SARIMAX on HPC2N dataset
resp = requests.post(f"{BASE_URL}/train/forecasting", json={
    "dataset": "hpc2n",
    "model": "sarimax",
    "window_size": 24,
    "train_ratio": 0.8,
})
job_id = resp.json()["job_id"]

# Poll for results
import time
while True:
    result = requests.get(f"{BASE_URL}/results/{job_id}").json()
    if result["status"] == "completed":
        print(f"RMSE: {result['rmse']:.4f}")  # Expected: 0.0708
        print(f"R²:   {result['r2']:.3f}")    # Expected: 0.270
        break
    time.sleep(2)`

const EXAMPLE_JS = `// Using axios in the frontend
import axios from 'axios'

// Train PPO scheduler
const response = await axios.post('/api/train/rl', {
  model: 'ppo',
  episodes: 100,
  batch_size: 256,
  learning_rate: 3e-4,
  discount_factor: 0.99,
})

const { job_id } = response.data

// Poll for completion
const poll = setInterval(async () => {
  const { data } = await axios.get(\`/api/results/\${job_id}\`)
  if (data.status === 'completed') {
    clearInterval(poll)
    console.log('Throughput:', data.throughput) // Expected: 0.590
    console.log('Drop Rate:', data.drop_rate)   // Expected: 0.41
  }
}, 2000)`

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
