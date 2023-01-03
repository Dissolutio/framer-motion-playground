export type HexCoordinates = {
  q: number;
  r: number;
  s: number;
};
export type Point = {
  x: number;
  y: number;
};
export type Size = { x: number; y: number };
export type Orientation = {
  f0: number;
  f1: number;
  f2: number;
  f3: number;
  b0: number;
  b1: number;
  b2: number;
  b3: number;
  startAngle: number;
};

export type LayoutDimension = {
  size: Size;
  orientation: Orientation;
  origin: Size;
  spacing: number;
};
