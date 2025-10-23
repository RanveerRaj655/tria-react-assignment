/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonBlue: '#00FFFF',
        neonPink: '#FF00FF',
        neonGreen: '#39FF14',
        darkBg: '#0A0A0A',
      },
      boxShadow: {
        neon: '0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 40px #00FFFF',
      },
    },
  },
  plugins: [
  ],
}