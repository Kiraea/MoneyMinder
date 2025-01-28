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
          bluegray2: "#1D1D2C",
          bluegray3: "#3D3F5E",
          lightbluegray: "#bdbed4",
          lightpurple: "#d3d2ed",
          lightpurple2: "#ebeaf7",
          lightpurple3: "#c5c4e8",
          lightpurple4: "#f2f1fa",
          lightpurple5: "#bab7e3",
          purple: "#B1AFEF",
          purple2: "#51547D",
          purple3: "#65699C",
        }
      }
    },
  },
  plugins: [],
}

