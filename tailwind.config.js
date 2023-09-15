/** @type {import('tailwindcss').Config} */
export default {
  content: [
      './index.html',
      './src/**/*.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
        starwars: ['"News Cycle"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

