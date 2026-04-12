import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0F0C36",
        purple: "#8B89C2",
        yellow: "#FFEB95",
        teal: "#BCE4E7",
        gray: "#DBE1E9",
      },
      fontFamily: {
        display: ["Rayat", "sans-serif"],
        body: ["IBM Plex Sans Arabic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
