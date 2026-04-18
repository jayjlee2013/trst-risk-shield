/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#eef2f7',
          100: '#d5e0ed',
          200: '#abbfd9',
          300: '#7a9bbf',
          400: '#4f7aa8',
          500: '#2d5f91',
          600: '#1e4a75',
          700: '#163759',
          800: '#0f2744',
          900: '#091a30',
        },
        gold: {
          300: '#e8c97a',
          400: '#d4a853',
          500: '#c9a84c',
          600: '#b8922d',
        },
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
