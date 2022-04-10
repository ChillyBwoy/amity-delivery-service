import React from "react";
import styled from "styled-components";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  view?: "primary" | "alert";
}

const StyledButton = styled.button`
  cursor: pointer;
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  view,
  ...restProps
}) => {
  return <StyledButton {...restProps}>{children}</StyledButton>;
};
