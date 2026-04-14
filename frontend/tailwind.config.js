/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cocoa: '#1a0a00',
        caramel: '#6b3a2a',
        gold: '#c8973a',
        'gold-hover': '#e6b24d',
        cream: '#fdf6ec',
        'cream-muted': '#f5ebe0',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

