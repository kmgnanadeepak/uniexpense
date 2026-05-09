/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: 'var(--forest)',
        deep: 'var(--deep)',
        leaf: 'var(--leaf)',
        fresh: 'var(--fresh)',
        lime: 'var(--lime)',
        earth: 'var(--earth)',
        soil: 'var(--soil)',
        cream: 'var(--cream)',
        mist: 'var(--mist)',
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
