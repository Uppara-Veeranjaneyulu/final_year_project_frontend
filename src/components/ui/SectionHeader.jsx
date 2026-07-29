/**
 * SectionHeader — Page section header with label, title, subtitle
 */
export default function SectionHeader({
  label = '',
  title,
  subtitle = '',
  center = false,
  className = '',
}) {
  return (
    <div className={`mb-10 ${center ? 'text-center' : ''} ${className}`}>
      {label && <p className="section-label">{label}</p>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className={`section-subtitle ${center ? 'mx-auto max-w-2xl' : 'max-w-3xl'}`}>{subtitle}</p>}
    </div>
  )
}
