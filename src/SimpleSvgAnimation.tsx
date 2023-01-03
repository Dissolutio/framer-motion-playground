import styled from "styled-components";

export const SimpleSvgAnimation = () => {
  return (
    <StyledDiv>
      <svg
        className="logo-framer-motion"
        width="236"
        height="236"
        viewBox="0 0 236 236"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <circle
            cx="118"
            cy="114"
            r="111.5"
            stroke="#E500C6"
            stroke-width="5"
          />
          <circle cx="118" cy="114" r="90.5" fill="#E500C6" stroke="#E500C6" />
          <path
            className="path-framer-motion"
            d="M71 50H164V96.3333H117.5L71 50ZM71 96.3333H117.5L164 142.667H71V96.3333ZM71 142.667H117.5V189L71 142.667Z"
            fill="black"
          />
        </g>
      </svg>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  background: #1a1a1a;
  .logo-framer-motion {
    fill: transparent;
    animation: logo-framer-motion 6s ease infinite alternate;

    .path-framer-motion {
      fill: transparent;
      animation: path-framer-motion 4500ms ease-in infinite alternate;
    }
  }

  @keyframes path-framer-motion {
    0% {
      fill: #222;
      filter: blur(0);
    }
    25% {
      fill: transparent;
      filter: blur(1px);
    }
    45% {
      fill: #333;
      filter: blur(1px);
    }
    60% {
      fill: #333;
      filter: blur(0);
    }
    100% {
      fill: #ffffff;
      filter: blur(0);
    }
  }

  @keyframes logo-framer-motion {
    0% {
      stroke-width: 0;
      stroke-dasharray: 0 100;
      stroke-dashoffset: 100;
    }
    25% {
      stroke-dasharray: 125 0;
      stroke-dashoffset: 125;
    }
    35% {
      stroke-dasharray: 150 0;
      stroke-dashoffset: 150;
    }

    50% {
      stroke-dasharray: 200 0;
      stroke-dashoffset: 200;
    }
    60% {
      stroke-dasharray: 0 200;
      stroke-dashoffset: 200;
    }
    85% {
      stroke-width: 0;
      stroke-dasharray: 350 0;
      stroke-dashoffset: 350;
    }
    100% {
      stroke-dasharray: 450 0;
      stroke-dashoffset: 450;
      stroke-width: 0.3;
    }
  }
`;
