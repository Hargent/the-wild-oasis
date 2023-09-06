import React, {
  cloneElement,
  createContext,
  useContext,
  useState
} from "react";

import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import styled from "styled-components";
import useCloseModal from "../../utils/hooks/use-outside-modal-click";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
// TYPES
type ModalProps = {
  children: React.ReactNode;
};
type contextType = {
  open?: (name: string) => void;
  close?: () => void;
  openName?: string;
};
interface OpenProps {
  children: React.ReactElement;
  opens: string;
}

interface WindowProps {
  children: React.ReactElement;
  name: string;
}
//
const ModalContext = createContext<contextType>({});

const Modal: React.FC<ModalProps> & {
  Window: typeof Window;
  Open: typeof Open;
} = ({ children }) => {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
};
// MODAL ATTRIBUTES
const Open: React.FC<OpenProps> = ({ children, opens: opensWindowName }) => {
  const { open } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => open?.(opensWindowName)
  });
};
const Window: React.FC<WindowProps> = ({ children, name }) => {
  const { openName, close } = useContext(ModalContext);
  const { ref } = useCloseModal(close);

  if (name !== openName) return;
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    // document.getElementById("root")!
    document.body
  );
};
// DEFINING ATTRIBUTES
Modal.Window = Window;
Modal.Open = Open;
//
export { ModalContext };
export default Modal;
// interface Props {
//   children: React.ReactNode;
//   onClose: () => void;
// }

// const Modal: React.FC<Props> = ({ children, onClose }) => {
//   return createPortal(
//     <Overlay>
//       <StyledModal>
//         <Button onClick={onClose}>
//           <HiXMark />
//         </Button>
//         <div>{children}</div>
//       </StyledModal>
//     </Overlay>,
//     // document.getElementById("root")!
//     document.body
//   );
// };

// export default Modal;
