/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      //   colors: {
      //     primary: {
      //       DEFAULT: "#38BDF8",
      //       dark: "#0284C7",
      //       light: "#7DD3FC",
      //     },
      //     secondary: {
      //       DEFAULT: "#0F172A",
      //       dark: "#0F172A",
      //       light: "#334155",
      //     },
      //     success: {
      //       DEFAULT: "#22C55E",
      //       dark: "#16A34A",
      //       light: "#4ADE80",
      //     },
      //     warning: {
      //       DEFAULT: "#F59E0B",
      //       dark: "#D97706",
      //       light: "#FBBF24",
      //     },
      //     error: {
      //       DEFAULT: "#EF4444",
      //       dark: "#DC2626",
      //       light: "#F87171",
      //     },
      //     role: {
      //       admin: "#1890ff", // blue
      //       staff: "#52c41a", // green
      //       document_manager: "#722ed1", // purple
      //       franchise: "#fa8c16", // orange
      //       marketing: "#eb2f96", // pink
      //       reporting: "#13c2c2", // cyan
      //       reservationist: "#2f54eb", // geekblue
      //       products: "#faad14", // gold
      //       user_manager: "#a0d911", // lime
      //     },
      //     status: {
      //       active: "#52c41a", // green
      //       inactive: "#f5222d", // red
      //       suspended: "#fa8c16", // orange
      //     },
      //   },
      //   fontFamily: {
      //     sans: ["Inter", "sans-serif"],
      //   },
      //   boxShadow: {
      //     card: "0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      //     dropdown: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      //   },
    },
  },
  plugins: [],
  // This ensures Tailwind's classes take precedence over Ant Design's default styles
  important: true,
};
