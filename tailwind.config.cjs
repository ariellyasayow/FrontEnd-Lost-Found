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
          'radial-gradient(circle at top center, rgba(183, 210, 240, 0.98), transparent 34%), radial-gradient(circle at left 14%, rgba(198, 220, 244, 0.92), transparent 28%), radial-gradient(circle at right 16%, rgba(191, 214, 241, 0.88), transparent 28%), radial-gradient(circle at center 82%, rgba(214, 229, 246, 0.78), transparent 30%), radial-gradient(circle at bottom center, rgba(225, 236, 248, 0.74), transparent 34%), linear-gradient(180deg, rgba(239,245,252,1) 0%, rgba(226,238,249,1) 38%, rgba(232,241,250,1) 68%, rgba(243,247,252,1) 100%)',
      },
    },
  },
  plugins: [],
};
