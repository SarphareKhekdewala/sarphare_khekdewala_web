import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ffe6e6',
          100: '#ffb3b3',
          200: '#ff8080',
          300: '#ff4d4d',
          400: '#ff1a1a',
          500: '#e60000',
          600: '#b30000',
          700: '#800000',
          800: '#4d0000',
          900: '#4A0E0E', // Dark maroon from brand
        },
        accent: {
          50: '#fff7e6',
          100: '#ffebcc',
          200: '#ffdfb3',
          300: '#ffd399',
          400: '#ffc780',
          500: '#FF9966', // Brand orange
          600: '#ff8040',
          700: '#ff6619',
          800: '#e64d00',
          900: '#cc4400',
        },
        yellow: {
          DEFAULT: '#FFFF00', // Brand yellow
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
