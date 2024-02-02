/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        primary: '#0077B6',
        secondary: '#00B4D8',
        navActive: '#0083C9',
        darkFont: '#484848',
        formColor: '#848484',
        white: '#FFFFFF',
        navFont: '#F8F8F8',
        pageBackground: '#F2F2F2'
      }
    },
  },
  plugins: [],
}

