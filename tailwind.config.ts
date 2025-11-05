import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        eagle: {
          background: "hsl(var(--eagle-background))",
          foreground: "hsl(var(--eagle-foreground))",
          card: "hsl(var(--eagle-card))",
          "card-foreground": "hsl(var(--eagle-card-foreground))",
          popover: "hsl(var(--eagle-popover))",
          "popover-foreground": "hsl(var(--eagle-popover-foreground))",
          primary: "hsl(var(--eagle-primary))",
          "primary-foreground": "hsl(var(--eagle-primary-foreground))",
          secondary: "hsl(var(--eagle-secondary))",
          "secondary-foreground": "hsl(var(--eagle-secondary-foreground))",
          muted: "hsl(var(--eagle-muted))",
          "muted-foreground": "hsl(var(--eagle-muted-foreground))",
          accent: "hsl(var(--eagle-accent))",
          "accent-foreground": "hsl(var(--eagle-accent-foreground))",
          destructive: "hsl(var(--eagle-destructive))",
          "destructive-foreground": "hsl(var(--eagle-destructive-foreground))",
          border: "hsl(var(--eagle-border))",
          input: "hsl(var(--eagle-input))",
          ring: "hsl(var(--eagle-ring))",
        },
        "brand-bg-dark": "#0D1117", // Main background
        "brand-bg-light": "#161B22", // Card/surface background
        "brand-border": "#30363D", // Borders
        "brand-primary": "#58A6FF", // Primary blue for links, buttons
        "brand-cyan": "#39D3D7", // Accent cyan
        "brand-green": "#3FB950", // For positive changes
        "brand-red": "#F85149", // For negative changes
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "gradient-button":
          "linear-gradient(to right, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "glow-cyan":
          "0 0 20px rgba(57, 211, 215, 0.3), 0 0 40px rgba(57, 211, 215, 0.1)",
        "glow-yellow":
          "0 0 20px rgba(251, 191, 36, 0.3), 0 0 40px rgba(251, 191, 36, 0.1)",
        "glow-blue":
          "0 0 20px rgba(88, 166, 255, 0.3), 0 0 40px rgba(88, 166, 255, 0.1)",
        "glow-red":
          "0 0 20px rgba(248, 81, 73, 0.3), 0 0 40px rgba(248, 81, 73, 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;