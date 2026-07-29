/**
 * Flask Backend REST API Client
 * Base URL: http://localhost:5000
 */

export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

/**
 * Check backend health status
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('Flask Backend connection unavailable:', err.message)
    return { status: 'offline', error: err.message }
  }
}

/**
 * Reset Gymnasium simulation environment
 */
export async function resetSimulation() {
  try {
    const res = await fetch(`${API_BASE}/api/v1/simulation/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    return await res.json()
  } catch (err) {
    console.error('API resetSimulation error:', err)
    return null
  }
}

/**
 * Step Gymnasium simulation with action (0..N-1)
 */
export async function stepSimulation(action = 0) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/simulation/step`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    })
    return await res.json()
  } catch (err) {
    console.error('API stepSimulation error:', err)
    return null
  }
}

/**
 * Get current simulation status & task metrics
 */
export async function getSimulationStatus() {
  try {
    const res = await fetch(`${API_BASE}/api/v1/simulation/status`)
    return await res.json()
  } catch (err) {
    console.error('API getSimulationStatus error:', err)
    return null
  }
}

/**
 * Run scheduler decision under selected policy (PPO, Round Robin, Least Connections, Random)
 */
export async function scheduleTask(policy = 'ppo') {
  try {
    const res = await fetch(`${API_BASE}/api/v1/scheduler/schedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ policy }),
    })
    return await res.json()
  } catch (err) {
    console.error('API scheduleTask error:', err)
    return null
  }
}

/**
 * Fetch AdaptiveRewardManager current weight vector & historical trajectory
 */
export async function getRewardWeightsTrajectory() {
  try {
    const res = await fetch(`${API_BASE}/api/v1/scheduler/metrics/reward-weights`)
    return await res.json()
  } catch (err) {
    console.error('API getRewardWeightsTrajectory error:', err)
    return null
  }
}

/**
 * Predict workload intensity using SARIMAX or baseline model
 */
export async function predictWorkload(history = [], model = 'sarimax') {
  try {
    const res = await fetch(`${API_BASE}/api/v1/forecasting/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history, model }),
    })
    return await res.json()
  } catch (err) {
    console.error('API predictWorkload error:', err)
    return null
  }
}

/**
 * Fetch list of 10 workload trace datasets
 */
export async function getDatasetsList() {
  try {
    const res = await fetch(`${API_BASE}/api/v1/datasets/list`)
    return await res.json()
  } catch (err) {
    console.error('API getDatasetsList error:', err)
    return null
  }
}

/**
 * Fetch dataset sample time series
 */
export async function getDatasetSeries(datasetId = 'google-cluster-v1', length = 100) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/datasets/${datasetId}/series?length=${length}`)
    return await res.json()
  } catch (err) {
    console.error('API getDatasetSeries error:', err)
    return null
  }
}
