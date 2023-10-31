/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#00B1F4",
        primaryColorHover: "#28C4FF",
        secondaryColor: "#ffffff",
        black: "#000000",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
