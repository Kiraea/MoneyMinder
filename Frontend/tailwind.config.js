/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          gray: '#FCFCFC',
          gold:  "#FFD700",
          green: "#3e9c35",
          bluegray: "#292A3F",
          bluegray2: "#1D1D2C"
        }
      }
    },
  },
  plugins: [],
}

