import styled from "@emotion/styled";
import theme, { color } from "./theme";
import { tag } from "./Text";

interface Button {
  size: tag;
  background: color;
}
const Button = styled("button")<Button>`
  display: flex;
  align-items: center;
  font-size: ${({ size }) => theme.fontSizes[size]};
  background: ${({ background }) => theme.colors[background].hex};
  border-radius: ${theme.radius.button};
  border-color: ${({ background }) => theme.colors[background].hex};
  color: ${theme.colors.text.hex};
  font-weight: bold;
  cursor: pointer;
  min-height: 50px;

  svg {
    margin-right: 5px;
  }
`;
export { Button };
