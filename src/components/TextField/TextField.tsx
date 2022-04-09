import React from "react";
import styled from "styled-components";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const StyledRoot = styled.div``;

const StyledInput = styled.input``;

export const TextField: React.FC<TextFieldProps> = ({
  onChange,
  className,
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
      <StyledInput {...restProps} onChange={handleChange} />
    </StyledRoot>
  );
};
