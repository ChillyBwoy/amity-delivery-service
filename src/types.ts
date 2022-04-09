export type GraphVertex = string;

export interface GraphEdge {
  id: string;
  from: GraphVertex;
  to: GraphVertex;
  cost: number;
}
