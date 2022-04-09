import React from "react";

export interface DropdownOption {
  name: string;
  value: string;
}

interface DropdownProps<T> {
  choices: Array<T>;
  value: number | string;
  onChange(value: number | string): void;
}

export const Dropdown = <T extends DropdownOption>(props: DropdownProps<T>) => {
  const { choices, value, onChange } = props;

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <select value={value} onChange={handleChange}>
      {choices.map((choice, i) => (
        <option key={i} value={choice.value}>
          {choice.name}
        </option>
      ))}
    </select>
  );
};
