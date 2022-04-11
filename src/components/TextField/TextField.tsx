import React from "react";
import styled from "styled-components";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
}

const StyledRoot = styled.div``;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  height: 38px;
  padding: 8px 12px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const StyledLabel = styled.label``;

const StyledLabelTitle = styled.span`
  display: block;
  margin-bottom: 4px;
`;

export const TextField: React.FC<TextFieldProps> = ({
  onChange,
  className,
  title,
  ...restProps
}) => {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }
    },
    [onChange]
  );

  return (
    <StyledRoot className={className}>
      <StyledLabel>
        {title && <StyledLabelTitle>{title}</StyledLabelTitle>}
        <StyledInput {...restProps} onChange={handleChange} />
      </StyledLabel>
    </StyledRoot>
  );
};
