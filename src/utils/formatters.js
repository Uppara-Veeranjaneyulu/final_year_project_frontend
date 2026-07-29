// Formatting utilities

/**
 * Format a number to fixed decimal places
 */
export const fmt = (val, decimals = 4) =>
  typeof val === 'number' ? val.toFixed(decimals) : val

/**
 * Format percentage
 */
export const fmtPct = (val, decimals = 1) =>
  typeof val === 'number' ? `${val.toFixed(decimals)}%` : '—'

/**
 * Format scientific notation
 */
export const fmtSci = (val) => {
  if (typeof val !== 'number') return val
  if (Math.abs(val) < 1e-3 || Math.abs(val) >= 1e4)
    return val.toExponential(2)
  return val.toPrecision(4)
}

/**
 * Clamp a number between min and max
 */
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

/**
 * Convert bytes to human-readable size
 */
export const fmtBytes = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

/**
 * Get status color based on text
 */
export const getStatusColor = (status) => {
  const map = {
    implemented: 'badge-green',
    winner: 'badge-blue',
    specified: 'badge-yellow',
    available: 'badge-gray',
    pending: 'badge-yellow',
    evaluated: 'badge-gray',
    running: 'badge-green',
    failed: 'badge-red',
    completed: 'badge-blue',
  }
  return map[status?.toLowerCase()] || 'badge-gray'
}

/**
 * Get model type color
 */
export const getModelTypeColor = (type) => {
  const map = {
    'Statistical': 'badge-blue',
    'Deep Learning': 'badge-purple',
    'Baseline': 'badge-gray',
    'Policy Gradient': 'badge-green',
    'Multi-Agent RL': 'badge-blue',
    'Value-Based': 'badge-yellow',
    'Actor-Critic': 'badge-purple',
  }
  return map[type] || 'badge-gray'
}

/**
 * Get dataset category color
 */
export const getDatasetColor = (category) => {
  const map = {
    Cloud: 'badge-blue',
    HPC: 'badge-green',
    Scientific: 'badge-purple',
  }
  return map[category] || 'badge-gray'
}

/**
 * Truncate text
 */
export const truncate = (str, maxLen = 100) =>
  str.length > maxLen ? `${str.slice(0, maxLen)}...` : str
