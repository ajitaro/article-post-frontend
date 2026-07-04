/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        surface: "#f6f7fb",
        brand: "#2563eb",
        coral: "#ef5b5b",
        mint: "#17a673"
      },
      boxShadow: {
        soft: "0 16px 40px rgba(23, 32, 51, 0.08)"
      }
    },
  },
  plugins: [],
};
