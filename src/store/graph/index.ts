import { GraphAction, GraphActionType, GraphState } from "./types";

export const reducer = (state: GraphState, action: GraphAction): GraphState => {
  switch (action.type) {
    case GraphActionType.VertexAdd: {
      const newVertices = [...state.vertices, action.vertex];

      return {
        ...state,
        vertices: newVertices,
      };
    }

    case GraphActionType.VertexDelete: {
      const newVertices = state.vertices.filter((v) => v !== action.vertex);
      const newEdges = state.edges.filter(
        (r) => r.from !== action.vertex && r.to !== action.vertex
      );

      return {
        edges: newEdges,
        vertices: newVertices,
      };
    }

    case GraphActionType.EdgeAdd: {
      const newEdges = [...state.edges];
      newEdges.push(action.edge);

      return {
        ...state,
        edges: newEdges,
      };
    }

    case GraphActionType.EdgeUpdate: {
      const index = state.edges.findIndex((r) => r.id === action.edge.id);
      if (index === -1) {
        throw new Error("Edge not found");
      }

      const newEdges = [...state.edges];

      newEdges[index] = action.edge;

      return {
        ...state,
        edges: newEdges,
      };
    }

    case GraphActionType.EdgeDelete: {
      const newEdges = state.edges.filter((r) => r.id !== action.id);
      return {
        ...state,
        edges: newEdges,
      };
    }

    default:
      return state;
  }
};
