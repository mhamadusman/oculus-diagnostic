module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: '#015DA2', // Add custom color
        customRed: '#B91C1C',  // Add another custom color
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        poppin: ['Poppins', 'sans-serif']
      },
    },
  },
  plugins: [],
}
