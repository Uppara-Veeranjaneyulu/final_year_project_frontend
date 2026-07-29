import { useState } from 'react'
import { clsx } from 'clsx'

/**
 * Tabs — Tab switcher component
 * Usage:
 *   <Tabs tabs={['Overview', 'Details']} defaultTab="Overview">
 *     {(activeTab) => <div>{activeTab === 'Overview' ? <A /> : <B />}</div>}
 *   </Tabs>
 */
export default function Tabs({ tabs, defaultTab, children, className = '' }) {
  const [active, setActive] = useState(defaultTab || tabs[0])

  return (
    <div className={className}>
      {/* Tab bar */}
      <div className="flex items-center gap-1 border-b border-surface-200 dark:border-surface-800 mb-6 overflow-x-auto scrollbar-thin">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={clsx(
              'relative pb-3 px-4 text-sm font-medium whitespace-nowrap transition-colors',
              active === tab
                ? 'text-primary-700 dark:text-primary-300'
                : 'text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
            )}
          >
            {tab}
            {active === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>{typeof children === 'function' ? children(active) : children}</div>
    </div>
  )
}
