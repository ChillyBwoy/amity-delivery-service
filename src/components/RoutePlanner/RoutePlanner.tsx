import React from "react";
import styled from "styled-components";

import { AppStoreContext } from "../../store";
import { Vertex } from "../../types";
import { Ball } from "../Ball/Ball";

import { useRouteTotalCost } from "./RoutePlanner.hooks";

const StyledRoot = styled.div``;

const StyledPath = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledChoices = styled.div`
  padding: 12px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const StyledChoiceBall = styled(Ball)`
  background-color: #ffd400;
  cursor: pointer;
  margin: 10px;

  &:first-child {
    margin-left: 0;
  }
`;

const StyledCost = styled(StyledChoiceBall)`
  font-size: 1.5rem;
  background: transparent;
  color: #000;
`;

const StyledResetBall = styled(StyledChoiceBall)`
  background-color: #fa4d30;
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
      <StyledChoices>
        {state.graph.vertices.map((v, i) => (
          <StyledChoiceBall
            key={i}
            onClick={() => vertices.includes(v) && handleAddRoute(v)}
            disabled={!vertices.includes(v)}
          >
            {v}
          </StyledChoiceBall>
        ))}
      </StyledChoices>

      <StyledPath>
        {route.length > 0 && (
          <StyledResetBall onClick={handleResetClick}>&times;</StyledResetBall>
        )}
        {route.map((r, i) => (
          <Ball key={i} arrow>
            {r}
          </Ball>
        ))}
        {route.length === 1 ? (
          <StyledCost>?</StyledCost>
        ) : (
          <>{totalCost > 0 && <StyledCost>{totalCost}</StyledCost>}</>
        )}
      </StyledPath>
    </StyledRoot>
  );
};
