import { Edge, Vertex } from "../../types";

export function validateEdge(
  edges: Array<Edge>,
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

  const matchedEdge = edges.find((e) => e.from === from && e.to === to);

  if (matchedEdge) {
    throw new Error("Edge already exists");
  }

  if (Number.isNaN(cost)) {
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
