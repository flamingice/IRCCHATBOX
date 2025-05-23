/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBlue: '#09090b',
        'gray-950': '#27272a'
      }
    }
  },
  plugins: []
};
