/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    // https://coolors.co/ccd5ae-e9edc9-fefae0-b98b82-e4959e
    colors: {
      darkgreen: '#ccD5ae',
      green: '#e9edc9',
      yellow: '#fefae0',
      darkpink: '#b98b82',
      pink: '#e4959e',
      black: '#000000',
      white: '#ffffff'
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif']
    },
    extend: {}
  },
  plugins: []
}
