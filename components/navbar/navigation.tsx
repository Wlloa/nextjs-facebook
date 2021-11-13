import React from "react";
import Home from "../../public/static/miscellanea/home.svg";
import Watch from "../../public/static/miscellanea/watch.svg";
import Groups from "../../public/static/miscellanea/groups.svg";
import Gaming from "../../public/static/miscellanea/gaming.svg";
import styled from "styled-components";
import { useRouter } from "next/router";

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
  const router = useRouter();
  
  const goToHome = () => {
    router.push('/');
  }

  return (
    <UList>
      <ItemList>
        <a href="javascript:" onClick={goToHome}>
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
