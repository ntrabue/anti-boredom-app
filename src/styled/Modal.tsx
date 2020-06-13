import React from "react";
import styled from "@emotion/styled";
import theme from "./theme";

const ModalBackground = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled("div")`
  z-index: 2;
  justify-self: center;
  max-width: 75%;
  max-height: 75%;
  padding: 10px 15px;
  margin: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 3px;
  color: ${theme.colors.background.hex};
  overflow-y: scroll;
  overflow-x: hidden;
`;

interface ModalProps {
  visible: boolean;
  children: JSX.Element;
  handleClose: () => void;
  toggle: JSX.Element;
}
export const Modal: React.FC<ModalProps> = ({
  visible,
  children,
  handleClose,
  toggle,
}) => {
  const stopProp = (e: any) => {
    return e.stopPropagation();
  };

  if (!visible) return toggle;
  return (
    <>
      {toggle}
      <ModalBackground onClick={handleClose}>
        <ModalContent onClick={stopProp}>{children}</ModalContent>
      </ModalBackground>
    </>
  );
};
