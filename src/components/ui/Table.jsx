/**
 * Table — data table component with optional striped rows
 */
export default function Table({ headers = [], rows = [], striped = true, className = '' }) {
  return (
    <div className={`overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-800 ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left text-xs font-semibold text-surface-600 dark:text-surface-400 uppercase tracking-wider whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={`
                ${striped && ri % 2 === 1 ? 'bg-surface-50/50 dark:bg-surface-800/20' : 'bg-white dark:bg-surface-900'}
                hover:bg-primary-50/30 dark:hover:bg-primary-900/10 transition-colors
              `}
            >
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-surface-700 dark:text-surface-300 whitespace-nowrap">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
