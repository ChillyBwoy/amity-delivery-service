import React from "react";
import { GraphVertex } from "../types";

export function useVerticesChoices(vertices: Array<GraphVertex>) {
  const choices = React.useMemo(() => {
    return vertices.map((vertex) => ({
      name: vertex,
      value: vertex,
    }));
  }, [vertices]);

  return choices;
}
