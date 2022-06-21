/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        hightlight:'#FF000'

      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
