/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#4cae4f", // Keeping this as the main accent color for continuity
          secondary: "#e0d4ae", // A softer, earthy tone that complements the primary color
          accent: "#a8dadc", // A calm, reflective blue that suggests serenity
          neutral: "#f5f5f5", // A very light grey for backgrounds that need a subtle differentiation
          background: "#ffffff", // Pure white for a clean, uncluttered background
          text: "#333333", // Darker grey for text, offering better readability without harsh contrast
          info: "#3498db", // A soothing blue for informational messages
          success: "#2ecc71", // A refreshing green, slightly softer than the primary color
          warning: "#f1c40f", // A muted yellow for warnings, catching attention without alarming
          error: "#e74c3c", // A soft red for errors, visible but not overly stark
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#4cae4f", // Retained from the light theme for brand consistency
          secondary: "#b8a07e", // A warm, muted tone that pairs well with the primary in a dark background
          accent: "#62959c", // A darker, subdued blue for accents that require less prominence
          neutral: "#2c2c2c", // A dark grey, great for slightly elevated UI elements like cards or modals
          background: "#121212", // A deep grey that reduces eye strain and saves screen energy on OLED screens
          text: "#e0e0e0", // A light grey for text, ensuring good readability against dark backgrounds
          info: "#5dade2", // A brighter blue against dark backgrounds for informational elements
          success: "#27ae60", // A green that stands out against the dark background for success states
          warning: "#f39c12", // A golden yellow that captures attention for warnings without being too bright
          error: "#c0392b", // A darker red for errors, ensuring visibility without harshness
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
