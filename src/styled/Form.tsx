import styled from "@emotion/styled";
import theme from "./theme";

export const Label = styled("label")`
  input[type="text"],
  select {
    display: block;
    width: 80%;
  }
`;

export const Input = styled("input")`
  font-size: ${theme.fontSizes.small};
  margin: 5px 0;
  height: 45px;
`;

export const Select = styled("select")`
  font-size: ${theme.fontSizes.small};
  margin: 5px 0;
  height: 45px;
  padding: 1px 2px;
`;

export const FormActions = styled("div")`
  display: flex;
  button:first-of-type {
    margin-left: 0px;
  }
  button {
    margin: 10px;
  }
`;

export const Form = styled("form")`
  display: flex;
  flex-direction: column;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
`;
