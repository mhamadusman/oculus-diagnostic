// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: '#015DA2', // Primary blue
        customRed: '#B91C1C',  // Primary red
        gradientStart: '#6EE7B7', // Gradient start (teal)
        gradientEnd: '#3B82F6',   // Gradient end (blue)
        softGray: '#F9FAFB',      // Soft background gray
        darkGray: '#1F2937',     // Dark text gray
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        poppin: ['Poppins', 'sans-serif'],
        jaro: ['Jaro', 'cursive'], // Add Jaro font
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};