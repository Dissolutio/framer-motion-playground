import * as React from "react";
import { useLayoutContext } from "./HexgridLayout";
import { HexCoordinates } from "./types";
import { hexUtilsHexToPixel } from "./hex-utils";

type HexagonProps = HexCoordinates & {
  data?: any;
  onClick?: HexagonMouseEventHandler;
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
};

type H = { state: { hex: HexCoordinates }; props: HexagonProps; data?: any };

type HexagonMouseEventHandler = (
  event: React.MouseEvent<SVGGElement, MouseEvent>,
  h: H
) => void;

/**
 * Renders a Hexagon cell at the given rqs-based coordinates.
 */
export function Hexagon(props: HexagonProps) {
  const { q, r, s, data, onClick, className, children } = props;
  const { layout, points } = useLayoutContext();
  const { hex, pixel } = React.useMemo(() => {
    const hex = { q, r, s };
    const pixel = hexUtilsHexToPixel(hex, layout);
    return {
      hex,
      pixel,
    };
  }, [q, r, s, layout]);

  const state = { hex };

  return (
    <g
      className={`hexagon-group ${className ?? ""}`}
      transform={`translate(${pixel.x}, ${pixel.y})`}
      onClick={(e) => {
        onClick?.(e, { data, state, props });
      }}
    >
      <g className="hexagon">
        <polygon points={points} />
        {children}
      </g>
    </g>
  );
}

export default Hexagon;
