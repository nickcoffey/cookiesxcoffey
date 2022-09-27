/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    // https://coolors.co/ccd5ae-e9edc9-fefae0-b98b82-e4959e
    colors: {
      background: '#fefae0'
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif']
    },
    extend: {}
  },
  plugins: []
}
