import React from "react";
import styled from "@emotion/styled";
import theme from "./theme";

export type tag = "p" | "small" | "h1" | "h2" | "h3" | "h4";

export interface Text {
  tag: tag;
  variant?: tag;
  children: any;
}
const TextSetup: React.FC<Text> = (props) => {
  const Tag = props.tag;
  return <Tag {...props} />;
};

export const Text = styled(TextSetup)<Text>`
  font-size: ${(props) =>
    theme.fontSizes[props.variant ? props.variant : props.tag]};
  margin: 10px;
  padding: 0px;
`;
