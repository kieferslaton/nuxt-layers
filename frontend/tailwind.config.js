const themes = {
  Regional: {
    primary: "#234C5C",
    "primary-light": "#395E6D",
    "primary-lighter": "#5A7985",
    "primary-dark": "#1A3945",
    secondary: "#3DBDFF",
    "gray-lightest": "#F9F9F9",
    "gray-lighter": "#EEEEEE",
    "gray-light": "#C8D2D6",
    gray: "#707070",
    "gray-dark": "#333333",
    success: "#6DE093",
    accent: "#FA5F55",
    error: "#FA5F55",
  },
  "Town and Country": {
    primary: "#823331",
    "primary-light": "#BA5552",
    "primary-lighter": "#E16D5C",
    "primary-dark": "#5A1F1C",
    secondary: "#E1C16E",
    "gray-lightest": "#F9F9F9",
    "gray-lighter": "#EEEEEE",
    "gray-light": "#C8D2D6",
    gray: "#707070",
    "gray-dark": "#333333",
    success: "#6DE093",
    accent: "#FA5F55",
    error: "#FA5F55",
  },
};

const selectedTheme = process.env.THEME || "Regional";

module.exports = {
  content: [],
  theme: {
    fontFamily: {
      sans: ["neue-haas-grotesk-text", "serif"],
      serif: ["kepler-std", "serif"],
      script: ["Calaya", "script"],
      display: ["neue-haas-grotesk-display", "sans-serif"],
      "display-serif": ["kepler-std-display", "sans-serif"],
    },
    extend: {
      colors: {
        primary: themes[selectedTheme].primary,
        "primary-light": themes[selectedTheme]["primary-light"],
        "primary-lighter": themes[selectedTheme]["primary-lighter"],
        "primary-dark": themes[selectedTheme]["primary-dark"],
        secondary: themes[selectedTheme].secondary,
        "gray-lightest": themes[selectedTheme]["gray-lightest"],
        "gray-lighter": themes[selectedTheme]["gray-lighter"],
        "gray-light": themes[selectedTheme]["gray-light"],
        gray: themes[selectedTheme].gray,
        "gray-dark": themes[selectedTheme]["gray-dark"],
        success: themes[selectedTheme].success,
        accent: themes[selectedTheme].accent,
        error: themes[selectedTheme].error,
      },
      borderRadius: {
        sm: "3px",
      },
      padding: {
        row: "5vw",
        row2x: "10vw",
      },
      margin: {
        row: "5vw",
        row2x: "10vw",
      },
      gridTemplateColumns: {
        20: "repeat(20, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-18": "span 18 / span 18",
        "span-10": "span 10 / span 10",
        "span-2": "span 2 / span 2",
      },
      gridColumnStart: {
        2: "2",
        // add more if needed
      },
      gridColumnEnd: {
        // add as needed
      },
      gridColumnSpan: {
        // add as needed
      },
      screens: {
        tp: "600px",
        tl: "900px",
        d: "1200px",
        dl: "1600px",
      },
      container: {
        screens: {
          tl: "1065px",
        },
      },
    },
  },
  plugins: [],
};
