import React from "react";

import { Vertex } from "../../types";
import { useGraphColor } from "./Graph.hooks";
import { GraphVertex as BaseGraphVertexProps } from "./Graph.types";

interface GraphVertexProps extends BaseGraphVertexProps {
  onClick?: (vertex: Vertex) => void;
}

export const GraphVertex: React.FC<GraphVertexProps> = ({
  position,
  name,
  color,
  radius,
  onClick,
}) => {
  const clr = useGraphColor(color);

  const handleClick = React.useCallback(() => {
    if (onClick) {
      onClick(name);
    }
  }, [name, onClick]);

  return (
    <g onClick={handleClick} style={{ cursor: "pointer" }}>
      <circle
        cx={position.x}
        cy={position.y}
        r={radius}
        fill="transparent"
        stroke={clr}
        strokeWidth={3}
      />
      <text
        textAnchor="middle"
        alignmentBaseline="middle"
        x={position.x}
        y={position.y}
        fill={clr}
        stroke={clr}
      >
        {name}
      </text>
    </g>
  );
};
