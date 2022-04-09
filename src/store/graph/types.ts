import { GraphEdge, GraphVertex } from "../../types";

export enum GraphActionType {
  VertexAdd = "VERTEX_ADD",
  VertexDelete = "VERTEX_DELETE",
  EdgeUpdate = "EDGE_UPDATE",
  EdgeDelete = "EDGE_DELETE",
}

export interface VertexAddAction {
  type: GraphActionType.VertexAdd;
  vertex: GraphVertex;
}

export interface VertexDeleteAction {
  type: GraphActionType.VertexDelete;
  vertex: GraphVertex;
}

export interface EdgeUpdateAction {
  type: GraphActionType.EdgeUpdate;
  edge: GraphEdge;
}

export interface EdgeDeleteAction {
  type: GraphActionType.EdgeDelete;
  id: string;
}

export type GraphAction =
  | VertexAddAction
  | VertexDeleteAction
  | EdgeUpdateAction
  | EdgeDeleteAction;

export interface GraphState {
  vertices: Array<GraphVertex>;
  edges: Array<GraphEdge>;
}
