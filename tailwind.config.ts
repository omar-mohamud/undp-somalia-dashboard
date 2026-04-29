import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        undp: "#006EB5",
        "undp-dark": "#005a94",
        ink: "#0A1628",
        muted: "#64748B",
        surface: "#FFFFFF",
        "surface-soft": "#F8FAFC",
        "border-soft": "#E2E8F0",
        "border-hair": "#EEF2F7",
        success: "#059669",
        warning: "#D97706",
        danger: "#DC2626",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-newsreader)", "Georgia", "serif"],
      },
      letterSpacing: {
        widerx: "0.14em",
      },
      fontSize: {
        hero: ["clamp(72px, 11vw, 144px)", { lineHeight: "0.95", letterSpacing: "-0.04em", fontWeight: "300" }],
        kpi: ["clamp(40px, 4.2vw, 56px)", { lineHeight: "1", letterSpacing: "-0.02em", fontWeight: "300" }],
      },
    },
  },
  plugins: [],
};

export default config;
