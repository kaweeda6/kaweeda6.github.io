/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        // Core dark-teal palette (buttons, dark backgrounds, text)
        brand: {
          50:  '#e6faf9',
          100: '#c0f2ee',
          200: '#85e6de',
          300: '#4dd9d0',
          400: '#26cfc8',
          500: '#00cfc5',   // logo / primary brand cyan
          600: '#00a89e',
          700: '#007f78',
          800: '#005954',
          900: '#003633',
        },
        // Warm neutral sand
        sand: {
          50:  '#f8f7f4',
          100: '#efefe9',
          200: '#e4e4da',
        },
        // Gold accent (highlights, subtle dividers, secondary CTAs)
        gold: {
          50:  '#FFF8E6',
          100: '#FDEEC2',
          200: '#F9E08F',
          300: '#F2CB54',
          400: '#E8B22C',
          500: '#D4A62A',
          600: '#B48709',
          700: '#8F6B06',
          800: '#6B4F04',
          900: '#3F2E02',
        },
      },
      borderRadius: {
        xl2:  '1.25rem',
        pill: '9999px',
      },
      fontFamily: {
        display: ['Fraunces Variable', 'ui-serif', 'Georgia', 'serif'],
        sans:    ['DM Sans Variable', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
