import React from "react";
import styled from "styled-components";
import Logo from "../logo/logo";
import MainNav from "../main-nav/main-nav";
import Uploader from "../../data/uploader";

const StyledSideBar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1/-1;

  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
const SideBar: React.FC = () => {
  return (
    <StyledSideBar>
      <Logo />
      <MainNav />

      <Uploader />
    </StyledSideBar>
  );
};

export default SideBar;
