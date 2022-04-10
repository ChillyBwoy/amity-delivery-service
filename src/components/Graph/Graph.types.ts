export interface Vector2 {
  x: number;
  y: number;
}

export interface GraphViewBox {
  width: number;
  height: number;
}

export type GraphColor = "default" | "selected" | "active";

export interface GraphVertex {
  radius: number;
  name: string;
  position: Vector2;
  color?: GraphColor;
}

export interface GraphEdge {
  from: Vector2;
  to: Vector2;
  cost: number;
  color?: GraphColor;
}
