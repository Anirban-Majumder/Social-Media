/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        twitter: '#0558FF',
        bordercolor: '#E5E7EB',
        boxcolor: '#F1F5F9',
        textgray: '#6b7280',
        darkgrey: '#121212',
        darkboxcolor: '#202326',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
