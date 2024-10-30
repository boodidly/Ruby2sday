/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    {
      pattern: /bg-(emerald|blue|indigo|purple|pink|rose|orange|amber|yellow|lime|green|teal|cyan)-(400|500|600)/,
    },
    {
      pattern: /text-(emerald|blue|indigo|purple|pink|rose|orange|amber|yellow|lime|green|teal|cyan)-(400|500|600)/,
    },
    {
      pattern: /ring-(emerald|blue|indigo|purple|pink|rose|orange|amber|yellow|lime|green|teal|cyan)-(400|500|600)/,
    },
    {
      pattern: /border-(emerald|blue|indigo|purple|pink|rose|orange|amber|yellow|lime|green|teal|cyan)-(400|500|600)/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};