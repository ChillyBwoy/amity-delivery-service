import { GraphEdge, GraphVertex } from "../types";
import {
  VertexAddAction,
  AppActionType,
  RouteUpdateAction,
  RouteDeleteAction,
} from "./types";

export function addVertextAction(vertex: GraphVertex): VertexAddAction {
  console.log(vertex);
  return {
    type: AppActionType.AddVertex,
    vertex,
  };
}

export function routeUpdateAction(route: GraphEdge): RouteUpdateAction {
  return {
    type: AppActionType.RouteUpdate,
    route,
  };
}

export function routeDeleteAction(id: string): RouteDeleteAction {
  return {
    type: AppActionType.RouteDelete,
    id,
  };
}
