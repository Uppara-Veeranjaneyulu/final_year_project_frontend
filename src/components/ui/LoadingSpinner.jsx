/**
 * LoadingSpinner — Centered loading indicator
 */
export function LoadingSpinner({ size = 'md', label = '' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' }
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div className={`${sizes[size]} border-2 border-surface-200 dark:border-surface-700 border-t-primary-500 rounded-full animate-spin`} />
      {label && <p className="text-sm text-surface-500 dark:text-surface-400">{label}</p>}
    </div>
  )
}

/**
 * PageSpinner — Full page loading state
 */
export function PageSpinner() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <LoadingSpinner size="lg" label="Loading..." />
    </div>
  )
}
