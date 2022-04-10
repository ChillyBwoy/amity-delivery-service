import React from "react";
import styled from "styled-components";

import { useVerticesChoices } from "../../hooks/useVerticesChoices";
import { AppStoreContext } from "../../store";
import { Vertex } from "../../types";

import { Dropdown } from "../Dropdown/Dropdown";
import { traverse } from "./RouteCalculator.hooks";

const StyledRoot = styled.div``;

export const RouteCalculator: React.FC = () => {
  const [from, setFrom] = React.useState<Vertex | undefined>(undefined);
  const [to, setTo] = React.useState<Vertex | undefined>(undefined);
  const { state } = React.useContext(AppStoreContext);
  const choices = useVerticesChoices(state.graph.vertices);

  const handleChangeFrom = React.useCallback((value: Vertex) => {
    setFrom(value);
  }, []);

  const handleChangeTo = React.useCallback((value: Vertex) => {
    setTo(value);
  }, []);

  const handleSubmit = React.useCallback(() => {
    if (!to || !from) {
      return;
    }

    const route = traverse(state.graph.edges, from, to);
  }, [from, to, state.graph]);

  return (
    <StyledRoot>
      <Dropdown choices={choices} value={from} onChange={handleChangeFrom} />
      <Dropdown choices={choices} value={to} onChange={handleChangeTo} />
      <button onClick={handleSubmit}>Calculate</button>
    </StyledRoot>
  );
};
