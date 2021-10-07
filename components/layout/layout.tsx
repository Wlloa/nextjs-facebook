import React, { Fragment, ReactNode } from "react";
import styled from "styled-components";
import Navbar from "../navbar/navbar";

interface Props {
  children: ReactNode;
}

const Container = styled.main`
  background-color: #f0f2f5;
  min-height: calc(100vh - 56px);
`;

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div>
      <Navbar />
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
