import { GraphEdge, GraphVertex } from "../types";

export enum AppActionType {
  VertexAdd = "VERTEX_ADD",
  VertexDelete = "VERTEX_DELETE",
  RouteUpdate = "ROUTE_UPDATE",
  RouteDelete = "ROUTE_DELETE",
}

export interface VertexAddAction {
  type: AppActionType.VertexAdd;
  vertex: GraphVertex;
}

export interface VertexDeleteAction {
  type: AppActionType.VertexDelete;
  vertex: GraphVertex;
}

export interface RouteUpdateAction {
  type: AppActionType.RouteUpdate;
  route: GraphEdge;
}

export interface RouteDeleteAction {
  type: AppActionType.RouteDelete;
  id: string;
}

export type AppAction =
  | VertexAddAction
  | VertexDeleteAction
  | RouteUpdateAction
  | RouteDeleteAction;
