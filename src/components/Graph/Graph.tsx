import React from "react";
import styled from "styled-components";

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

export const Graph: React.FC = () => {
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

  const { vertices, edges } = useGraph(viewBox, 20);

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
    </StyledRoot>
  );
};
