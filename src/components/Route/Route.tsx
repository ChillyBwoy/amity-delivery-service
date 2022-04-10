import React from "react";
import styled from "styled-components";

import { Edge } from "../../types";

import { Ball } from "../Ball/Ball";

interface RouteProps {
  route: Array<Edge>;
}

const StyledRoot = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 12px 0;
`;

const StyledCost = styled(Ball)`
  font-size: 1.5rem;
  background: transparent;
  color: #000;
`;

export const Route: React.FC<RouteProps> = ({ route }) => {
  const { path, cost } = React.useMemo(() => {
    const result = [];
    let cost = 0;

    if (route.length === 0) {
      return { path: [], cost };
    }

    for (const edge of route) {
      result.push(edge.from);
      cost += edge.cost;
    }

    result.push(route[route.length - 1].to);

    return { path: result, cost };
  }, [route]);

  return (
    <StyledRoot>
      {path.map((vertex, i) => (
        <Ball key={i} arrow>
          {vertex}
        </Ball>
      ))}
      {cost > 0 && <StyledCost>{cost}</StyledCost>}
    </StyledRoot>
  );
};
