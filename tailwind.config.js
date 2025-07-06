/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: 'var(--font-inter)',
        dancing: 'var(--font-dancing)',
        lobster: 'var(--font-lobster)',
        pacifico: 'var(--font-pacifico)',
      },
    },
  },
  plugins: [],
};
