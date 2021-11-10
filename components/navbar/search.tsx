import React from "react";
import styled from "styled-components";
import { StyledProps } from "../../common/props-interface";

const IconContainer = styled.div`
  position: absolute;
  left: 80px;
  top: 19px;
  pointer-events: none;
`;

const Icon = styled.i`
  background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/hJZ1eqFsX3d.png);
  background-position: -119px -149px;
  background-size: 189px 183px;
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  display: inline-block;
  opacity: 0.6;
`;

const _Search = ({ className }: StyledProps): JSX.Element => {
  return (
    <div className={className}>
      <IconContainer>
        <Icon data-visualcompletion="css-img" />
      </IconContainer>
      <input
        type="search"
        aria-autocomplete="list"
        aria-label="Search Facebook"
        role="combobox"
        aria-expanded="false"
        aria-controls=""
        placeholder="Search Facebook"
      />
    </div>
  );
};

export const Search = styled(_Search)`
  input[type="search"] {
    max-width: 240px;
    height: 40px;
    padding: 7px 16px 9px 36px;
    border: 0;
    outline: none;
    border-top-right-radius: 50px;
    border-top-left-radius: 50px;
    border-bottom-right-radius: 50px;
    border-bottom-left-radius: 50px;
    background-color: #f0f2f5;
    margin-left: 12px;
    color: #505050;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    > div {
      width: 40px;
      height: 40px;
      background-color: var(--color-gray);
      top: unset;
      left: 65px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
    input {
      display: none;
    }
  }
`;
