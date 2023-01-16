import React from "react";
import { IconBaseProps } from "react-icons";
import { GiDiabloSkull } from "react-icons/gi";

type Props = IconBaseProps & {
  hexSize?: number;
  iconProps?: {
    x: string;
    y: string;
  };
};
export const UnitIcon = ({ hexSize, iconProps, ...rest }: Props) => {
  const iconSize = hexSize || 10;
  const iconXShift = iconSize / -2;
  const iconYShift = iconSize / -1.5;
  const gameIconProps = {
    x: iconProps?.x ?? `${iconXShift}px`,
    y: iconProps?.x ?? `${iconYShift}px`,
    style: {
      fill: "white",
      fontSize: iconProps?.x ?? `${iconSize}px`,
    },
    ...rest,
  };
  return <GiDiabloSkull {...gameIconProps} />;
};
