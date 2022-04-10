import React from "react";

import { Vector2 } from "./Graph.types";

export function useArc(from: Vector2, to: Vector2) {
  return React.useMemo(() => {
    const cx = (from.x + to.x) / 2;
    const cy = (from.y + to.y) / 2;
    const dx = (to.x - from.x) / 2;
    const dy = (to.y - from.y) / 2;

    const dd = Math.sqrt(dx * dx + dy * dy);

    const x = cx + (dy / dd) * 50;
    const y = cy - (dx / dd) * 50;

    return {
      path: `M${from.x} ${from.y} Q${x} ${y} ${to.x} ${to.y}`,
      center: { x, y },
    };
  }, [from, to]);
}
