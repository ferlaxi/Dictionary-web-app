/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dwa-dark": "#050505",
        "dwa-semidark": "#1F1F1F",
        "dwa-lightdark": "#2D2D2D",
        "dwa-gray": "#3A3A3A",
        "dwa-semigray": "#757575",
        "dwa-lightgray": "#E9E9E9",
        "dwa-lightgray-strong": "#F4F4F4",
        "dwa-violet": "#A445ED",
        "dwa-red": "#FF5252"
      },
      fontFamily: {
        'sans-serif': ['Inter', 'system-ui'],
        'serif': ['Lora', 'Georgia'],
        'mono': ['Inconsolata', 'mono']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  darkMode: 'class',
}

