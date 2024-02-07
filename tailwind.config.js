/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      'custom-color': 'rgb(78, 101, 122)',
    },
  },
  },
  plugins: [],
}

