import data from "../data/data.json";
import { AppState, GraphEdge, GraphVertex } from "../types";

export function useMockAppState(): AppState {
  const cache: Record<string, boolean> = {};

  const routes: Array<GraphEdge> = [];
  const verticies: Array<GraphVertex> = [];

  for (const raw of data) {
    if (!cache[raw.from]) {
      cache[raw.from] = true;
      verticies.push(raw.from);
    }

    routes.push({
      id: `${Math.random()}`,
      cost: raw.cost,
      from: raw.from,
      to: raw.to,
    });
  }

  return { verticies, routes };
}
