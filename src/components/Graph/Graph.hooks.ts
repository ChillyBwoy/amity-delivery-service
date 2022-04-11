import React from "react";
import { AppStoreContext } from "../../store";

import { GraphColor, GraphEdge, GraphVertex, Vector2 } from "./Graph.types";

export function useGraphColor(clr?: GraphColor): string {
  switch (clr) {
    case "default":
      return "#000";

    case "selected":
      return "#ffd400";

    case "active":
      return "#1054DE";

    default:
      return "#1dc497";
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
  hasSelected: boolean;
}

export function useGraph(viewBox: Vector2, radius: number): UseGraphResult {
  const { state } = React.useContext(AppStoreContext);

  const selectedEdges = state.view.edgeIds;

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

      const isSelected = Boolean(selectedEdges.find((id) => id.includes(name)));

      dict[name] = {
        name,
        position: { x, y },
        radius,
        color: isSelected ? "selected" : "default",
      };
    }

    return dict;
  }, [radius, selectedEdges, state.graph.vertices, viewBox]);

  // console.log(vertexMap);

  const edges = React.useMemo(() => {
    const result: Array<GraphEdge> = [];

    for (const edge of state.graph.edges) {
      const from = vertexMap[edge.from];
      const to = vertexMap[edge.to];

      if (to.position.x !== 0 && to.position.y !== 0) {
        const isSelected = selectedEdges.includes(`${from.name}${to.name}`);
        result.push({
          from: adjustVector(to.position, from.position, radius),
          to: adjustVector(from.position, to.position, radius),
          cost: edge.cost,
          color: isSelected ? "selected" : "default",
        });
      }
    }

    return result;
  }, [radius, selectedEdges, state.graph.edges, vertexMap]);

  return {
    edges,
    vertices: Object.values(vertexMap),
    hasSelected: selectedEdges.length > 0,
  };
}
