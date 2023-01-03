import React from "react";
import { HexgridLayoutProvider } from "./HexgridLayout";
import Hexagon from "./Hexagon";
import "./hexgrid-styles.css";
import { useWindowSize } from "../useWindowSize";
import { HexCoordinates } from "./types";
import { HexText } from "./HexText";
import { hexUtilsSubtract } from "./hex-utils";
import { generateRectangleHexgrid } from "./hex-utils copy";
import styled from "styled-components";

export const Hexgrid = () => {
  const size = useWindowSize();
  console.log("🚀 ~ file: Hexgrid.tsx:11 ~ Hexgrid ~ size", size);
  const shiftMapToOrigin = (hexes: HexCoordinates[]): HexCoordinates[] => {
    const northWestHex = hexes[0];
    const newHexes = hexes.map((hex) => {
      return hexUtilsSubtract(hex, northWestHex);
    });
    return newHexes;
  };
  // const hexagons = shiftMapToOrigin(GridGenerator.parallelogram(0, 2, 0, 2));
  const hexagons = generateRectangleHexgrid(1, 1);
  const hexagonSize = 10;
  // const hexagons = shiftMapToOrigin(GridGenerator.hexagon(1));
  return (
    <StyledDiv>
      <svg
        width={"100vw"}
        height={"100vw"}
        viewBox={`-50 -50 100 100`}
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
const StyledDiv = styled.div``;
