import React from "react";
import { HexgridLayoutProvider } from "./HexgridLayout";
import Hexagon from "./Hexagon";
import "./hexgrid-styles.css";
import { HexCoordinates } from "./types";
import { HexText } from "./HexText";
import {
  hexUtilsSubtract,
  generateHexagonHexgrid,
  generateRectangleHexgrid,
} from "./hex-utils";
import styled from "styled-components";

export const Hexgrid = () => {
  // const size = useWindowSize();
  const hexagonSize = 10;
  const mapSize = 10;
  const mapHeight = 17;
  const mapWidth = 33;

  const hexagons = generateRectangleHexgrid(mapWidth, mapHeight);
  const viewbox = calculateViewbox(
    "rectangle",
    mapSize,
    mapHeight,
    mapWidth,
    hexagonSize
  );

  // const hexagons = shiftMapToOrigin(generateHexagonHexgrid(mapSize));
  // const viewbox = calculateViewbox("shiftedHexagon", mapSize, hexagonSize);

  // const hexagons = generateHexagonHexgrid(mapSize);
  // const viewbox = calculateViewbox("unshiftedHexagon", mapSize, hexagonSize);

  return (
    <StyledDiv>
      <svg
        width={"100%"}
        height={"100%"}
        viewBox={viewbox}
        style={{ background: "indianred" }}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <HexgridLayoutProvider
          size={{ x: hexagonSize, y: hexagonSize }}
          spacing={1.0}
          flat={false}
        >
          <>
            {/* <polygon points="0,20 10,5 10,15 20,0" /> */}
            {/* <circle cx="0" cy="0" r="10" /> */}
            {hexagons.map((hex, i) => (
              <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s}>
                <HexText
                  hexSize={hexagonSize}
                  y={0}
                >{`${hex.q},${hex.r},${hex.s}`}</HexText>
              </Hexagon>
            ))}
          </>
        </HexgridLayoutProvider>
      </svg>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100vh;
`;

const shiftMapToOrigin = (hexes: HexCoordinates[]): HexCoordinates[] => {
  const northWestHex = hexes[0];
  const newHexes = hexes.map((hex) => {
    return hexUtilsSubtract(hex, northWestHex);
  });
  return newHexes;
};
const calculateViewbox = (
  mapShape: string,
  mapSize: number,
  mapHeight: number,
  mapWidth: number,
  hexSize: number
) => {
  const a = (hexSize * Math.sqrt(3)) / 2; // apothem
  let height: number = 100;
  let yShift: number = -50;
  let width: number = 100;
  let xShift: number = -50;
  switch (mapShape) {
    case "rectangle":
      height = 2 * hexSize + (mapHeight - 1) * 1.5 * hexSize; // 2r+(n-1)1.5r
      yShift = -1 * hexSize; // -r
      width = 2 * a * mapWidth + (mapHeight > 1 ? a : 0); // 2an + odd-row shift (a second row of hexes will be shifted further right than the first row)
      xShift = -1 * a; // -a
      return toStringViewBox(xShift, yShift, width, height);
    case "unshiftedHexagon":
      height = 2 * (hexSize + 1.5 * (mapSize * hexSize)); // 2(r + 1.5nr)
      yShift = (-1 * height) / 2;
      width = 2 * a * (2 * mapSize + 1); // 2a(2n+1)
      xShift = -1 * a * (2 * mapSize + 1); // -a(1+2n)
      return toStringViewBox(xShift, yShift, width, height);
    case "shiftedHexagon":
      height = 2 * (hexSize + 1.5 * (mapSize * hexSize)); // 2(r + 1.5nr)
      yShift = (-1 * height) / 2;
      width = 2 * a * (2 * mapSize + 1); // 2a(2n+1)
      xShift = -1 * a; // -a
      return toStringViewBox(xShift, yShift, width, height);
    default:
      return toStringViewBox(xShift, yShift, width, height);
  }
};
const toStringViewBox = (
  x: number,
  y: number,
  w: number,
  h: number
): string => {
  return `${x} ${y} ${w} ${h}`;
};
