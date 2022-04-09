import data from "../data/data.json";

import { AppState } from "../store";
import { GraphEdge, GraphVertex } from "../types";

export function useMockAppState(): AppState {
  const cache: Record<string, boolean> = {};

  const edges: Array<GraphEdge> = [];
  const vertices: Array<GraphVertex> = [];

  for (const raw of data) {
    if (!cache[raw.from]) {
      cache[raw.from] = true;
      vertices.push(raw.from);
    }

    edges.push({
      id: `${Math.random()}`,
      cost: raw.cost,
      from: raw.from,
      to: raw.to,
    });
  }

  return {
    graph: {
      vertices: vertices,
      edges,
    },
  };
}
