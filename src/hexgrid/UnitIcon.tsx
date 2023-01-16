import React from "react";
import { IconBaseProps } from "react-icons";
import { GiDiabloSkull } from "react-icons/gi";

type Props = {
  hexSize: number;
};
export const UnitIcon = ({ hexSize }: Props) => {
  const iconSize = hexSize || 10;
  const iconXShift = iconSize / -2; // move to left by half of width
  const iconYShift = iconSize / -1.5;
  return (
    <GiDiabloSkull
      x={`${iconXShift}px`}
      y={`${iconYShift}px`}
      style={{
        fill: "white",
        fontSize: `${iconSize}px`,
      }}
    />
  );
};
