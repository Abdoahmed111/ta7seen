import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        elmessiri: ["ElMessiri", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: ["forest"],
  },
  plugins: [require("daisyui")],
} satisfies Config;
