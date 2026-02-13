import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      spacing: {
        160: "40rem",
        76: "19rem",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "var(--font-inter)", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [typography],
};

export default config;
