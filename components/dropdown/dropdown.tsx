import React, { useState } from "react";
import styled from "styled-components";
import { StyledProps } from "../../common/props-interface";
import { Icon, MenuItem } from "../navbar/menu";
import { signOut } from "next-auth/react";

const Container = styled.div`
  width: 360px;
  position: absolute;
  display: flex;
  box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  margin-top: 5px;
  margin-right: 20px;
  background-color: var(--color-white);
  right: 0;
  z-index: 10;
  border-radius: 8px;

  &:hover {
    background-color: var(--color-gray);
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 0 8px;
  width: 100%;
  cursor: pointer;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.05);
    margin-right: 12px;
  }

  span {
    font-size: 15px;
    font-weight: 700;
  }
`;

export const Dropdown = (props: StyledProps) => {
  const { className } = props;
  const [showDropDown, setShowDropDown] = useState(false);

  const showDropHandler = () => {
    setShowDropDown((current) => !current);
  };

  const logoutHandler = () => {
    signOut();  
    setShowDropDown(false);
  };

  return (
    <div className={className}>
      <MenuItem
        url="/static/miscellanea/R3l5SniutOc.png"
        posX={-126}
        posY={-128}
        height={20}
        width={20}
        onClick={showDropHandler}
      />
      {showDropDown && (
        <Container>
          <Item onClick={logoutHandler}>
            <div>
              <Icon
                url="/static/miscellanea/wKSLeEJDPX5.png"
                posX={0}
                posY={-146}
                height={20}
                width={20}
              />
            </div>
            <span>Log Out</span>
          </Item>
        </Container>
      )}
    </div>
  );
};
