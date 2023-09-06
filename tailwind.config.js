/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#FF6D00",
                  
          "secondary": "#FF9201",
                  
          "accent": "#FFAB41",
                  
          "neutral": "#292524",
                  
          "base-100": "#FFD181",
                  
          "info": "#2563eb",
                  
          "success": "#059669",
                  
          "warning": "#facc15",
                  
          "error": "#b91c1c",
        },
      },
    ],
    extend: {},
  },
  plugins: [require("daisyui")],
};
