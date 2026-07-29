import { useState } from 'react'
import { HiOutlineClipboardCopy, HiOutlineCheck } from 'react-icons/hi'

/**
 * CodeBlock — displays code with syntax highlighting + copy button
 */
export default function CodeBlock({ code, language = 'python', title = '', className = '' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`rounded-xl border border-surface-200 dark:border-surface-700 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface-50 dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          {title && <span className="text-xs text-surface-500 dark:text-surface-400 font-medium ml-2">{title}</span>}
          {language && !title && <span className="text-xs text-surface-400 font-mono">{language}</span>}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 transition-colors py-1 px-2 rounded"
        >
          {copied ? (
            <>
              <HiOutlineCheck className="text-emerald-500" />
              <span className="text-emerald-500">Copied!</span>
            </>
          ) : (
            <>
              <HiOutlineClipboardCopy />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="bg-surface-900 dark:bg-surface-950 overflow-x-auto scrollbar-thin">
        <pre className="p-4 text-sm leading-relaxed">
          <code className="text-surface-200 font-mono whitespace-pre">{code}</code>
        </pre>
      </div>
    </div>
  )
}
