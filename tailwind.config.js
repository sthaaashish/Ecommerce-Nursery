const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Arima: ["Arima", "sans-serif"],
        Lato: ["Lato", "sans"],
        Poppins:["Poppins", "sans"]
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden",
          },
          "100%": {
            width: "100%",
          },
        },
      },
      animation: {
        typing: "typing 2s steps(20) infinite alternate",
      },
    },
    screens: {
      xs: "550px",
      md: "750px",
      xl: "1180px",
      "2xl": "1280px",
    },
  },
  plugins: [],
});

