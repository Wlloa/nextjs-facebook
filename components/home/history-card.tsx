import React from "react";
import { IHistory } from "../../models/history";
import Image from "next/image";
import { StyledProps } from "../../common/props-interface";
import styled from "styled-components";
import { usePersonContext } from "../../context/person-context";

interface ICard extends StyledProps {
  history?: IHistory;
}

interface Logo extends StyledProps {
  logo: string;
  create?: boolean;
}

const _UserLogo = (props: Logo): JSX.Element => {
  const { logo, className } = props;
  return (
    <div className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo} width={30} height={30} alt="" />
    </div>
  );
};

const UserLogo = styled(_UserLogo)`
  position: relative;
  display: inline-block;
  top: 12px;
  left: 12px;
  z-index: 5;
  > img {
    border-radius: 50%;
    border: 2px solid #1877f2;
  }
`;

const ImageDiv = styled.div`
  background-image: ${({ logo }: Logo): string => `url(${logo})`};
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  width: 105px;
  height: 190px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: scale(1.01);
  }
`;

const CreateStory = styled.div`
  background-color: #ffffff;
  padding: 28px 12px 12px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;

  div {
    position: absolute;
    top: -22px;
    width: 40px;
    height: 40px;
    background-color: #1877f2;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/9hjSjlsfbAc.png);
      background-position: -63px -128px;
      background-size: auto;
      width: 20px;
      height: 20px;
      background-repeat: no-repeat;
      display: inline-block;
      filter: invert(100%);
    }
  }

  span {
    color: #505050;
    font-weight: 600;
    font-size: 13px;
    line-height: 1.2;
  }
`;

const _HistoryCard = ({ history, className }: ICard) => {
  const {person} = usePersonContext();
  
  return (
    <li className={className}>
      {history ? (
        <ImageDiv logo={history.postPicture}>
          <UserLogo logo={person?.image} />
        </ImageDiv>
      ) : (
        <ImageDiv logo={person?.image}>
          <div></div>
          <CreateStory>
            <div>
              <i data-visualcompletion="css-img"></i>
            </div>
            <span>Create Story</span>
          </CreateStory>
        </ImageDiv>
      )}
    </li>
  );
};

export const HistoryCard = styled(_HistoryCard)`
  margin-right: 8px;
  cursor: pointer;
`;
