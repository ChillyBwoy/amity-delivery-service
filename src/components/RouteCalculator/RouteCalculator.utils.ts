import { Edge, Vertex } from "../../types";

export function findRoutes(
  edges: Array<Edge>,
  from: Vertex,
  to: Vertex,
  maxStops: number
) {
  const visited: Record<string, boolean> = {};

  const result: Array<Edge[]> = [];

  function recur(current: Vertex, localPathList: Array<Edge>) {
    if (current === to) {
      if (localPathList.length > 0) {
        result.push([...localPathList]);
      }

      if (visited[current]) {
        return;
      }
    }

    visited[current] = true;

    for (const edge of edges) {
      if (edge.from === current && !visited[edge.id]) {
        localPathList.push(edge);
        visited[edge.id] = true;

        recur(edge.to, localPathList);

        localPathList.pop();
        visited[edge.id] = false;
      }
    }

    return localPathList;
  }

  recur(from, []);

  return result.filter((route) => route.length <= maxStops);
}
