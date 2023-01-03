import { motion } from "framer-motion";
import styled from "styled-components";
export const styledButtonTransforms = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.9 },
  whileFocus: { scale: 1.1 },
};

export const StyledButton = styled(motion.button)`
  height: 3rem;
  border: none;
  outline: none;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1.25rem;
  font-family: "Montserrat", sans-serif;
  cursor: pointer;
`;
