module.exports = {
  content: [
    "./pages/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
  purge: [
    './pages/**/*.js',
    './pages/*.js',
    './components/**/*.js',
    './components/*.js'
  ]
}
