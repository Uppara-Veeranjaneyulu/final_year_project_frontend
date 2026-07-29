import { clsx } from 'clsx'

/**
 * Badge — inline colored label
 * variant: 'blue' | 'green' | 'yellow' | 'red' | 'gray' | 'purple'
 */
export default function Badge({ children, variant = 'gray', className = '', dot = false }) {
  const variants = {
    blue:   'badge-blue',
    green:  'badge-green',
    yellow: 'badge-yellow',
    red:    'badge-red',
    gray:   'badge-gray',
    purple: 'badge-purple',
  }

  return (
    <span className={clsx(variants[variant] || 'badge-gray', className)}>
      {dot && (
        <span className={clsx(
          'inline-block w-1.5 h-1.5 rounded-full',
          variant === 'blue'   ? 'bg-primary-500'  : '',
          variant === 'green'  ? 'bg-emerald-500'  : '',
          variant === 'yellow' ? 'bg-amber-500'    : '',
          variant === 'red'    ? 'bg-red-500'      : '',
          variant === 'purple' ? 'bg-purple-500'   : '',
          variant === 'gray'   ? 'bg-surface-400'  : '',
        )} />
      )}
      {children}
    </span>
  )
}
