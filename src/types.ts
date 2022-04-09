export type GraphVertex = string;

export interface GraphEdge {
  id: string;
  from: GraphVertex;
  to: GraphVertex;
  cost: number;
}

export interface AppState {
  verticies: Array<GraphVertex>;
  routes: Array<GraphEdge>;
}
