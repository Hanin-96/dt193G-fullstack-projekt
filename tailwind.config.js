/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'dark-green': '#004200',
        'light-green': '#9BBF9B',
        'light-yellow': '#FFDE83',
        'orange': '#FC8053',
        'dark-grey-text': '#353535'
      }
    },
  },
  plugins: [],
}

