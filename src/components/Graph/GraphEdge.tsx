import React from "react";

import { useGraphColor } from "./Graph.hooks";
import { GraphEdge as GraphEdgeProps } from "./Graph.types";
import { useArc } from "./GraphEdge.hooks";

export const GraphEdge: React.FC<GraphEdgeProps> = ({
  from,
  to,
  cost,
  color,
}) => {
  const fill = useGraphColor(color);

  const { path, center } = useArc(from, to);

  return (
    <g>
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 60 60"
          refX="0"
          refY="30"
          markerUnits="strokeWidth"
          markerWidth="8"
          markerHeight="10"
          orient="auto"
        >
          <path d="M 60 0 L 0 30 L 60 60 z" fill={fill} />
        </marker>
      </defs>

      <text x={center.x} y={center.y} fill={fill}>
        {cost}
      </text>

      <path
        d={path}
        stroke={fill}
        fill="transparent"
        strokeWidth="2"
        markerStart="url(#arrow)"
      />
    </g>
  );
};
