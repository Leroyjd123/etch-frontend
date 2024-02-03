/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
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