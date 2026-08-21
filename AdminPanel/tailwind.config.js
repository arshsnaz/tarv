/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F29F67',
          hover: '#e58b50',
          light: '#fef5ee',
          dark: '#c9773b'
        },
        dark: {
          DEFAULT: '#1E1E2C',
          card: '#1E1E2C',
          lighter: '#2A2A3D',
          border: '#3A3A52'
        },
        brand: {
          blue: '#3B8FF3',
          'blue-light': '#eff6ff',
          teal: '#34B1AA',
          'teal-light': '#ecfdf5',
          gold: '#E0B50F',
          'gold-light': '#fefce8',
          red: '#ef4444',
          'red-light': '#fef2f2'
        },
        app: {
          bg: '#F4F7FB',
          card: '#FFFFFF',
          border: '#E5E9F2',
          muted: '#8F9CAE',
          text: '#273142'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      },
      boxShadow: {
        card: '0 2px 12px 0 rgba(0, 0, 0, 0.04)',
        'card-hover': '0 4px 20px 0 rgba(0, 0, 0, 0.08)',
        modal: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }
    },
  },
  plugins: [],
}
