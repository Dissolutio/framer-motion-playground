import { motion } from "framer-motion";
import styled from "styled-components";
import { dropInVariants } from "./Modal";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};
const StyledBackdrop = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #000000e1;
  background: var(--gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;
`;
const Backdrop = ({ children, onClick }: Props) => {
  return (
    <StyledBackdrop
      onClick={onClick}
      variants={dropInVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </StyledBackdrop>
  );
};

export default Backdrop;
