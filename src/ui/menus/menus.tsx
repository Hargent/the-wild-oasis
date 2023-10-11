import { useContext, useState } from "react";

import { HiEllipsisVertical } from "react-icons/hi2";
import { StyleProps } from "../../utils/types/styled-component-props";
import { createContext } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<StyleProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position?.x ?? 0}px;
  top: ${(props) => props.position?.y ?? 0}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

type contextType = {
  openId?: number;
  open?: (id: number) => void;
  close?: () => void;
  position?: { x: number; y: number };
  handleSetPosition?: (position: { x: number; y: number }) => void;
};
type StateType = { x?: number; y?: number };

type MenusProps = {
  children: React.ReactElement;
};

type ListProps = {
  id: number;
  children: React.ReactElement[] | React.ReactElement;
};
type ToggleProps = {
  id: number;
};
type ButtonProps = {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
};
const MenusContext = createContext<contextType>({});
const Menus: React.FC<MenusProps> & {
  Menu: typeof Menu;
  List: typeof List;
  Toggle: typeof Toggle;
  Button: typeof Button;
} = ({ children }) => {
  const [openId, setOpenId] = useState(0);
  const [position, setPosition] = useState<StateType>({});
  const open = (id: number) => {
    setOpenId(id);
  };
  const close = () => {
    console.log("closing");

    setOpenId(0);
  };
  const handleSetPosition = (position: { x: number; y: number }) => {
    setPosition({
      x: position.x,
      y: position.y
    });
  };
  return (
    <MenusContext.Provider
      value={{
        open,
        openId,
        close,
        handleSetPosition,
        position: {
          x: position?.x ?? 0,
          y: position?.y ?? 0
        }
      }}
    >
      {children}
    </MenusContext.Provider>
  );
};

const List: React.FC<ListProps> = ({ id, children }) => {
  const { openId, position } = useContext(MenusContext);
  // console.log(position);

  if (openId !== id) return null;
  return createPortal(
    <StyledList position={position}>{children}</StyledList>,
    document.body
  );
};
const Toggle: React.FC<ToggleProps> = ({ id }) => {
  const { open, openId, close, handleSetPosition } = useContext(MenusContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const targetButton = e.target as HTMLElement | null;
    const buttonElement = targetButton?.closest(
      "button"
    ) as HTMLButtonElement | null;

    if (buttonElement) {
      const rect = buttonElement.getBoundingClientRect();

      // if (openId === 0 && ) return;

      openId !== id
        ? (open?.(id),
          handleSetPosition?.({
            x: window.innerWidth - rect.width - rect.x,
            y: rect.height + rect.y + 8
          }))
        : close?.();
    }
  };
  return (
    <StyledToggle onClick={(e) => handleClick(e)}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  icon
}) => {
  return (
    <li>
      <StyledButton onClick={onClick} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.List = List;
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.Button = Button;

export default Menus;
