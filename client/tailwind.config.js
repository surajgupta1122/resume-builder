/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
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
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-out backwards",
        "scale-in": "scale-in 0.2s ease-out backwards",
        "page-in": "page-in 0.3s ease-out backwards",
        toast:
          "toast-in 0.3s ease-out backwards, toast-out 0.3s ease-in 3.2s forwards",
      },
    },
  },
  plugins: [],
};