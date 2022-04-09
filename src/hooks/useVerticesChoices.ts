import React from "react";
import { Vertex } from "../types";

export function useVerticesChoices(vertices: Array<Vertex>) {
  const choices = React.useMemo(() => {
    return vertices.map((vertex) => ({
      name: vertex,
      value: vertex,
    }));
  }, [vertices]);

  return choices;
}
