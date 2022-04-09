import { GraphEdge, GraphVertex } from "../types";

export enum AppActionType {
  AddVertex = "ADD_VERTEX",
  RouteUpdate = "ROUTE_UPDATE",
  RouteDelete = "ROUTE_DELETE",
}

export interface VertexAddAction {
  type: AppActionType.AddVertex;
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

export type AppAction = VertexAddAction | RouteUpdateAction | RouteDeleteAction;
