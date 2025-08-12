/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light mode colors
        "light-bg": "#f8fafc",
        "lighter-bg": "#ffffff",
        "accent-blue": "#2563eb",
        "light-blue": "#3b82f6",
        "electric-blue": "#1e40af",
        "cyan-blue": "#0ea5e9",
        "light-gray": "#f1f5f9",
        "lighter-gray": "#f8fafc",
        "text-primary": "#1e293b",
        "text-secondary": "#475569",
        "text-muted": "#64748b",
        // Dark mode colors
        "dark-bg": "#0f172a",
        "darker-bg": "#020617",
        "dark-surface": "#1e293b",
        "dark-surface-light": "#334155",
        "dark-text-primary": "#f1f5f9",
        "dark-text-secondary": "#cbd5e1",
        "dark-text-muted": "#94a3b8",
        "dark-accent-blue": "#3b82f6",
        "dark-light-blue": "#60a5fa",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.8s ease-out",
        "slide-in-left": "slideInLeft 0.8s ease-out",
        "slide-in-right": "slideInRight 0.8s ease-out",
        "scale-in": "scaleIn 0.6s ease-out",
        float: "float 6s ease-in-out infinite",
        typing: "typing 4s steps(17, end) forwards",
        blink: "blink 1s infinite",
        "section-fade-in": "sectionFadeIn 0.6s ease-out forwards",
        "bounce-in": "bounceIn 0.8s ease-out",
        "rotate-in": "rotateIn 0.8s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        bounceIn: {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        rotateIn: {
          "0%": { opacity: "0", transform: "rotate(-200deg)" },
          "100%": { opacity: "1", transform: "rotate(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
      },
    },
  },
};
