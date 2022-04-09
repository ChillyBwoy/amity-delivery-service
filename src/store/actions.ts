import { GraphEdge, GraphVertex } from "../types";
import {
  VertexAddAction,
  AppActionType,
  RouteUpdateAction,
  RouteDeleteAction,
  VertexDeleteAction,
} from "./types";

export function vertextAddAction(vertex: GraphVertex): VertexAddAction {
  return {
    type: AppActionType.VertexAdd,
    vertex,
  };
}

export function vertexDeleteAction(vertex: GraphVertex): VertexDeleteAction {
  return {
    type: AppActionType.VertexDelete,
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
