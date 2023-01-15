import React from "react";
import styled from "styled-components";

type Props = {
  panMap: (x: number, y: number) => void;
  zoomMap: (scale: number) => void;
};

export const SvgMapControls = ({ panMap, zoomMap }: Props) => {
  const zoomOut = () => {
    zoomMap(0.8);
  };
  const zoomIn = () => {
    zoomMap(1.25);
  };
  const panUp = () => {
    panMap(0, 25);
  };
  const panLeft = () => {
    panMap(25, 0);
  };
  const panDown = () => {
    panMap(0, -25);
  };
  const panRight = () => {
    panMap(-25, 0);
  };
  return (
    <StyledG>
      <circle cx="25" cy="25" r="21" fill="white" opacity="0.75" />
      <path
        className="button"
        onClick={panUp}
        d="M25 5 l6 10 a20 35 0 0 0 -12 0z"
      />
      <path
        className="button"
        onClick={panLeft}
        d="M5 25 l10 -6 a35 20 0 0 0 0 12z"
      />
      <path
        className="button"
        onClick={panDown}
        d="M25 45 l6 -10 a20, 35 0 0,1 -12,0z"
      />
      <path
        className="button"
        onClick={panRight}
        d="M45 25 l-10 -6 a35 20 0 0 1 0 12z"
      />

      <circle className="compass" cx="25" cy="25" r="10" />
      <circle className="button" cx="25" cy="20.5" r="4" onClick={zoomOut} />
      <circle className="button" cx="25" cy="29.5" r="4" onClick={zoomIn} />

      <rect className="plus-minus" x="23" y="20" width="4" height="1" />
      <rect className="plus-minus" x="23" y="29" width="4" height="1" />
      <rect className="plus-minus" x="24.5" y="27.5" width="1" height="4" />
    </StyledG>
  );
};

const StyledG = styled.g`
  .compass {
    fill: #fff;
    stroke: #000;
    stroke-width: 1;
  }
  .button {
    fill: #225ea8;
    stroke: #0c2c84;
    stroke-width: 0.5;
    stroke-miterlimit: 6;
    stroke-linecap: round;
  }
  .button:hover {
    stroke-width: 1;
  }
  .plus-minus {
    fill: #fff;
    pointer-events: none;
  }
`;
