import React from "react";
import styled from "styled-components";

import { AppStoreContext } from "../../store";
import { edgeAddAction } from "../../store/graph/actions";
import { Vertex } from "../../types";
import { Button } from "../Button/Button";

import { Dropdown, DropdownOption } from "../Dropdown/Dropdown";
import { TextField } from "../TextField/TextField";
import { validateEdge } from "./EdgeList.tools";

interface EdgeListFormProps {
  choices: Array<DropdownOption>;
}

const StyledRoot = styled.div``;

const StyledForm = styled.div`
  display: grid;
  grid-template-columns: 25% 25% 25% 1fr;
  grid-gap: 8px;
`;

const StyledError = styled.div`
  padding: 4px 0;
  color: #fa4d30;
`;

export const EdgeListForm: React.FC<EdgeListFormProps> = ({ choices }) => {
  const { dispatch, state } = React.useContext(AppStoreContext);

  const [from, setFrom] = React.useState<Vertex | undefined>(undefined);
  const [to, setTo] = React.useState<Vertex | undefined>(undefined);
  const [error, setError] = React.useState<string | null>(null);
  const [cost, setCost] = React.useState(1);

  const handleChangeFrom = React.useCallback((value: Vertex) => {
    setError(null);
    setFrom(value);
  }, []);

  const handleChangeTo = React.useCallback((value: Vertex) => {
    setError(null);
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

  const handleSubmit = React.useCallback(() => {
    try {
      const edge = validateEdge(state.graph, `${from}${to}`, from, to, cost);

      dispatch(edgeAddAction(edge));

      setCost(1);
      setFrom("");
      setTo("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Inknown error");
      }
    }
  }, [cost, dispatch, from, state.graph, to]);

  return (
    <StyledRoot>
      <StyledForm>
        <Dropdown
          choices={choices}
          value={from}
          onChange={handleChangeFrom}
          title="From"
        />
        <Dropdown
          choices={choices}
          value={to}
          onChange={handleChangeTo}
          title="To"
        />
        <TextField
          type="number"
          value={cost}
          onChange={handleChangeCost}
          title="Cost"
          min={1}
        />
        <Button onClick={handleSubmit}>Add</Button>
      </StyledForm>
      {error && <StyledError>{error}</StyledError>}
    </StyledRoot>
  );
};
