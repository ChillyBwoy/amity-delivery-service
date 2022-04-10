import React from "react";
import styled from "styled-components";

import { AppStoreContext } from "../../store";
import { edgeAddAction } from "../../store/graph/actions";
import { Edge, Vertex } from "../../types";
import { Button } from "../Button/Button";

import { Dropdown, DropdownOption } from "../Dropdown/Dropdown";
import { TextField } from "../TextField/TextField";

interface EdgeListFormProps {
  choices: Array<DropdownOption>;
}

const StyledRoot = styled.div``;

const StyledContent = styled.div`
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
    if (!from || !to || !cost) {
      return;
    }

    if (from === to) {
      setError("From and To cannot be the same");
      return;
    }

    const matchedEdge = state.graph.edges.find(
      (e) => e.from === from && e.to === to
    );
    if (matchedEdge) {
      setError("Edge already exists");
      return;
    }

    const edge: Edge = {
      id: `${Math.random()}`,
      cost,
      from,
      to,
    };

    dispatch(edgeAddAction(edge));

    setCost(1);
    setFrom("");
    setTo("");
  }, [cost, dispatch, from, state.graph.edges, to]);

  return (
    <StyledRoot>
      <StyledContent>
        <Dropdown choices={choices} value={from} onChange={handleChangeFrom} />
        <Dropdown choices={choices} value={to} onChange={handleChangeTo} />
        <TextField type="number" value={cost} onChange={handleChangeCost} />
        <Button onClick={handleSubmit}>Add</Button>
      </StyledContent>
      {error && <StyledError>{error}</StyledError>}
    </StyledRoot>
  );
};
