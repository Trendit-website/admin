import type { Config } from "tailwindcss";
import bgPattern from "./public/assets/Background pattern decorative.png";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        // "bg-pattern": `${bgPattern}`
      },
      fontFamily: {
        RedHat: ["RedHat", "sans-serif"],
      },
      colors: {
        "primary-black": "#101828",
        main: "#CB29BE",
        secondary: "#475367",
      },
      borderColor: {
        "primary-border": "#E4E7EC",
      },
    },
  },
  plugins: [],
};
export default config;
