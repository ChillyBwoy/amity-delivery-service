import React from "react";
import { AppStoreContext } from "../../store";

import { GraphColor, GraphEdge, GraphVertex, Vector2 } from "./Graph.types";

export function useGraphColor(clr?: GraphColor): string {
  switch (clr) {
    case "default":
      return "#000000";

    case "selected":
      return "#0000FF";

    case "active":
      return "#FF0000";

    default:
      return "#000000";
  }
}

interface UseGraphResult {
  vertices: Array<GraphVertex>;
  edges: Array<GraphEdge>;
}

export function useGraph(viewBox: Vector2): UseGraphResult {
  const { state } = React.useContext(AppStoreContext);

  const vertexMap = React.useMemo(() => {
    const dict: Record<string, GraphVertex> = {};

    const { x: width, y: height } = viewBox;

    const centerX = width / 2;
    const centerY = height / 2;
    const lengthX = width / 3;
    const lengthY = height / 3;

    const sectionsCount = 360 / state.graph.vertices.length;

    for (let i = 0; i < state.graph.vertices.length; i++) {
      const name = state.graph.vertices[i];
      const angle = i * sectionsCount;
      const radians = (angle / 180) * Math.PI;
      const x = centerX + lengthX * Math.cos(radians);
      const y = centerY - lengthY * Math.sin(radians);

      dict[name] = {
        name,
        position: { x, y },
      };
    }

    return dict;
  }, [state.graph.vertices, viewBox]);

  const edges = React.useMemo(() => {
    const result: Array<GraphEdge> = [];

    for (const edge of state.graph.edges) {
      const from = vertexMap[edge.from];
      const to = vertexMap[edge.to];

      result.push({
        from: from.position,
        to: to.position,
        cost: edge.cost,
      });
    }

    return result;
  }, [state.graph.edges, vertexMap]);

  return {
    edges,
    vertices: Object.values(vertexMap),
  };
}
