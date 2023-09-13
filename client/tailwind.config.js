/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#373d3f",
        secondary: "#1796E3",
        heading: "#101010",
        light: "#A0AEC0",
        "light-bg": "#F5F5F7",
        "light-secondary": "#E2E8F0",
        success: "#519330",
        alert: "#F32626",
        warning: "#F59A31",
      },
    },
  },
  plugins: [],
};
