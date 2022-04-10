import React from "react";

import { useGraphColor } from "./Graph.hooks";
import { GraphVertex as GraphVertexProps } from "./Graph.types";

export const GraphVertex: React.FC<GraphVertexProps> = ({
  position,
  name,
  color,
  radius,
}) => {
  const stroke = useGraphColor(color);

  return (
    <g>
      <circle
        cx={position.x}
        cy={position.y}
        r={radius}
        fill="none"
        stroke={stroke}
        strokeWidth={3}
      />
      <text
        textAnchor="middle"
        alignmentBaseline="middle"
        x={position.x}
        y={position.y}
        stroke={stroke}
        strokeWidth={1}
      >
        {name}
      </text>
    </g>
  );
};
