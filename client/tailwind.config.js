/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FCFAF7',
          100: '#FAF8F5',
          200: '#F4EFE6',
          300: '#EDE7DC',
          400: '#DFD8CC',
          500: '#D5CEBF'
        },
        forest: {
          900: '#142B1D',
          800: '#1B3826',
          700: '#22442D',
          600: '#2A4D37',
          500: '#3D6B4E'
        },
        ochre: {
          DEFAULT: '#8C6D37',
          light: '#D4A373',
          dark: '#735728'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}
