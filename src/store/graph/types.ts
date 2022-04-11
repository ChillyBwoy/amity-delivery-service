import { Edge, Vertex } from "../../types";

export enum GraphActionType {
  VertexAdd = "@GRAPH/VERTEX_ADD",
  VertexDelete = "@GRAPH/VERTEX_DELETE",
  EdgeAdd = "@GRAPH/EDGE_ADD",
  EdgeUpdate = "@GRAPH/EDGE_UPDATE",
  EdgeDelete = "@GRAPH/EDGE_DELETE",
}

export interface VertexAddAction {
  type: GraphActionType.VertexAdd;
  vertex: Vertex;
}

export interface VertexDeleteAction {
  type: GraphActionType.VertexDelete;
  vertex: Vertex;
}

export interface EdgeAddAction {
  type: GraphActionType.EdgeAdd;
  edge: Edge;
}

export interface EdgeUpdateAction {
  type: GraphActionType.EdgeUpdate;
  edge: Edge;
}

export interface EdgeDeleteAction {
  type: GraphActionType.EdgeDelete;
  id: string;
}

export type GraphAction =
  | VertexAddAction
  | VertexDeleteAction
  | EdgeAddAction
  | EdgeUpdateAction
  | EdgeDeleteAction;

export interface GraphState {
  vertices: Array<Vertex>;
  edges: Array<Edge>;
}
