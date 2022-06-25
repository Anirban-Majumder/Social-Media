/** @type {import('tailwindcss').Config} */
module.exports = {
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
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
