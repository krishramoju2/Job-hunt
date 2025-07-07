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
      colors: {
        blobBlue: '#BDE0FE',
        blobPurple: '#CDB4DB',
        blobPink: '#FFC8DD',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        blob: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        blob: 'blob 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
