/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "page-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "toast-in": {
          from: { opacity: "0", transform: "translateX(24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "toast-out": { from: { opacity: "1" }, to: { opacity: "0" } },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        draw: {
          "0%": { strokeDashoffset: "1", opacity: "0" },
          "1%": { opacity: "1" },
          "100%": { strokeDashoffset: "0", opacity: "1" },
        },
        grow: {
          from: { transform: "scaleX(0)", opacity: "0" },
          to: { transform: "scaleX(1)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-out backwards",
        "scale-in": "scale-in 0.2s ease-out backwards",
        "page-in": "page-in 0.3s ease-out backwards",
        toast:
          "toast-in 0.3s ease-out backwards, toast-out 0.3s ease-in 3.2s forwards",
        float: "float 6s ease-in-out infinite",
        draw: "draw 0.6s ease-out both",
        grow: "grow 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};