/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './styles/globals.css'
  ],
  theme: {
    // original theme
    // https://coolors.co/ccd5ae-e9edc9-fefae0-b98b82-e4959e
    // current theme
    // https://coolors.co/57886c-466060-fcdfc1-dbb68f-bb7e5d
    colors: {
      primary: '#dbb68f',
      darkprimary: '#bb7e5d',
      lightprimary: '#fcdfc1',
      black: '#000000',
      white: '#ffffff'
    },
    fontFamily: {
      sans: ['The Seasons', 'serif'],
      bdscript: ['BD Script', 'cursive']
    }
  },
  plugins: []
}
