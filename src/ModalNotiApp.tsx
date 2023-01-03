import React, { useState } from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import Notification, { addNoti, Noti } from "./Notification";
import { StyledButton, styledButtonTransforms } from "./StyledButton";

const OpenModalButton = styled(StyledButton)`
  padding: 0 1rem;
  margin: 2rem auto auto 0;
  background: var(--gradient);
  color: var(--dark);
`;
const AddNotiButton = styled(StyledButton)`
  padding: 0 1rem;
  margin: 2rem auto auto 0;
  background: var(--gradient2);
  color: var(--dark);
`;
export function ModalNotiApp() {
  // Modal state
  const [modalOpen, setModalOpen] = useState<string>("");
  const close = () => setModalOpen("");
  const open = () =>
    setModalOpen(`
    hI!
  `);

  // Notifications state
  const [notifications, setNotifications] = useState<Noti[]>([]);
  const text = "Yo buddy!!!";
  const style = "warning";

  return (
    <div>
      <OpenModalButton
        {...styledButtonTransforms}
        onClick={() => (modalOpen ? close() : open())}
      >
        Launch modal
      </OpenModalButton>
      <>
        <AddNotiButton
          {...styledButtonTransforms}
          onClick={() => setNotifications(addNoti(notifications, text, style))}
        >
          + Stack em up
        </AddNotiButton>

        <NotificationContainer>
          <>
            {notifications &&
              notifications.map((notification) => (
                <Notification
                  key={notification.id}
                  notification={notification}
                  notifications={notifications}
                  setNotifications={setNotifications}
                />
              ))}
          </>
        </NotificationContainer>
      </>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {modalOpen && <Modal text={modalOpen} handleClose={close} />}
      </AnimatePresence>
    </div>
  );
}

type NCProps = {
  children: React.ReactNode;
};
const NotificationContainer = ({ children }: NCProps) => {
  return (
    <StyledListDiv>
      <StyledUL>
        <AnimatePresence initial={false}>{children}</AnimatePresence>
      </StyledUL>
    </StyledListDiv>
  );
};
const StyledListDiv = styled.div`
  display: flex;
  width: 50vw;
  height: 50%;
  margin: auto;
`;
const StyledUL = styled.ul`
  /* bottom position */
  justify-content: flex-end;
  /* top position */
  /* justify-content: flex-start; */
  position: fixed;
  top: 0.5rem;
  bottom: 0.5rem;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  list-style: none;
`;
