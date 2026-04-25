/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          100: 'rgb(var(--color-brand-100) / <alpha-value>)',
          300: 'rgb(var(--color-brand-300) / <alpha-value>)',
          500: 'rgb(var(--color-brand-500) / <alpha-value>)',
          700: 'rgb(var(--color-brand-700) / <alpha-value>)',
          900: 'rgb(var(--color-brand-900) / <alpha-value>)',
        },
        canvas: 'rgb(var(--color-canvas) / <alpha-value>)',
        panel: 'rgb(var(--color-panel) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 18px 45px rgba(49, 60, 69, 0.08)',
      },
      backgroundImage: {
        'campus-fade':
          'radial-gradient(circle at top center, rgba(201, 221, 244, 0.95), transparent 38%), radial-gradient(circle at left 16%, rgba(214, 230, 247, 0.9), transparent 30%), radial-gradient(circle at right 20%, rgba(205, 225, 245, 0.82), transparent 30%), radial-gradient(circle at bottom center, rgba(226, 237, 248, 0.72), transparent 34%), linear-gradient(180deg, rgba(244,248,253,1) 0%, rgba(230,240,249,1) 44%, rgba(240,246,252,1) 72%, rgba(247,249,251,1) 100%)',
      },
    },
  },
  plugins: [],
};
