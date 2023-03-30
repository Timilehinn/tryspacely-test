module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xxs: "375px",
      sm: "320px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      xxl: "1920px",
    },

    boxShadow: {
      "1fl": "0px 1px 0px rgba(20, 17, 21, 0.1)",
      "2fl":
        " 0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 16px rgba(51, 51, 51, 0.08)",
      "2xl": "(180deg, #F9DC5C -54.51%, #FA8AFF 169.01%)",
    },
    extend: {},
  },
  plugins: [require("tw-elements/dist/plugin")],
};
