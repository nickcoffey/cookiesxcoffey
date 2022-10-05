/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    // original theme
    // https://coolors.co/ccd5ae-e9edc9-fefae0-b98b82-e4959e
    colors: {
      primary: '#a6a6ff',
      darkprimary: '#6e6eff',
      lightprimary: '#c8c8fa',
      black: '#000000',
      white: '#ffffff',
      lightgrey: '#f5f5f5'
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif']
    },
    extend: {}
  },
  plugins: []
}
