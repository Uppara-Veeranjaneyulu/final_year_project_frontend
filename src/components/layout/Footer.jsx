import { Link } from 'react-router-dom'
import { MdScience } from 'react-icons/md'
import { HiOutlineExternalLink } from 'react-icons/hi'

const FOOTER_LINKS = {
  Research: [
    { label: 'Research Paper',  href: '/research-paper' },
    { label: 'About Project',   href: '/about' },
    { label: 'Blog',            href: '/blog' },
    { label: 'Team',            href: '/team' },
  ],
  Platform: [
    { label: 'Dataset Library',    href: '/datasets' },
    { label: 'Training Dashboard', href: '/training' },
    { label: 'Results',            href: '/results' },
    { label: 'Experiments',        href: '/experiments' },
  ],
  Docs: [
    { label: 'Documentation', href: '/documentation' },
    { label: 'API Reference',  href: '/api-docs' },
    { label: 'ML Models',      href: '/ml-models' },
    { label: 'RL Models',      href: '/rl-models' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-950 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center">
                <MdScience className="text-white text-sm" />
              </div>
              <span className="font-semibold text-surface-900 dark:text-white text-sm">
                CloudRL<span className="text-primary-600">.</span>Research
              </span>
            </Link>
            <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed max-w-xs">
              A research platform for RL-based dynamic task scheduling and resource allocation in cloud environments.
            </p>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold text-surface-900 dark:text-white uppercase tracking-wider mb-3">
                {section}
              </h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="text-sm text-surface-500 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider mb-6" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-surface-400 dark:text-surface-500">
          <p>
            © 2024 CloudRL Research Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span>Paper: RL-Based Dynamic Task Scheduling</span>
            <Link
              to="/documentation"
              className="flex items-center gap-1 hover:text-primary-600 transition-colors"
            >
              Docs <HiOutlineExternalLink />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
