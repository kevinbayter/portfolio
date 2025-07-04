/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8B5CF6", // Modern purple
          dark: "#7C3AED",
          light: "#A78BFA",
          50: "#F5F3FF",
          100: "#EDE9FE",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95"
        },
        secondary: {
          DEFAULT: "#10B981", // Modern emerald
          dark: "#059669",
          light: "#34D399"
        },
        accent: {
          DEFAULT: "#F59E0B", // Modern amber
          dark: "#D97706",
          light: "#FCD34D"
        },
        dark: {
          DEFAULT: "#0F172A", // Very dark slate
          100: "#1E293B",
          200: "#334155",
          300: "#475569",
          400: "#64748B",
          500: "#94A3B8",
          600: "#CBD5E1",
          700: "#E2E8F0",
          800: "#F1F5F9",
          900: "#F8FAFC"
        },
        background: {
          DEFAULT: "#0F172A",
          light: "#1E293B",
          lighter: "#334155"
        },
        "card-bg": {
          DEFAULT: "#1E293B",
          light: "#334155",
          lighter: "#475569"
        },
        text: {
          primary: "#F8FAFC",
          secondary: "#CBD5E1",
          muted: "#94A3B8"
        }
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'card': '0 4px 20px rgba(139, 92, 246, 0.1)',
        'card-hover': '0 10px 30px rgba(139, 92, 246, 0.2)',
        'glow': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-lg': '0 0 40px rgba(139, 92, 246, 0.4)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'tech-pattern': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'modern-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #10B981 100%)',
        'card-gradient': 'linear-gradient(145deg, #1E293B 0%, #334155 100%)'
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      }
    },
  },
  plugins: [],
} 