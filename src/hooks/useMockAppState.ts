import data from "../data/data.json";

import { AppState } from "../store";
import { Edge, Vertex } from "../types";

export function useMockAppState(): AppState {
  const cache: Record<string, boolean> = {};

  const edges: Array<Edge> = [];
  const vertices: Array<Vertex> = [];

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
