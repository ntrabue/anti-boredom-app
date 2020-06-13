export type color = "background" | "text" | "good" | "bad" | "neutral";
const theme = {
  screens: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  fontFamily: {
    display: ["Gilroy", "sans-serif"],
    body: ["Graphik", "sans-serif"],
  },
  fontSizes: {
    small: "1rem",
    p: "1.5rem",
    h4: "2rem",
    h3: "2.8rem",
    h2: "3rem",
    h1: "3.2rem",
  },
  radius: {
    button: "8px",
  },
  borderWidth: {
    default: "1px",
    "0": "0",
    "2": "2px",
    "4": "4px",
  },
  colors: {
    background: {
      hex: "#3E207C",
    },
    text: {
      hex: "#FFF",
    },
    good: {
      hex: "#00C9A7",
    },
    neutral: {
      hex: "#B0A8B9",
    },
    bad: {
      hex: "#C34A36",
    },
  },
  spacing: {
    "96": "24rem",
    "128": "32rem",
  },
};

export default theme;
