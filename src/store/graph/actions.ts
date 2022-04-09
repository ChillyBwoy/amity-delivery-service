import { Edge, Vertex } from "../../types";
import {
  VertexAddAction,
  GraphActionType,
  EdgeUpdateAction,
  EdgeDeleteAction,
  VertexDeleteAction,
} from "./types";

export function vertextAddAction(vertex: Vertex): VertexAddAction {
  return {
    type: GraphActionType.VertexAdd,
    vertex,
  };
}

export function vertexDeleteAction(vertex: Vertex): VertexDeleteAction {
  return {
    type: GraphActionType.VertexDelete,
    vertex,
  };
}

export function edgeUpdateAction(edge: Edge): EdgeUpdateAction {
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
