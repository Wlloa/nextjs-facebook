import React, { ReactNode } from "react";
import styled from "styled-components";
import Navbar from "../navbar/navbar";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
}

const Container = styled.main`
  background-color: #f0f2f5;
  min-height: calc(100vh - 56px);
  margin-top: 56px;
  width: 100vw;
`;

const Layout = ({ children }: Props): JSX.Element => {
  const router = useRouter();
  const showNavbar = router.pathname !== "/auth";
  return (
    <div>
      {showNavbar && <Navbar />}
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
