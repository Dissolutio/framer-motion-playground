import * as React from "react";
import { LayoutDimension, Point, Size } from "./types";

export type LayoutContext = {
  layout: LayoutDimension;
  points: string;
};

const LAYOUT_FLAT = {
  f0: 3.0 / 2.0,
  f1: 0.0,
  f2: Math.sqrt(3.0) / 2.0,
  f3: Math.sqrt(3.0),
  b0: 2.0 / 3.0,
  b1: 0.0,
  b2: -1.0 / 3.0,
  b3: Math.sqrt(3.0) / 3.0,
  startAngle: 0.0,
};
const LAYOUT_POINTY = {
  f0: Math.sqrt(3.0),
  f1: Math.sqrt(3.0) / 2.0,
  f2: 0.0,
  f3: 3.0 / 2.0,
  b0: Math.sqrt(3.0) / 3.0,
  b1: -1.0 / 3.0,
  b2: 0.0,
  b3: 2.0 / 3.0,
  startAngle: 0.5,
};
const defaultSize = { x: 10, y: 10 };
const defaultOrigin = { x: 0, y: 0 };
const defaultSpacing = 1.0;

const Context = React.createContext<LayoutContext | undefined>(undefined);

/**
 * Calculates the points for a hexagon given the size, angle, and center
 * @param radius Radius of the Hexagon
 * @param angle Angle offset for the hexagon in radians
 * @param center Central point for the hexagon
 * @returns Array of 6 points
 */

function calculateCoordinates(
  radius: number,
  angle: number = 0,
  center: Point = { x: 0, y: 0 }
) {
  const corners: Point[] = [];

  for (let i = 0; i < 6; i++) {
    const x = radius * Math.cos((2 * Math.PI * i) / 6 + angle);
    const y = radius * Math.sin((2 * Math.PI * i) / 6 + angle);
    const point = { x: center.x + x, y: center.y + y };
    corners.push(point);
  }

  return corners;
}

export type LayoutProps = {
  children:
    | React.ReactElement
    | React.ReactElement[]
    | JSX.Element
    | JSX.Element[];
  className?: string;
  flat?: boolean;
  origin?: any;
  /* defines scale */
  size?: Size;
  space?: number;
  spacing?: number;
};

/**
 * Provides LayoutContext for all descendants and renders child elements inside a <g> (Group) element
 */
export function HexgridLayoutProvider({
  size = defaultSize,
  flat = true,
  spacing = defaultSpacing,
  origin = defaultOrigin,
  children,
  className,
  ...rest
}: LayoutProps) {
  const orientation = flat ? LAYOUT_FLAT : LAYOUT_POINTY;
  const angle = flat ? 0 : Math.PI / 6;
  const cornerCoords = calculateCoordinates(size.x, angle);
  const points = cornerCoords.map((point) => `${point.x},${point.y}`).join(" ");
  const childLayout = Object.assign({}, rest, {
    orientation,
    size,
    origin,
    spacing,
  });

  return (
    <Context.Provider
      value={{
        layout: childLayout,
        points,
      }}
    >
      <g className={className}>{children}</g>
    </Context.Provider>
  );
}

export function useLayoutContext() {
  const ctx = React.useContext(Context);
  if (ctx === undefined) {
    throw new Error(
      "useLayoutContext must be used within a HexgridLayoutProvider"
    );
  }
  return ctx;
}
