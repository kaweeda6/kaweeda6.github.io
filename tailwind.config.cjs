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
        // Body text
        ink: '#1a1f1e',
        // Warm neutral sand
        sand: {
          50:  '#f8f7f4',
          100: '#efefe9',
          200: '#e4e4da',
        },
        // Gold accent (eyebrow labels on light backgrounds)
        gold: {
          700: '#8F6B06',
        },
      },
      boxShadow: {
        card:       '0 2px 12px rgba(0,0,0,0.05)',
        'card-hover': '0 16px 48px rgba(0,0,0,0.10)',
        float:      '0 4px 24px rgba(0,0,0,0.07)',
        dropdown:   '0 8px 40px rgba(0,0,0,0.12)',
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
