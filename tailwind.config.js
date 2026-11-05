/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#ffffff',
        panel: '#ffffff',
        line: '#e2e5f1',
        brand: { 400: '#ff8c00', 500: '#ff8c00', 600: '#e67e00' },
        // Violet is replaced by dark orange (#ff8c00) across the site
        violet: {
          50: '#fff7ea', 100: '#ffeacc', 200: '#ffd299', 300: '#ffb84d', 400: '#ff9f1a',
          500: '#ff8c00', 600: '#ff8c00', 700: '#cc7000', 800: '#a35a00', 900: '#7a4300',
        },
        accent: '#e67e00',
        // Blues are replaced by dark orange too
        ...Object.fromEntries(['sky', 'blue', 'indigo', 'cyan'].map((n) => [n, {
          50: '#fff7ea', 100: '#ffeacc', 200: '#ffd299', 300: '#ffb84d', 400: '#ff9f1a',
          500: '#ff8c00', 600: '#ff8c00', 700: '#cc7000', 800: '#a35a00', 900: '#7a4300',
        }])),
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: { float: 'float 6s ease-in-out infinite', marquee: 'marquee 40s linear infinite' },
    },
  },
  plugins: [],
};
