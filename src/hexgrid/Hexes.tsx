import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import Hexagon from "./Hexagon";
import { HexText } from "./HexText";
import styled from "styled-components";
import { HexCoordinates } from "./types";
import { UnitIcon } from "./UnitIcon";

type MapHexesProps = {
  hexSize: number;
  hexes: HexCoordinates[];
};

export const Hexes = ({ hexSize, hexes }: MapHexesProps) => {
  const idWithUnit = "0,0,0";
  return (
    <>
      {hexes.map((hex, i) => (
        <Hexagon
          key={i}
          q={hex.q}
          r={hex.r}
          s={hex.s}
          data={hex}
          // onClick={onClickHex}
          // className={hexClassNames(hex)}
        >
          <g>
            {generateHexID(hex) === idWithUnit && (
              <AnimatePresence initial={false}>
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <UnitIcon hexSize={hexSize} />
                </motion.g>
              </AnimatePresence>
            )}
            <HexIDText
              hexSize={hexSize}
              text={generateHexID(hex)}
              // textLine2={`0`}
            />
          </g>
        </Hexagon>
      ))}
    </>
  );
};
export function generateHexID(hex: HexCoordinates) {
  return `${hex.q},${hex.r},${hex.s}`;
}
const HexIDText = ({
  hexSize,
  text,
  textLine2,
}: {
  hexSize: number;
  text: string;
  textLine2?: string;
}) => {
  return (
    <>
      <HexText
        hexSize={hexSize}
        className="maphex_altitude-text"
        y={hexSize * 0.6}
      >
        {text.toString()}
      </HexText>
      {textLine2 && (
        <HexText
          hexSize={hexSize}
          className="maphex_altitude-text"
          y={hexSize * 0.8}
        >
          {textLine2.toString()}
        </HexText>
      )}
    </>
  );
};

type MapHexStylesProps = {
  hexSize: number;
};
export const MapHexStyles = styled.div<MapHexStylesProps>`
  height: 100%;
  overflow: scroll;
  // Style Hex Text
  .maphex_altitude-text {
    fill: var(--sub-white);
    font-size: ${(props) => `${props.hexSize / 75}rem`};
  }
`;
