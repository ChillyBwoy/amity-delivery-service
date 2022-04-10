import React from "react";
import styled from "styled-components";

import { AppStoreContext } from "../../store";
import { Vertex } from "../../types";

import { useRouteTotalCost } from "./RoutePlanner.hooks";
import { RoutePlannerItem } from "./RoutePlannerItem";

const StyledRoot = styled.div``;

const StyledPath = styled.div``;

const StyledChoices = styled.div``;

export const RoutePlanner: React.FC = () => {
  const { state } = React.useContext(AppStoreContext);

  const [route, setRoute] = React.useState<Array<Vertex>>([]);
  const [vertices, setVertices] = React.useState<Array<Vertex>>(
    () => state.graph.vertices
  );

  const handleAddRoute = React.useCallback(
    (vertex: Vertex) => {
      const newVertices = state.graph.edges.reduce<Array<Vertex>>((acc, r) => {
        if (r.from === vertex && !route.includes(r.to)) {
          acc.push(r.to);
        }

        return acc;
      }, []);
      setVertices(newVertices);

      setRoute([...route, vertex]);
    },
    [route, state.graph.edges]
  );

  const handleDeleteRoute = React.useCallback(
    (vertex: Vertex) => {
      const newRoute = route.slice(0, -1);
      setRoute(newRoute);
    },
    [route]
  );

  const totalCost = useRouteTotalCost(route, state.graph.edges);

  return (
    <StyledRoot>
      <h3>{totalCost}</h3>
      <StyledPath>
        {route.map((r, i) => (
          <RoutePlannerItem
            key={i}
            vertex={r}
            onDelete={i === route.length - 1 ? handleDeleteRoute : undefined}
          />
        ))}
      </StyledPath>
      <StyledChoices>
        {vertices.map((v, i) => (
          <button key={i} onClick={() => handleAddRoute(v)}>
            {v}
          </button>
        ))}
      </StyledChoices>
    </StyledRoot>
  );
};
