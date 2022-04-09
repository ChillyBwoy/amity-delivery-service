import { GraphEdge, GraphVertex } from "../../types";
import {
  VertexAddAction,
  GraphActionType,
  EdgeUpdateAction,
  EdgeDeleteAction,
  VertexDeleteAction,
} from "./types";

export function vertextAddAction(vertex: GraphVertex): VertexAddAction {
  return {
    type: GraphActionType.VertexAdd,
    vertex,
  };
}

export function vertexDeleteAction(vertex: GraphVertex): VertexDeleteAction {
  return {
    type: GraphActionType.VertexDelete,
    vertex,
  };
}

export function edgeUpdateAction(edge: GraphEdge): EdgeUpdateAction {
  return {
    type: GraphActionType.EdgeUpdate,
    edge,
  };
}

export function edgeDeleteAction(id: string): EdgeDeleteAction {
  return {
    type: GraphActionType.EdgeDelete,
    id,
  };
}
