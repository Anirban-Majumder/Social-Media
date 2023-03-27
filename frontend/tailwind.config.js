/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        twitter: '#0558FF',
        bordercolor: '#E5E7EB',
        boxcolor: '#F1F5F9',
        textgray: '#8A8A8A',
        darkgrey: '#121212',
        darkboxcolor: '#202326',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
