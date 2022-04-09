import React from "react";
import styled from "styled-components";

import { AppStoreContext } from "../../store";
import { GraphVertex } from "../../types";

const StyledRoot = styled.div``;

const StyledPath = styled.div``;

const StyledChoices = styled.div``;

export const RouteCalculator: React.FC = () => {
  const { state } = React.useContext(AppStoreContext);

  const [path, setPath] = React.useState<Array<GraphVertex>>([]);
  const [verticies, setVerticies] = React.useState<Array<GraphVertex>>(
    () => state.verticies
  );

  const handleAddRoute = React.useCallback(
    (vertex: GraphVertex) => {
      setPath([...path, vertex]);

      const newVerticies = state.routes.reduce<Array<GraphVertex>>((acc, r) => {
        if (r.from === vertex && !path.includes(r.to)) {
          acc.push(r.to);
        }
        return acc;
      }, []);

      setVerticies(newVerticies);
    },
    [path, state.routes]
  );

  const totalCost = React.useMemo(() => {
    let cost = 0;

    for (let i = 1; i < path.length; i++) {
      const prev = path[i - 1];
      const curr = path[i];

      const route = state.routes.find((r) => r.from === prev && r.to === curr);
      if (route) {
        cost += route.cost;
      }
    }

    return cost;
  }, [path, state.routes]);

  return (
    <StyledRoot>
      <h3>{totalCost}</h3>
      <StyledPath>
        {path.map((r, i) => (
          <div key={i}>{r}</div>
        ))}
      </StyledPath>
      <StyledChoices>
        {verticies.map((v, i) => (
          <button key={i} onClick={() => handleAddRoute(v)}>
            {v}
          </button>
        ))}
      </StyledChoices>
    </StyledRoot>
  );
};
