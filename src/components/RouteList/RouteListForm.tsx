import React from "react";
import styled from "styled-components";
import { GraphVertex } from "../../types";

import { Dropdown, DropdownOption } from "../Dropdown/Dropdown";
import { TextField } from "../TextField/TextField";

interface RouteListFormProps {
  choices: Array<DropdownOption>;
}

const StyledRoot = styled.div`
  display: flex;
`;

export const RouteListForm: React.FC<RouteListFormProps> = ({ choices }) => {
  const [from, setFrom] = React.useState<GraphVertex | undefined>(undefined);
  const [to, setTo] = React.useState<GraphVertex | undefined>(undefined);
  const [cost, setCost] = React.useState(1);

  const handleChangeFrom = React.useCallback((value: GraphVertex) => {
    setFrom(value);
  }, []);

  const handleChangeTo = React.useCallback((value: GraphVertex) => {
    setTo(value);
  }, []);

  const handleChangeCost = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10);
      if (!Number.isNaN(value)) {
        setCost(value);
      }
    },
    []
  );

  return (
    <StyledRoot>
      <Dropdown choices={choices} value={from} onChange={handleChangeFrom} />
      <Dropdown choices={choices} value={to} onChange={handleChangeTo} />
      <TextField type="number" value={cost} onChange={handleChangeCost} />
      <button>Add</button>
    </StyledRoot>
  );
};
