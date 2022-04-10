import React from "react";
import styled from "styled-components";

import { AppStoreContext } from "../../store";
import { Vertex } from "../../types";
import { Ball } from "../Ball/Ball";
import { Button } from "../Button/Button";

import { useRouteTotalCost } from "./RoutePlanner.hooks";

const StyledRoot = styled.div``;

const StyledPath = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledChoices = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 12px 0;
`;

const StyledCost = styled(Ball)`
  font-size: 1.5rem;
  background: transparent;
  color: #000;
`;

const StyledChoiceBall = styled(Ball)`
  margin: 0 4px;
  background-color: #ffd400;
  cursor: pointer;

  &:first-child {
    margin-left: 0;
  }
`;

export const RoutePlanner: React.FC = () => {
  const { state } = React.useContext(AppStoreContext);

  const [route, setRoute] = React.useState<Array<Vertex>>([]);
  const [lastVertex, setLastVertex] = React.useState<Vertex | null>(null);

  const handleAddRoute = React.useCallback(
    (vertex: Vertex) => {
      setRoute([...route, vertex]);
      setLastVertex(vertex);
    },
    [route]
  );

  const vertices = React.useMemo(() => {
    if (!lastVertex) {
      return state.graph.vertices;
    }

    return state.graph.edges.reduce<Array<Vertex>>((acc, r) => {
      if (r.from === lastVertex && !route.includes(r.to)) {
        acc.push(r.to);
      }

      return acc;
    }, []);
  }, [lastVertex, route, state.graph.edges, state.graph.vertices]);

  const handleResetClick = React.useCallback(() => {
    setRoute([]);
    setLastVertex(null);
  }, []);

  const totalCost = useRouteTotalCost(route, state.graph.edges);

  return (
    <StyledRoot>
      <Button onClick={handleResetClick}>reset</Button>
      <StyledChoices>
        {vertices.map((v, i) => (
          <StyledChoiceBall key={i} onClick={() => handleAddRoute(v)}>
            {v}
          </StyledChoiceBall>
        ))}
      </StyledChoices>
      <StyledPath>
        {route.map((r, i) => (
          <Ball key={i} arrow={route.length > 1}>
            {r}
          </Ball>
        ))}
        {totalCost > 0 && <StyledCost>{totalCost}</StyledCost>}
      </StyledPath>
    </StyledRoot>
  );
};
