import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        yello: {
          50: "#fffdf0",
          100: "#fff9c2",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          DEFAULT: "#FFCC00",
        },
        telecel: {
          500: "#E60000",
          600: "#CC0000",
          DEFAULT: "#E60000",
        },
        airteltigo: {
          500: "#0066CC",
          600: "#004C99",
          DEFAULT: "#0066CC",
        },
      },
    },
  },
  plugins: [],
};
export default config;
