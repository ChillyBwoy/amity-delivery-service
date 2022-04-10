import { Edge, Vertex } from "../../types";

export function traverse(edges: Array<Edge>, from: Vertex, to: Vertex) {
  const visited: Record<Vertex, boolean> = {};
  const result: Array<Vertex[]> = [];

  function recur(source: Vertex, dest: Vertex, localPathList: Array<string>) {
    if (source === dest) {
      result.push([...localPathList]);
      return;
    }

    const adjacents = edges.filter((e) => e.from === source);

    console.log(
      ":::",
      adjacents.map((x) => `${x.from} -> ${x.to}`).join(" | ")
    );

    visited[source] = true;

    for (const edge of adjacents) {
      if (!visited[edge.to]) {
        localPathList.push(edge.to);
        recur(edge.to, dest, localPathList);
        localPathList.pop();
      }
    }

    visited[source] = false;

    return localPathList;
  }

  recur(from, to, [from]);

  console.log(result.map((x) => x.join(" -> ")).join("\n"));

  return result;
}
