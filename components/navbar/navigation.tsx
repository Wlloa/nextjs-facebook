import React from "react";
import Home from "../../public/static/miscellanea/home.svg";
import Watch from "../../public/static/miscellanea/watch.svg";
import Groups from "../../public/static/miscellanea/groups.svg";
import Gaming from "../../public/static/miscellanea/gaming.svg";
import styled from "styled-components";

const UList = styled.ul`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  @media(max-width: 1200px) {
    display: none;
  }
`;

const ItemList = styled.li`
  max-width: 129.6px;
  min-width: 50px;
  text-align: center;
  width: 100%;

  svg {
    opacity: 0.6;
  }
`;

export const Navigation = ():JSX.Element => {
  return (
    <UList>
      <ItemList>
        <a href="">
          <Home />
        </a>
      </ItemList>
      <ItemList>
        <a href="">
          <Watch />
        </a>
      </ItemList>
      <ItemList>
        <a href="">
          <Groups />
        </a>
      </ItemList>
      <ItemList>
        <a href="">
          <Gaming />
        </a>
      </ItemList>
    </UList>
  );
};
