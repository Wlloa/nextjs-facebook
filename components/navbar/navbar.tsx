import React from "react";
import styled from "styled-components";
import Logo from "../../public/static/miscellanea/icon.svg";
import { Search } from "./search";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px 0 rgb(79 79 79 / 16%);
  padding: 8px 16px;
`;

const SearchContainer = styled.div`
  display: flex;
  height: 40px;
`;

function Navbar() {
  return (
    <Nav>
      {/* logo and search bar */}
      <SearchContainer>
        <Logo />
        <Search />
      </SearchContainer>
      {/* central nav */}
      <div></div>
      {/* account and settings options*/}
      <div></div>
    </Nav>
  );
}

export default Navbar;
