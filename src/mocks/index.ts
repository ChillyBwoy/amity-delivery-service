import { AppState } from "../store";
import { Edge, Vertex } from "../types";

import data from "./data.json";

export function appStateMock(): AppState {
  const cache: Record<string, boolean> = {};

  const edges: Array<Edge> = [];
  const vertices: Array<Vertex> = [];

  for (const raw of data) {
    if (!cache[raw.from]) {
      cache[raw.from] = true;
      vertices.push(raw.from);
    }

    edges.push({
      id: `${raw.from}${raw.to}`,
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
    view: {
      edgeIds: [],
    },
  };
}
