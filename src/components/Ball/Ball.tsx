import React from "react";
import styled, { css } from "styled-components";

interface VertexProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  arrow?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const StyledRoot = styled.div<{ arrow?: boolean; disabled?: boolean }>`
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: relative;

  background: #1dc497;
  color: #fff;
  border-radius: 50%;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.25;
      cursor: default;
    `}

  ${({ arrow }) =>
    arrow &&
    css`
      margin: 0 10px;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }

      &:after {
        color: #000;
        content: "\\2192";
        display: block;
        right: -20px;
        width: 20px;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
      }
    `}
`;

export const Ball: React.FC<VertexProps> = ({
  arrow,
  className,
  children,
  disabled,
  ...restProps
}) => {
  return (
    <StyledRoot
      {...restProps}
      className={className}
      arrow={arrow}
      disabled={disabled}
    >
      {children}
    </StyledRoot>
  );
};
