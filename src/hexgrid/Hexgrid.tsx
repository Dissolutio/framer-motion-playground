import React, { useState } from "react";
import { HexgridLayoutProvider } from "./HexgridLayout";
import Hexagon from "./Hexagon";
import "./hexgrid-styles.css";
import { HexCoordinates } from "./types";
import { HexText } from "./HexText";
import { hexUtilsSubtract } from "./hex-utils";
import {
  generateHexagonHexgrid,
  generateRectangleHexgrid,
} from "./hex-utils copy";
import styled from "styled-components";
import { SvgMapControls } from "./SvgMapControls";

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
  const [matrixTransform, setMatrixTransform] = useState<number[]>([
    1, 0, 0, 1, 0, 0,
  ]);
  const matrixString = matrixTransform.join(" ");
  const panMap = (x: number, y: number) => {
    const newMatrix = [...matrixTransform];
    newMatrix[4] += x;
    newMatrix[5] += y;
    setMatrixTransform(newMatrix);
  };
  const centerX = viewbox.width / 2;
  const centerY = viewbox.height / 2;
  const zoomMap = (scale: number) => {
    const newMatrix = [...matrixTransform];
    for (var i = 0; i < 6; i++) {
      newMatrix[i] *= scale;
    }
    newMatrix[4] += (1 - scale) * centerX;
    newMatrix[5] += (1 - scale) * centerY;
    setMatrixTransform(newMatrix);
  };
  return (
    <StyledDiv>
      <HexgridLayoutProvider
        size={{ x: hexagonSize, y: hexagonSize }}
        spacing={1.0}
        flat={false}
      >
        <svg
          width={"100%"}
          height={"100%"}
          viewBox={toStringViewBox(
            viewbox.minX,
            viewbox.minY,
            viewbox.width,
            viewbox.height
          )}
          style={{ background: "indianred" }}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className={"hexgrid"} transform={`matrix(${matrixString})`}>
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
          </g>
          <SvgMapControls panMap={panMap} zoomMap={zoomMap} />
        </svg>
      </HexgridLayoutProvider>
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
): {
  height: number;
  minY: number;
  width: number;
  minX: number;
} => {
  const a = (hexSize * Math.sqrt(3)) / 2; // apothem
  let height: number = 100;
  let minY: number = -50;
  let width: number = 100;
  let minX: number = -50;
  switch (mapShape) {
    case "rectangle":
      height = 2 * hexSize + (mapHeight - 1) * 1.5 * hexSize; // 2r+(n-1)1.5r
      minY = -1 * hexSize; // -r
      width = 2 * a * mapWidth + (mapHeight > 1 ? a : 0); // 2an + odd-row shift (a second row of hexes will be shifted further right than the first row)
      minX = -1 * a; // -a
      return { minX, minY, width, height };
    case "unshiftedHexagon":
      height = 2 * (hexSize + 1.5 * (mapSize * hexSize)); // 2(r + 1.5nr)
      minY = (-1 * height) / 2;
      width = 2 * a * (2 * mapSize + 1); // 2a(2n+1)
      minX = -1 * a * (2 * mapSize + 1); // -a(1+2n)
      return { minX, minY, width, height };
    case "shiftedHexagon":
      height = 2 * (hexSize + 1.5 * (mapSize * hexSize)); // 2(r + 1.5nr)
      minY = (-1 * height) / 2;
      width = 2 * a * (2 * mapSize + 1); // 2a(2n+1)
      minX = -1 * a; // -a
      return { minX, minY, width, height };
    default:
      return { minX, minY, width, height };
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
