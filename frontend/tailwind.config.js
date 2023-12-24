/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      "620px": "620px",
      "800px": "800px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        beige: "#FCEEE8",
        pink: "#A91151",
        brown: "#AF4E24",
      },
      backgroundImage: {
        pattern: "url('assets/images/pngwing.com.png')",
        "pattern-small": "url('assets/images/pngwing-small.png')",
      },
    },
  },
  plugins: [],
};
