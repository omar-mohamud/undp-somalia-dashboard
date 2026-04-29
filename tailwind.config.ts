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
        "undp-dark": "#0468A0",
        ink: "#0A1628",
        muted: "#64748B",
        "muted-2": "#94A3B8",
        surface: "#FFFFFF",
        "surface-2": "#F8FAFC",
        "surface-3": "#F1F5F9",
        border: "#E2E8F0",
        "border-soft": "#E2E8F0",
        "border-hair": "#EEF2F7",
        success: "#059669",
        warning: "#D97706",
        danger: "#DC2626",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-newsreader)", "Georgia", "serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widerx: "0.14em",
        eyebrow: "0.16em",
      },
      fontSize: {
        eyebrow: ["11px", { lineHeight: "1", letterSpacing: "0.16em", fontWeight: "500" }],
        kpi: ["clamp(36px, 3.6vw, 52px)", { lineHeight: "1", letterSpacing: "-0.02em", fontWeight: "300" }],
        "kpi-lg": ["clamp(44px, 4.8vw, 72px)", { lineHeight: "0.95", letterSpacing: "-0.025em", fontWeight: "300" }],
        hero: ["clamp(64px, 7vw, 96px)", { lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: "300" }],
      },
      spacing: {
        "1.5": "6px",
        "2.5": "10px",
        "4.5": "18px",
      },
      borderRadius: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
