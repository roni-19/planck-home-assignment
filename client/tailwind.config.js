/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fit-card': 'repeat(auto-fill,minmax(262px,1fr))'
      },
      fontFamily: {
        'body': ['"Open Sans"']
      },
      colors: {
        purple: {
          80: "#7E6FFF",
          100: "#5F4CFF"
        },
        dark: {
          10:"#E8E7EA",
          20: "#D5D5D8",
          50: "#9D9D9F",
          80: "#646667",
          100: "#3F4142"
        },
        red: "#EA4545"
      }
    },

  },
  plugins: [],
}

