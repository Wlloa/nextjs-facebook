import React from "react";
import styled from "styled-components";
import { StyledProps } from "../../common/props-interface";
import { IHistory } from "../../models/history";
import { HistoryCard } from "./history-card";

interface HistoryProps extends StyledProps {
  histories: IHistory[];
}

const ArrowRight = styled.div`
  position: absolute;
  left: calc(100% - 30px);
  top: calc(50% - 20px);
  color: var(--color-white);
  z-index: 5;

  a {
    display: flex;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #65676b;
    position: relative;
    background-color: var(--color-white);
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

    i {
      background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/9hjSjlsfbAc.png);
      background-position: -21px -86px;
      background-size: auto;
      width: 20px;
      height: 20px;
      background-repeat: no-repeat;
      display: inline-block;
      filter: invert(39%) sepia(21%) saturate(200%) saturate(109.5%)
        hue-rotate(174deg) brightness(94%) contrast(86%);
    }
  }
`;

const _HistoryCards = (props: HistoryProps): JSX.Element => {
  const { histories, className } = props;
  return (
    <div className={className}>
      <ul>
        <HistoryCard />
        {histories?.map((history) => (
          <HistoryCard history={history} key={history.id} />
        ))}
      </ul>
      <ArrowRight>
        <a href="">
          <i></i>
        </a>
      </ArrowRight>
    </div>
  );
};

export const HistoryCards = styled(_HistoryCards)`
  position: relative;
  ul {
    display: flex;
    overflow-x: hidden;
    padding-top: 24px;
    height: 220px;
  }
`;
