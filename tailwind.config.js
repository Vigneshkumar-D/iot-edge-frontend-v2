/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        "primary-foreground": "#ffffff",

        success: "#22c55e",
        "success-foreground": "#ffffff",

        warning: "#facc15",
        "warning-foreground": "#000000",

        destructive: "#ef4444",
        "destructive-foreground": "#ffffff",

        secondary: "#e5e7eb",
        "secondary-foreground": "#111827",

        background: "#ffffff",
        foreground: "#000000",

        accent: "#f3f4f6",
        "accent-foreground": "#1f2937",

        border: "#d1d5db",

        ring: "#c7d2fe",
      },
      stroke:{
        secondary: "blue"
      },
      border:{
        secondary:"blue"
    },
  },
  plugins: [],
}};