import Header from "../header/header";
import { Outlet } from "react-router-dom";
import React from "react";
import SideBar from "../side-bar/side-bar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  padding: 4rem;
  background-color: var(--color-grey-50);
  overflow-y: scroll;
`;
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
const AppLayout: React.FC = () => {
  return (
    <StyledAppLayout>
      <SideBar />
      <Header />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
};

export default AppLayout;
