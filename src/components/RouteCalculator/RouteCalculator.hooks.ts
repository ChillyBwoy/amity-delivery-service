import { Edge, Vertex } from "../../types";

export function traverse(edges: Array<Edge>, from: Vertex, to: Vertex) {
  const visited: Record<Vertex, boolean> = {};
  const result: Array<Edge[]> = [];

  function recur(source: Vertex, dest: Vertex, localPathList: Array<Edge>) {
    if (source === dest) {
      result.push([...localPathList]);
      return;
    }

    const adjacents = edges.filter((e) => e.from === source);

    visited[source] = true;

    for (const edge of adjacents) {
      if (!visited[edge.to]) {
        localPathList.push(edge);
        recur(edge.to, dest, localPathList);
        localPathList.pop();
      }
    }

    visited[source] = false;

    return localPathList;
  }

  recur(from, to, []);

  return result;
}
