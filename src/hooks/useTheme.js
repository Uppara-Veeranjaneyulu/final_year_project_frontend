import { useState, useEffect } from 'react'

/**
 * useTheme — manages dark/light mode with localStorage persistence
 */
export function useTheme() {
  const [dark, setDark] = useState(() => {
    // Check localStorage or system preference
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  const toggle = () => setDark((d) => !d)

  return { dark, toggle, setDark }
}
