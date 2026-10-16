import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        signature: ['Great Vibes', 'cursive'],
      },
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
        cream: "hsl(var(--cream))",
        "warm-beige": "hsl(var(--warm-beige))",
        taupe: "hsl(var(--taupe))",
        "dusty-rose": "hsl(var(--dusty-rose))",
        "warm-brown": "hsl(var(--warm-brown))",
        "soft-gold": "hsl(var(--soft-gold))",
        // Values live in src/index.css (light and .dark), so every journal-* class follows the theme
        "journal-bg": "rgb(var(--journal-bg) / <alpha-value>)",
        "journal-bg-secondary": "rgb(var(--journal-bg-secondary) / <alpha-value>)",
        "journal-card": "rgb(var(--journal-card) / <alpha-value>)",
        "journal-text": "rgb(var(--journal-text) / <alpha-value>)",
        "journal-text-secondary": "rgb(var(--journal-text-secondary) / <alpha-value>)",
        "journal-muted": "rgb(var(--journal-muted) / <alpha-value>)",
        "journal-gold": "rgb(var(--journal-gold) / <alpha-value>)",
        "journal-champagne": "rgb(var(--journal-champagne) / <alpha-value>)",
        "journal-border": "rgb(var(--journal-border) / <alpha-value>)",
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
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "slide-in-right": "slide-in-right 0.6s ease-out forwards",
      },
      spacing: {
        "section": "clamp(4rem, 10vw, 8rem)",
      },
      typography: {
        journal: {
          css: {
            maxWidth: '42rem',
            fontSize: 'clamp(1.05rem, 2.5vw, 1.15rem)',
            lineHeight: '1.85',
          },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
