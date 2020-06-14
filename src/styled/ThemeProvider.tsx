import { css, Global } from "@emotion/core";
import React from "react";
import {
  theme as chakraTheme,
  ThemeProvider as ChakraThemeProvider,
  CSSReset,
} from "@chakra-ui/core";
export type color = "background" | "text" | "good" | "bad" | "neutral";

export const theme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    brand: {
      background: "#3E207C",
      text: "#FFF",
      good: "#00C9A7",
      neutral: "#B0A8B9",
      bad: "#C34A36",
    },
  },
};

interface ThemeProvider {
  children: JSX.Element | JSX.Element[];
}
const ThemeProvider: React.FC<ThemeProvider> = ({ children }) => {
  return (
    <ChakraThemeProvider theme={theme}>
      <CSSReset />
      <Global
        styles={css`
          body {
            max-width: 90%;
            margin-left: auto;
            margin-right: auto;
            background-color: ${theme.colors.brand.background};
            color: ${theme.colors.brand.text};
          }

          section[role="dialog"] {
            padding: 20px;
            color: ${theme.colors.brand.background};
          }
        `}
      />
      {children}
    </ChakraThemeProvider>
  );
};

export default React.memo(ThemeProvider);
