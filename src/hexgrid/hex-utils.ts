import { HexCoordinates, LayoutDimension } from "./types";

const DIRECTIONS = [
  { q: 1, r: 0, s: -1 },
  { q: 1, r: -1, s: 0 },
  { q: 0, r: -1, s: 1 },
  { q: -1, r: 0, s: 1 },
  { q: -1, r: 1, s: 0 },
  { q: 0, r: 1, s: -1 },
];
export const hexUtilsEquals = (
  a: HexCoordinates,
  b: HexCoordinates
): boolean => {
  return a.q === b.q && a.r === b.r && a.s === b.s;
};
export const hexUtilsAdd = (
  a: HexCoordinates,
  b: HexCoordinates
): HexCoordinates => {
  return { q: a.q + b.q, r: a.r + b.r, s: a.s + b.s };
};
export const hexUtilsSubtract = (
  a: HexCoordinates,
  b: HexCoordinates
): HexCoordinates => {
  return { q: a.q - b.q, r: a.r - b.r, s: a.s - b.s };
};
export const hexUtilsMultiply = (
  a: HexCoordinates,
  k: number
): HexCoordinates => {
  return { q: a.q * k, r: a.r * k, s: a.s * k };
};
export const hexUtilsLengths = (hex: HexCoordinates): number => {
  return (Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2;
};
export const hexUtilsDistance = (
  a: HexCoordinates,
  b: HexCoordinates
): number => {
  return hexUtilsLengths(hexUtilsSubtract(a, b));
};
export const hexUtilsDirection = (direction: number): HexCoordinates => {
  return DIRECTIONS[(6 + (direction % 6)) % 6];
};
export const hexUtilsNeighbor = (
  hex: HexCoordinates,
  direction: number
): HexCoordinates => {
  return hexUtilsAdd(hex, hexUtilsDirection(direction));
};
export const hexUtilsNeighbors = (hex: HexCoordinates): HexCoordinates[] => {
  const array: HexCoordinates[] = [];
  for (let i = 0; i < DIRECTIONS.length; i += 1) {
    array.push(hexUtilsNeighbor(hex, i));
  }
  return array;
};
export const hexUtilsRound = (hex: HexCoordinates): HexCoordinates => {
  let rq = Math.round(hex.q);
  let rr = Math.round(hex.r);
  let rs = Math.round(hex.s);

  const qDiff = Math.abs(rq - hex.q);
  const rDiff = Math.abs(rr - hex.r);
  const sDiff = Math.abs(rs - hex.s);

  if (qDiff > rDiff && qDiff > sDiff) rq = -rr - rs;
  else if (rDiff > sDiff) rr = -rq - rs;
  else rs = -rq - rr;

  return { q: rq, r: rr, s: rs };
};

/** Given the q,r,s of a hexagon return the x and y pixel coordinates of the
 * hexagon center.
 */
export const hexUtilsHexToPixel = (
  hex: HexCoordinates,
  layout: LayoutDimension
): { x: number; y: number } => {
  const s = layout.spacing;
  const M = layout.orientation;
  let x = (M.f0 * hex.q + M.f1 * hex.r) * layout.size.x;
  let y = (M.f2 * hex.q + M.f3 * hex.r) * layout.size.y;
  // Apply spacing
  x = x * s;
  y = y * s;
  return { x: x + layout.origin.x, y: y + layout.origin.y };
};

/** Return the q,r,s coordinate of the hexagon given pixel point x and y.
 */
export const hexUtilsPixelToHex = (
  point: { x: number; y: number },
  layout: LayoutDimension
): HexCoordinates => {
  const M = layout.orientation;
  const pt = {
    x: (point.x - layout.origin.x) / layout.size.x,
    y: (point.y - layout.origin.y) / layout.size.y,
  };
  const q = M.b0 * pt.x + M.b1 * pt.y;
  const r = M.b2 * pt.x + M.b3 * pt.y;
  const hex = { q, r, s: -q - r };
  return hexUtilsRound(hex);
};

/** Returns a value that is blended between a and b.
 * For more Information:
 * {@link https://en.wikipedia.org/wiki/Linear_interpolation#Programming_language_support Linear Interpolation Wiki}
 * @param {number} a - left hand value
 * @param {number} b - right hand value
 * @param {number} t - alpha blending value (how much of a or b to be used)
 * @returns {number} a value between a and b based on t
 */
export const hexUtilsLerp = (a: number, b: number, t: number): number => {
  return a + (b - a) * t;
};

/** Calculates the linear interpolation of each Hex coordinate and
 * returns a Hex with the linear interpolated coordiantes.
 * For more Information:
 * {@link https://en.wikipedia.org/wiki/Linear_interpolation#Programming_language_support Linear Interpolation Wiki}
 * @param {HexCoordinates} a - left hand hex
 * @param {HexCoordinates} b - right hand hex
 * @param {number} t - alpha blending value
 * @returns {Hex} new Hex which is between the two Hexes
 */
export const hexUtilsHexLerp = (
  a: HexCoordinates,
  b: HexCoordinates,
  t: number
): HexCoordinates => {
  return {
    q: hexUtilsLerp(a.q, b.q, t),
    r: hexUtilsLerp(a.r, b.r, t),
    s: hexUtilsLerp(a.s, b.s, t),
  };
};

/** Return a string ID from Hex Coordinates.
 * Example: Hex Coordinates of {q: 1, r: 2, s: 3} is returned
 * as string "1,2,3"
 * @param {HexCoordinates} hex - target Hex
 * @returns {string} an ID string in the form `{q},{r},{s}`
 */
export const hexUtilsGetID = (hex: HexCoordinates): string => {
  return `${hex.q},${hex.r},${hex.s}`;
};
export const generateRingHexgrid = (
  center: HexCoordinates,
  mapRadius: number
): HexCoordinates[] => {
  let hexas: HexCoordinates[] = [];
  let hex = hexUtilsAdd(
    center,
    hexUtilsMultiply(hexUtilsDirection(4), mapRadius)
  );
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < mapRadius; j++) {
      hexas.push(hex);
      hex = hexUtilsNeighbor(hex, i);
    }
  }
  return hexas;
};
export const generateSpiralHexgrid = (
  center: HexCoordinates,
  mapRadius: number
): HexCoordinates[] => {
  let results = [center];
  for (let k = 1; k <= mapRadius; k++) {
    const temp = generateRingHexgrid(center, k);
    results = results.concat(temp);
  }
  return results;
};
export const generateParallelogramHexgrid = (
  q1: number,
  q2: number,
  r1: number,
  r2: number
): HexCoordinates[] => {
  let hexas: HexCoordinates[] = [];
  for (let q = q1; q <= q2; q++) {
    for (let r = r1; r <= r2; r++) {
      hexas.push({ q, r, s: -q - r });
    }
  }

  return hexas;
};
export const generateTriangleHexgrid = (mapSize: number): HexCoordinates[] => {
  let hexas: HexCoordinates[] = [];
  for (let q = 0; q <= mapSize; q++) {
    for (let r = 0; r <= mapSize - q; r++) {
      hexas.push({ q, r, s: -q - r });
    }
  }
  return hexas;
};
export const generateHexagonHexgrid = (mapRadius: number): HexCoordinates[] => {
  let hexas: HexCoordinates[] = [];
  for (let q = -mapRadius; q <= mapRadius; q++) {
    let r1 = Math.max(-mapRadius, -q - mapRadius);
    let r2 = Math.min(mapRadius, -q + mapRadius);
    for (let r = r1; r <= r2; r++) {
      hexas.push({ q, r, s: -q - r });
    }
  }
  return hexas;
};
export const generateRectangleHexgrid = (
  mapWidth: number,
  mapHeight: number
): HexCoordinates[] => {
  let hexas: HexCoordinates[] = [];
  for (let r = 0; r < mapHeight; r++) {
    let offset = Math.floor(r / 2); // or r>>1
    for (let q = -offset; q < mapWidth - offset; q++) {
      hexas.push({ q, r, s: -q - r });
    }
  }
  return hexas;
};
export const generateOrientedRectangleHexgrid = (
  mapWidth: number,
  mapHeight: number
): HexCoordinates[] => {
  let hexas: HexCoordinates[] = [];
  for (let q = 0; q < mapWidth; q++) {
    let offset = Math.floor(q / 2); // or q>>1
    for (let r = -offset; r < mapHeight - offset; r++) {
      hexas.push({ q, r, s: -q - r });
    }
  }

  return hexas;
};
