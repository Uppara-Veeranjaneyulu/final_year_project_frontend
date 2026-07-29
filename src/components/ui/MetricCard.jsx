import { clsx } from 'clsx'
import { motion } from 'framer-motion'

/**
 * MetricCard — displays a single KPI metric
 */
export function MetricCard({ label, value, sub, icon, color = 'blue', animate = true, className = '' }) {
  const colorMap = {
    blue:   'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20',
    green:  'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
    yellow: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20',
    red:    'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
    purple: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20',
  }

  const Wrapper = animate ? motion.div : 'div'
  const motionProps = animate
    ? { initial: { opacity: 0, y: 8 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.4 } }
    : {}

  return (
    <Wrapper
      {...motionProps}
      className={clsx(
        'card p-5 flex flex-col gap-2',
        className
      )}
    >
      {icon && (
        <div className={clsx('w-9 h-9 rounded-lg flex items-center justify-center text-lg', colorMap[color])}>
          {icon}
        </div>
      )}
      <div>
        <p className="text-xs text-surface-500 dark:text-surface-400 font-medium">{label}</p>
        <p className="text-2xl font-bold text-surface-900 dark:text-white mt-0.5">{value}</p>
        {sub && <p className="text-xs text-surface-400 dark:text-surface-500 mt-0.5">{sub}</p>}
      </div>
    </Wrapper>
  )
}

/**
 * MetricRow — horizontal metric display for comparison tables
 */
export function MetricRow({ label, value, max, color = 'blue' }) {
  const pct = max ? Math.min((value / max) * 100, 100) : 0
  const colors = {
    blue:   'bg-primary-500',
    green:  'bg-emerald-500',
    yellow: 'bg-amber-500',
    red:    'bg-red-500',
  }
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-surface-600 dark:text-surface-400 w-28 flex-shrink-0">{label}</span>
      {max && (
        <div className="progress-bar flex-1">
          <div className={clsx('progress-fill', colors[color])} style={{ width: `${pct}%` }} />
        </div>
      )}
      <span className="text-sm font-semibold text-surface-900 dark:text-white w-16 text-right">{value}</span>
    </div>
  )
}
