import styled from "@emotion/styled";

export const HeaderWrapper = styled("section")`
  display: flex;
  justify-content: flex-end;
  margin: 5px 0;
  button {
    margin-right: 10px;
  }
  button:last-of-type {
    margin-right: 0px;
  }
`;

export const AppBody = styled("section")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  text-align: center;
`;

export const Advice = styled("span")`
  width: 80%;
  background: rgba(0, 0, 0, 0.5);
  padding: 35px 15px;
  border-radius: 6px;
  margin: 25px 0;
  text-align: center;
  font-weight: bolder;
`;
