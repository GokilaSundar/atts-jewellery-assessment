/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        disableButton: "#88C2BB",
        enableButton: "#246b63",
      },
    },
  },
  plugins: [],
};
