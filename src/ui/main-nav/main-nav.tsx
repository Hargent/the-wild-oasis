import styled from "styled-components";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
const NavItem = styled.li`
  list-style: none;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;
import React from "react";
import { NavLink } from "react-router-dom";
import {
  HiBuildingOffice2,
  HiCalendarDays,
  HiOutlineCog8Tooth,
  HiOutlineHomeModern,
  HiOutlineUsers
} from "react-icons/hi2";
const MainNav: React.FC = () => {
  return (
    <nav>
      <NavList>
        <NavItem>
          <StyledNavLink to="/dashboard">
            <HiOutlineHomeModern />
            <span>Home</span>
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/bookings">
            <HiCalendarDays />
            <span>Bookings</span>
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/cabins">
            <HiBuildingOffice2 />
            <span>Cabins</span>
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/users">
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/settings ">
            <HiOutlineCog8Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </NavItem>
      </NavList>
    </nav>
  );
};

export default MainNav;
