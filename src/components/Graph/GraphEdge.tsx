import React from "react";

import { useGraphColor } from "./Graph.hooks";
import { GraphEdge as GraphEdgeProps } from "./Graph.types";

export const GraphEdge: React.FC<GraphEdgeProps> = ({
  from,
  to,
  cost,
  color,
}) => {
  const fill = useGraphColor(color);

  return (
    <g>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="0"
          refY="3.5"
          orient="auto"
          fill={fill}
        >
          <polygon points="0 0, 10 3.5, 0 7" />
        </marker>
      </defs>

      <text x={(from.x + to.x) / 2} y={(from.y + to.y) / 2}>
        {cost}
      </text>

      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={fill}
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
    </g>
  );
};
