import React from "react";
import styled from "styled-components";
import { StyledProps } from "../../common/props-interface";
import Messenger from "../../public/static/miscellanea/messenger.svg";
import Notification from "../../public/static/miscellanea/notification.svg";
import Image from "next/image";

interface ItemProps extends StyledProps {
  posX: number;
  posY: number;
}

const IconContainer = styled.div`
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.05);
  height: 40px;
  width: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.i`
  background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/R3l5SniutOc.png);
  background-position: ${({ posX, posY }: ItemProps): string =>
    `${posX}px ${posY}px`};
  background-size: auto;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  display: inline-block;
`;

const AccountContainer = styled.div`
    margin-right: 20px;
  a {
    display: flex;
    align-items: center;
    div {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      margin-right: 6px;
    }
    span {
        font-size: 15px;
        font-weight: 600;
        word-break: break-word;
        word-wrap: break-word;
        white-space: nowrap;
        line-height: 1.33;
        overflow: hidden;
        text-overflow: ellipsis;
    }
  }
`;

export const AccountWidget = (): JSX.Element => {
  return (
    <AccountContainer>
      <a href="">
        <div>
          <Image
            src="/static/miscellanea/me.jpg"
            alt="Wilber"
            width="28"
            height="28"
          />
        </div>
        <span>Wilber</span>
      </a>
    </AccountContainer>
  );
};

export const MenuItem = (props: ItemProps): JSX.Element => {
  const { posX, posY } = props;
  return (
    <IconContainer>
      <Icon posX={posX} posY={posY}></Icon>
    </IconContainer>
  );
};

const UList = styled.ul`
  display: flex;
  li {
    display: flex;
    align-items: center;
    margin-right: 8px;
  }
  li:last-of-type {
    margin-right: 0;
  }
`;

export const Menu = (): JSX.Element => {
  return (
    <div>
      <UList>
        <li>
          <AccountWidget />
        </li>
        <li>
          <MenuItem posX={-126} posY={-107} />
        </li>
        <li>
          <IconContainer>
            <Messenger />
          </IconContainer>
        </li>
        <li>
          <IconContainer>
            <Notification />
          </IconContainer>
        </li>
        <li>
          <MenuItem posX={-126} posY={-128} />
        </li>
      </UList>
    </div>
  );
};