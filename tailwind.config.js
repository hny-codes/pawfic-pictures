/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        dogHero: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeInOut: {
          '0%, 100%': { opacity: 0 },
          '10%, 90%': { opacity: 1 },
        },
      },
      animation: {
        dogHero: 'dogHero 1s ease-in forwards',
        notif: 'fadeInOut 5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
