import React from "react";
import styled from "styled-components";

export interface DropdownOption {
  name: string;
  value: string;
}

interface DropdownProps<T> {
  choices: Array<T>;
  value: number | string | undefined;
  title?: string;
  onChange(value: number | string): void;
}

const StyledSelect = styled.select`
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

export const Dropdown = <T extends DropdownOption>(props: DropdownProps<T>) => {
  const { choices, value, onChange, title } = props;

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <StyledLabel>
      {title && <StyledLabelTitle>{title}</StyledLabelTitle>}
      <StyledSelect value={value} onChange={handleChange}>
        <option />
        {choices.map((choice, i) => (
          <option key={i} value={choice.value}>
            {choice.name}
          </option>
        ))}
      </StyledSelect>
    </StyledLabel>
  );
};
