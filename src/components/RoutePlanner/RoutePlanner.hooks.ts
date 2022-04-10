import { Edge } from "../../types";

export function useRouteTotalCost(route: Array<string>, edges: Array<Edge>) {
  let cost = 0;

  for (let i = 1; i < route.length; i++) {
    const prev = route[i - 1];
    const curr = route[i];

    const path = edges.find((r) => r.from === prev && r.to === curr);

    if (path) {
      cost += path.cost;
    }
  }

  return cost;
}
