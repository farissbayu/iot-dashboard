/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0077B6',
        secondary: '#00B4D8',
        navHover: '#0083C9',
        darkFont: '#484848',
        formColor: '#848484',
        white: '#FFFFFF',
      }
    },
  },
  plugins: [],
}

