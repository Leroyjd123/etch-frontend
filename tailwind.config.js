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
          text: "#000000",
          background: "#f1f5f0",
          primary: "#4cae4f",
          secondary: "#ffd95c",
          accent: "#f490b1",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          text: "#000000",
          background: "#f3f4f6",
          primary: "#61a6fa",
          secondary: "#85efac",
          accent: "#fbbd23",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

// colors: {
//   'text': '#000000',
//   'background': '#f3f4f6',
//   'primary': '#61a6fa',
//   'secondary': '#85efac',
//   'accent': '#fbbd23',
//  },

// colors: {
//   'text': '#000000',
//   'background': '#f1f5f0',
//   'primary': '#4cae4f',
//   'secondary': '#ffd95c',
//   'accent': '#f490b1',
//  }
