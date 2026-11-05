/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lapland: {
          forest: '#1B3E2B',
          'forest-hover': '#143122',
          'forest-dark': '#0E2419',
          ivory: '#FAF8F5',
          cream: '#F4F1EA',
          linen: '#EBE7DE',
          gold: '#C49A5A',
          'gold-light': '#D6B47C',
          charcoal: '#18221D',
          muted: '#525E57',
          border: '#E8E5DE',
          'border-light': '#F0EDE6'
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Newsreader', 'Cormorant Garamond', 'serif'],
      }
    },
  },
  plugins: [],
}
