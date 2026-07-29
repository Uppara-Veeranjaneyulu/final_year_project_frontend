/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // Primary blue accent
        primary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // Gray scale
        surface: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)',
        'card-hover': '0 4px 12px 0 rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.06)',
        'card-lg': '0 10px 30px 0 rgb(0 0 0 / 0.08)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.surface.700'),
            a: {
              color: theme('colors.primary.600'),
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            },
            'h1, h2, h3, h4': {
              color: theme('colors.surface.900'),
              fontWeight: '600',
            },
            code: {
              color: theme('colors.primary.700'),
              backgroundColor: theme('colors.primary.50'),
              borderRadius: '0.25rem',
              padding: '0.1em 0.3em',
              fontWeight: '500',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          },
        },
        dark: {
          css: {
            color: theme('colors.surface.300'),
            'h1, h2, h3, h4': { color: theme('colors.surface.50') },
            a: { color: theme('colors.primary.400') },
            code: {
              color: theme('colors.primary.300'),
              backgroundColor: theme('colors.surface.800'),
            },
          },
        },
      }),
    },
  },
  plugins: [],
}
