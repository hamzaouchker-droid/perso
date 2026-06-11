import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#E8EBF0",
          100: "#C5CCD9",
          200: "#9DAABE",
          300: "#6E7FA0",
          400: "#4A5D88",
          500: "#263C6E",
          600: "#1B2F58",
          700: "#132245",
          800: "#0D1830",
          900: "#0A1628",
        },
        gold: {
          50: "#FDF8EC",
          100: "#F9EDD0",
          200: "#F3DBA0",
          300: "#ECCC73",
          400: "#D9B44D",
          500: "#C9A84C",
          600: "#B8913A",
          700: "#9A7530",
          800: "#7D5C28",
          900: "#5E4520",
        },
      },
    },
  },
  plugins: [],
};

export default config;
