/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#05070a',
          900: '#07090e',
          850: '#0a0e16',
          800: '#0d121d',
          700: '#131b2a',
          600: '#1a2436',
          border: '#1e293b',
          borderHover: '#334155',
        },
        cyanGlow: {
          DEFAULT: '#06b6d4',
          dim: 'rgba(6, 182, 212, 0.15)',
          glow: 'rgba(6, 182, 212, 0.35)',
        },
        indigoGlow: {
          DEFAULT: '#6366f1',
          dim: 'rgba(99, 102, 241, 0.15)',
          glow: 'rgba(99, 102, 241, 0.35)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 30px -5px rgba(6, 182, 212, 0.25)',
        'glow-indigo': '0 0 30px -5px rgba(99, 102, 241, 0.25)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
