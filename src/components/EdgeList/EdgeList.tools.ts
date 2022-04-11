import { GraphState } from "../../store/graph/types";

import { Edge, Vertex } from "../../types";

export function validateEdge(
  graph: GraphState,
  id: string,
  from: Vertex | undefined,
  to: Vertex | undefined,
  cost: number
) {
  if (!from || !to || !cost) {
    throw new Error("Please specify all parameters");
  }

  if (from === to) {
    throw new Error("From and To cannot be the same");
  }

  const mathchFrom = graph.vertices.find((v) => v === from);
  if (!mathchFrom) {
    throw new Error(`Vertex with name ${from} not found`);
  }

  const mathchTo = graph.vertices.find((v) => v === to);
  if (!mathchTo) {
    throw new Error(`Vertex with name ${to} not found`);
  }

  const matchedEdge = graph.edges.find((e) => e.from === from && e.to === to);
  if (matchedEdge) {
    throw new Error("Edge already exists");
  }

  if (Number.isNaN(cost) || cost <= 0) {
    throw new Error("Invalid cost value");
  }

  const edge: Edge = {
    id,
    cost,
    from,
    to,
  };

  return edge;
}
