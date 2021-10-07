import React from "react";
import styled from "styled-components";
import Logo from "../../public/static/miscellanea/icon.svg";
import { Menu } from "./menu";
import { Navigation } from "./navigation";
import { Search } from "./search";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px 0 rgb(79 79 79 / 16%);
  z-index: 10;
  padding: 8px 16px;
`;

const SearchContainer = styled.div`
  display: flex;
  height: 40px;
`;

const NavigationContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

const ReservedSpace = styled.div`
  width: 300px;
  height: 56px;
`;

function Navbar():JSX.Element {
  return (
    <Nav>
      {/* logo and search bar */}
      <SearchContainer>
        <Logo />
        <Search />
      </SearchContainer>
      {/* central nav */}
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
      {/* account and settings options*/}
      <Menu></Menu>
    </Nav>
  );
}

export default Navbar;
