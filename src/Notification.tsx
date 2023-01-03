import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

export type Noti = {
  id: string;
  text: string;
  style: string;
};
export const removeNoti = (arr: Noti[], idToRemove: string) => {
  const newArr = [...arr];
  newArr.splice(
    newArr.findIndex((i) => i.id === idToRemove),
    1
  );
  return newArr;
};

let newIndex = 0;
export const addNoti = (arr: Noti[], text: string, style: string) => {
  newIndex = newIndex + 1;
  return [...arr, { id: `${newIndex}`, text: text, style: style }];
};

const notificationVariants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.2,
    transition: { duration: 0.1 },
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.2,
    transition: { ease: "easeOut", duration: 0.15 },
  },
  hover: { scale: 1.05, transition: { duration: 0.1 } },
};

const styleType = (style: string) => {
  // Controlled by selection menu
  switch (style) {
    case "success":
      return { background: "linear-gradient(15deg, #6adb00, #04e800)" };
    case "error":
      return { background: "linear-gradient(15deg, #ff596d, #d72c2c)" };
    case "warning":
      return { background: "linear-gradient(15deg, #ffac37, #ff9238)" };
    case "light":
      return { background: "linear-gradient(15deg, #e7e7e7, #f4f4f4)" };
    case "dark":
      return { background: "linear-gradient(15deg, #202121, #292a2d)" };
    default:
      return { background: "linear-gradient(15deg, #202121, #292a2d)" };
  }
};
type Props = {
  notifications: Noti[];
  setNotifications: React.Dispatch<React.SetStateAction<Noti[]>>;
  notification: Noti;
};
const Notification = ({
  notifications,
  setNotifications,
  notification,
}: Props) => {
  const { text, style, id } = notification;
  const handleClose = () => setNotifications(removeNoti(notifications, id));

  return (
    <StyledMotionLi
      layout
      style={styleType(style)} // Change the style based on style selection
      variants={notificationVariants} // Defined animation states
      whileHover="hover" // Animation on hover gesture
      initial="initial" // Starting animation
      animate="animate" // Values to animate to
      exit="exit" // Target to animate to when removed from the tree
    >
      <StyledH3 style={{ color: style ? "#030303" : "#929292" }}>
        {text}
      </StyledH3>
      <CloseButton
        color={style ? "#030303" : "#989898"}
        handleClose={handleClose}
      />
    </StyledMotionLi>
  );
};
const StyledMotionLi = styled(motion.li)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 225px;
  height: 3rem;
  margin: 0.5rem 1.5rem;
  padding: 0 1rem;
  border-radius: 4px;
`;
const StyledH3 = styled.h3`
  /* .noti-h3 */
  text-align: center;
  color: var(--dark);
  font-weight: 700;
  font-size: 2rem;
  letter-spacing: 1px;
  font-family: "Montserrat", sans-serif;
  padding: 2rem 0 1.5rem 0;
  margin: 0;
  text-transform: capitalize;
  /* .notification-text */
  margin: auto auto auto 0;
  padding: 0;
  font-size: 100%;
  font-weight: 600;
  letter-spacing: 0.25px;
  font-family: "Montserrat", sans-serif;
`;
type PathProps = {
  d: string;
  color: string;
};
const Path = ({ d, color }: PathProps) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke={color}
    strokeLinecap="square"
    d={d}
  />
);
type CloseButtonProps = {
  handleClose: () => void;
  color: string;
};
const CloseButton = ({ handleClose, color }: CloseButtonProps) => (
  <StyledMotionDiv whileHover={{ scale: 1.2 }} onClick={handleClose}>
    <svg width="18" height="18" viewBox="0 0 23 23">
      <path></path>
      <Path color={color} d="M 3 16.5 L 17 2.5" />
      <Path color={color} d="M 3 2.5 L 17 16.346" />
    </svg>
  </StyledMotionDiv>
);
const StyledMotionDiv = styled(motion.div)`
  height: 1.1rem;
  background: transparent;
  border: none;
  outline: none;
  margin: 0 0 0 auto;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }
`;
export default Notification;
