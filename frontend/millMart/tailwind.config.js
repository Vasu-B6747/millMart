// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Include the right paths
    ],
    theme: {
      extend: {
        // colors:{
        //   BgColor:'var(--color-BgColor)',
        //   TextColor:'var(--color-TextColor)'
        // }
      },
    },
    plugins: [],
  }
  