import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        // "bg-pattern": `${bgPattern}`
      },
      backgroundColor: {
        customPurple: "#CB29BE",
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
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
