export type Vertex = string;

export interface Edge {
  id: string;
  from: Vertex;
  to: Vertex;
  cost: number;
}
