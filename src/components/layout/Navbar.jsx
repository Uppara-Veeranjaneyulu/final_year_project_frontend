import { useState, useEffect } from 'react'
import { Link, useLocation, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlineMenuAlt3, HiOutlineX,
  HiOutlineSun, HiOutlineMoon,
  HiOutlineChevronDown,
  HiOutlineExternalLink,
} from 'react-icons/hi'
import { MdScience } from 'react-icons/md'
import { useTheme } from '../../hooks/useTheme'
import { checkBackendHealth } from '../../api/client'

const NAV_LINKS = [
  { label: 'Home',        href: '/' },
  { label: 'About',       href: '/about' },
  { label: 'Research',    href: '/research-paper' },
  { label: 'Docs',        href: '/documentation' },
  {
    label: 'Explore',
    children: [
      { label: 'Dataset Library',     href: '/datasets',       icon: '🗄️' },
      { label: 'Data Visualization',  href: '/visualization',  icon: '📊' },
      { label: 'ML Models',           href: '/ml-models',      icon: '🤖' },
      { label: 'RL Models',           href: '/rl-models',      icon: '🎯' },
    ],
  },
  {
    label: 'Platform',
    children: [
      { label: 'Training Dashboard',  href: '/training',       icon: '⚡' },
      { label: 'Results',             href: '/results',         icon: '📈' },
      { label: 'Experiments',         href: '/experiments',    icon: '🧪' },
      { label: 'API Docs',            href: '/api-docs',       icon: '🔌' },
    ],
  },
  { label: 'Blog',        href: '/blog' },
  { label: 'Team',        href: '/team' },
]

function DropdownMenu({ items, isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.15 }}
          className="absolute top-full left-0 mt-1 w-52 card shadow-card-lg z-50 py-1"
        >
          {items.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-50 dark:hover:bg-surface-800'
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [backendStatus, setBackendStatus] = useState('checking')
  const [scrolled, setScrolled] = useState(false)
  const { dark, toggle } = useTheme()
  const location = useLocation()

  // Poll backend health status
  useEffect(() => {
    let isMounted = true
    const check = async () => {
      const res = await checkBackendHealth()
      if (isMounted) {
        setBackendStatus(res && (res.status === 'healthy' || res.status === 'ok') ? 'online' : 'offline')
      }
    }
    check()
    const interval = setInterval(check, 10000)
    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [location.pathname])

  // Scroll detect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 dark:bg-surface-950/90 backdrop-blur-md border-b border-surface-200/80 dark:border-surface-800/80 shadow-sm'
          : 'bg-white dark:bg-surface-950 border-b border-surface-200 dark:border-surface-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center flex-shrink-0">
            <MdScience className="text-white text-sm" />
          </div>
          <span className="font-semibold text-surface-900 dark:text-white text-sm hidden sm:block">
            CloudRL<span className="text-primary-600">.</span>Research
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="btn-ghost text-sm gap-1 py-1.5">
                  {link.label}
                  <HiOutlineChevronDown className={`text-xs transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                </button>
                <DropdownMenu items={link.children} isOpen={openDropdown === link.label} />
              </div>
            ) : (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `btn-ghost text-sm py-1.5 ${isActive ? 'text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/20' : ''}`
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Paper Link */}
          <Link
            to="/research-paper"
            className="hidden sm:flex btn-ghost text-sm py-1.5 gap-1.5"
          >
            <HiOutlineExternalLink className="text-xs" />
            Paper
          </Link>

          {/* Backend Status Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800">
            <span className={`w-2 h-2 rounded-full ${backendStatus === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-red-400'}`}></span>
            <span className="text-surface-600 dark:text-surface-300">
              {backendStatus === 'online' ? 'Flask API' : 'Backend Offline'}
            </span>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggle}
            className="btn-ghost p-2 rounded-lg"
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? (
              <HiOutlineSun className="text-surface-500 dark:text-surface-400 text-base" />
            ) : (
              <HiOutlineMoon className="text-surface-500 text-base" />
            )}
          </button>

          {/* Try Model CTA */}
          <Link to="/training" className="btn-primary btn-sm hidden sm:flex">
            Try Model
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden btn-ghost p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen
              ? <HiOutlineX className="text-lg" />
              : <HiOutlineMenuAlt3 className="text-lg" />
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-950 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-surface-400 px-3 py-2">
                      {link.label}
                    </p>
                    {link.children.map((child) => (
                      <NavLink
                        key={child.href}
                        to={child.href}
                        className={({ isActive }) =>
                          `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
                        }
                      >
                        <span>{child.icon}</span>
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                ) : (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    className={({ isActive }) =>
                      `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
                    }
                  >
                    {link.label}
                  </NavLink>
                )
              )}
              <div className="pt-2 border-t border-surface-100 dark:border-surface-800">
                <Link to="/training" className="btn-primary w-full justify-center">
                  Try Model
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
