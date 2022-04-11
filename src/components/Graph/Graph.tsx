import React from "react";
import styled from "styled-components";

import { AppStoreContext } from "../../store";
import { resetEdgesAction } from "../../store/view/actions";
import { Button } from "../Button/Button";

import { useGraph } from "./Graph.hooks";
import { Vector2 } from "./Graph.types";
import { GraphEdge } from "./GraphEdge";
import { GraphVertex } from "./GraphVertex";

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const StyledSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const StyledResetButton = styled(Button)`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

export const Graph: React.FC = () => {
  const { dispatch } = React.useContext(AppStoreContext);
  const [viewBox, setViewbox] = React.useState<Vector2>({ x: 0, y: 0 });
  const $rootRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const handleResize = () => {
      const root = $rootRef.current;
      if (!root) {
        return;
      }

      const rect = root.getBoundingClientRect();

      setViewbox({
        y: rect.height,
        x: rect.width,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleReset = React.useCallback(() => {
    dispatch(resetEdgesAction());
  }, [dispatch]);

  const { vertices, edges, hasSelected } = useGraph(viewBox, 20);

  return (
    <StyledRoot ref={$rootRef}>
      <StyledSvg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${viewBox.x} ${viewBox.y}`}
      >
        {vertices.map((vertex) => (
          <GraphVertex key={vertex.name} {...vertex} />
        ))}
        {edges.map((edge, i) => (
          <GraphEdge key={i} {...edge} />
        ))}
      </StyledSvg>
      {hasSelected && (
        <StyledResetButton onClick={handleReset}>Reset</StyledResetButton>
      )}
    </StyledRoot>
  );
};
