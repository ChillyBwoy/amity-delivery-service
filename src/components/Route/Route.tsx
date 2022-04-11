import React from "react";
import styled, { css } from "styled-components";

import { Edge } from "../../types";

import { Ball } from "../Ball/Ball";

interface RouteProps {
  route: Array<Edge>;
  selected?: boolean;
  onClick?: (route: Array<Edge>) => void;
}

const StyledRoot = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  padding: 12px 0;
  cursor: pointer;
`;

const StyledCost = styled(Ball)`
  font-size: 1.5rem;
  margin: 10px;
  background: transparent;
  color: #000;
`;

const StyledBall = styled(Ball)<{ selected?: boolean }>`
  ${({ selected }) =>
    selected &&
    css`
      background-color: #ffd400;
    `}
`;

export const Route: React.FC<RouteProps> = ({ route, selected, onClick }) => {
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

  const handleClick = React.useCallback(() => {
    if (onClick) {
      onClick(route);
    }
  }, [onClick, route]);

  return (
    <StyledRoot onClick={handleClick}>
      {path.map((vertex, i) => (
        <StyledBall key={i} selected={selected} arrow>
          {vertex}
        </StyledBall>
      ))}
      {cost > 0 && <StyledCost>{cost}</StyledCost>}
    </StyledRoot>
  );
};
