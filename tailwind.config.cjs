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
          50:  '#f2fbf9',
          100: '#e6f7f4',
          200: '#c2ede6',
          300: '#9edfd8',
          400: '#7ad2ca',
          500: '#5cc9be',   // Vibrant mint teal from user screenshot
          600: '#48b5ab',
          700: '#3a928a',
          800: '#2e756e',
          900: '#1d4a47',
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
