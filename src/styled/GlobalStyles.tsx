import { css, Global } from "@emotion/core";
import React from "react";
import theme from "./theme";

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        html {
          background-color: ${theme.colors.background.hex};
          color: ${theme.colors.text.hex};
          font-size: ${theme.fontSizes.p};
        }
        body {
          width: 90%;
          display: flex;
          flex-direction: column;
          margin-right: auto;
          margin-left: auto;
        }
      `}
    />
  );
};

export default React.memo(GlobalStyles);
