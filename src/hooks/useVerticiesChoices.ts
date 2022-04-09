import React from "react";
import { GraphVertex } from "../types";

export function useVerticiesChoices(verticies: Array<GraphVertex>) {
  const choices = React.useMemo(() => {
    return verticies.map((vertex) => ({
      name: vertex,
      value: vertex,
    }));
  }, [verticies]);

  return choices;
}
