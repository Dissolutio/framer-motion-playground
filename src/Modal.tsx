import { motion } from "framer-motion";
import styled from "styled-components";
import Backdrop from "./Backdrop";
import { StyledButton, styledButtonTransforms } from "./StyledButton";

export const dropInVariants = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};
const CloseModalButton = styled(StyledButton)`
  padding: 0 2rem;
  height: 2.5rem;
  margin: 2rem auto 1rem 0;
  background: #101111;
  /* border: 1px dashed #9a9a9a99; */
  color: #ffaa00;
  border-radius: 4px;
  transition: background ease 400ms;
  box-shadow: 1px 1px 15px #03030399;
`;
type Props = {
  handleClose: () => void;
  text: string;
};
const Modal = ({ handleClose, text }: Props) => {
  return (
    <Backdrop onClick={handleClose}>
      <StyledModalWrapper
        onClick={(e) => e.stopPropagation()}
        variants={dropInVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <StyledModalGuts>
          <p>{text}</p>
          <CloseModalButton {...styledButtonTransforms} onClick={handleClose}>
            Close
          </CloseModalButton>
        </StyledModalGuts>
      </StyledModalWrapper>
    </Backdrop>
  );
};
const StyledModalWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 600px;
  max-width: 100%;
  height: 400px;
  max-height: 100%;
`;
const StyledModalGuts = styled.div`
  /* cover the modal */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /* spacing as needed */
  padding: 20px 50px 20px 20px;

  /* let it scroll */
  overflow: auto;
`;
export default Modal;
