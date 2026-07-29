import { clsx } from 'clsx'
import { motion } from 'framer-motion'

/**
 * Card — base rounded card component
 * Usage: <Card> ... </Card>
 *        <Card hover> ... </Card>   (adds hover shadow)
 *        <Card animate> ... </Card> (fade-up entrance)
 */
export default function Card({
  children,
  className = '',
  hover = false,
  animate = false,
  padding = true,
  ...props
}) {
  const cls = clsx(
    'bg-white dark:bg-surface-900',
    'border border-surface-200 dark:border-surface-800',
    'rounded-xl shadow-card',
    hover && 'transition-all duration-200 hover:shadow-card-hover hover:border-surface-300 dark:hover:border-surface-700',
    padding && 'p-5',
    className
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={cls}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={cls} {...props}>
      {children}
    </div>
  )
}
