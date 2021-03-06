import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { StyledProps } from "../../common/props-interface";
import Messenger from "../../public/static/miscellanea/messenger.svg";
import Notification from "../../public/static/miscellanea/notification.svg";
import Image from "next/image";
import { Dropdown } from "../dropdown/dropdown";
import { usePersonContext } from "../../context/person-context";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface ItemProps extends StyledProps {
  url: string;
  posX: number;
  posY: number;
  height: number;
  width: number;
  onClick?: () => void;
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

export const Icon = styled.i`
  background-image: url(${({ url }: ItemProps): string => url});
  background-position: ${({ posX, posY }: ItemProps): string =>
    `${posX}px ${posY}px`};
  background-size: auto;
  width: ${({ width }: ItemProps): string => `${width}px`};
  height: ${({ height }: ItemProps): string => `${height}px`};
  background-repeat: no-repeat;
  display: inline-block;
`;

const AccountContainer = styled.div`
  margin-right: 20px;
  
  @media (max-width: 768px) {
    margin-right: 0;
  }

  a {
    display: flex;
    align-items: center;
    div {
      width: 28px;
      height: 28px;
      margin-right: 6px;
      span {
        border-radius: 50%;
      }
      img {
        border-radius: 50%;
      }
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
    @media (max-width: 768px) {
      span {
        display: none;
      }
    }
  }
`;

export const AccountWidget = (): JSX.Element => {
  const { person, fetchUser } = usePersonContext();
  //const { data: session, status } = useSession();

  useEffect(() => {
    if (!person) {
      fetchUser();
    }
  }, [person]);

  const router = useRouter();

  const goToProfile = (e: any) => {
    e.preventDefault();
    if (person) {
      router.push(`/${person.userName}`);
    }
  };

  return (
    <AccountContainer onClick={goToProfile}>
      <a href="">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              person ? person.image : "/static/miscellanea/empty-profile.png"
            }
            alt="profile"
            width="28"
            height="28"
          />
        </div>
        <span>{person?.firstName}</span>
      </a>
    </AccountContainer>
  );
};

export const MenuItem = (props: ItemProps): JSX.Element => {
  const { posX, posY, onClick } = props;
  return (
    <IconContainer onClick={onClick}>
      <Icon
        url="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/R3l5SniutOc.png"
        posX={posX}
        posY={posY}
        height={20}
        width={20}
      ></Icon>
    </IconContainer>
  );
};

const UList = styled.ul`
  display: flex;
  li {
    display: flex;
    align-items: center;
    justify-content: center;
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
          <MenuItem
            url="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/R3l5SniutOc.png"
            posX={-126}
            posY={-107}
            height={20}
            width={20}
          />
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
          <Dropdown />
        </li>
      </UList>
    </div>
  );
};
