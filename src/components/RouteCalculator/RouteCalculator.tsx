import React from "react";
import styled from "styled-components";

import { useVerticesChoices } from "../../hooks/useVerticesChoices";
import { AppStoreContext } from "../../store";
import { Edge, Vertex } from "../../types";
import { Button } from "../Button/Button";
import { Dropdown } from "../Dropdown/Dropdown";
import { Route } from "../Route/Route";

import { traverse } from "./RouteCalculator.hooks";

const StyledRoot = styled.div``;

const StyledOptions = styled.div`
  display: grid;
  grid-template-columns: 40% 40% 1fr;
  grid-gap: 8px;
`;

const StyledList = styled.div``;

export const RouteCalculator: React.FC = () => {
  const [from, setFrom] = React.useState<Vertex | undefined>(undefined);
  const [to, setTo] = React.useState<Vertex | undefined>(undefined);
  const { state } = React.useContext(AppStoreContext);
  const choices = useVerticesChoices(state.graph.vertices);
  const [routeList, setRouteList] = React.useState<Array<Edge[]>>([]);

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

    const newRoute = traverse(state.graph.edges, from, to);
    setRouteList(newRoute);
  }, [from, to, state.graph]);

  return (
    <StyledRoot>
      <StyledOptions>
        <Dropdown choices={choices} value={from} onChange={handleChangeFrom} />
        <Dropdown choices={choices} value={to} onChange={handleChangeTo} />
        <Button onClick={handleSubmit}>Calculate</Button>
      </StyledOptions>
      {routeList.length > 0 && (
        <StyledList>
          {routeList.map((route, i) => (
            <Route key={i} route={route} />
          ))}
        </StyledList>
      )}
    </StyledRoot>
  );
};
