/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "secondary-blue": "#C0D7EA",
        "sec-2-blue": "#FBFBFB",
        "main-blue": "#0C3954",
      },
      fontFamily: {
        sulphurPoint: ["Sulphur Point", "sans-serif"],
      },
    },
  },
  plugins: [],
};
