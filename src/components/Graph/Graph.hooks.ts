import React from "react";
import { AppStoreContext } from "../../store";

import { GraphColor, GraphEdge, GraphVertex, Vector2 } from "./Graph.types";

export function useGraphColor(clr?: GraphColor): string {
  switch (clr) {
    case "default":
      return "#292B32";

    case "selected":
      return "#FFD400";

    case "active":
      return "#1054DE";

    default:
      return "#292B32";
  }
}

function adjustVector(vec1: Vector2, vec2: Vector2, radius: number): Vector2 {
  const L = Math.sqrt(
    Math.pow(vec2.x - vec1.x, 2) + Math.pow(vec2.y - vec1.y, 2)
  );

  const x = vec1.x + (radius / L) * (vec2.x - vec1.x);
  const y = vec1.y + (radius / L) * (vec2.y - vec1.y);

  return { x, y };
}

interface UseGraphResult {
  vertices: Array<GraphVertex>;
  edges: Array<GraphEdge>;
}

export function useGraph(viewBox: Vector2, radius: number): UseGraphResult {
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
        radius,
      };
    }

    return dict;
  }, [radius, state.graph.vertices, viewBox]);

  const edges = React.useMemo(() => {
    const result: Array<GraphEdge> = [];

    for (const edge of state.graph.edges) {
      const from = vertexMap[edge.from];
      const to = vertexMap[edge.to];

      if (to.position.x !== 0 && to.position.y !== 0) {
        result.push({
          from: adjustVector(to.position, from.position, radius),
          to: adjustVector(from.position, to.position, radius),
          cost: edge.cost,
        });
      }
    }

    return result;
  }, [radius, state.graph.edges, vertexMap]);

  return {
    edges,
    vertices: Object.values(vertexMap),
  };
}
