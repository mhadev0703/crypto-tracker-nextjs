import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0fbcf9',
        secondary: '#9c88ff',
        positive: 'green',
        negative: 'red',
        lightBg: '#ffffff',
        darkBg: '#2f3640',
        lightText: '#000000',
        darkText: '#ffffff',
      }
    },
  },
  plugins: [],
};
export default config;
