import React from "react";
import styled from "styled-components";
import { StyledProps } from "../../common/props-interface";
import Image from "next/image";
import { Icon } from "../navbar/menu";

const AddPostFooter = styled.div`
  width: 100%;
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
  }
  li {
    display: flex;
    width: 100%;
    padding: 6px 2px;
    align-items: center;
    justify-content: center;

    a {
      display: flex;
      align-items: center;
    }

    i {
      margin-right: 8px;
    }
    span {
      color: #65676b;
      font-size: 15px;
    }
  }

  li:hover {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }
`;

const _AddPost = (props: StyledProps): JSX.Element => {
  const { className } = props;
  return (
    <div className={className}>
      <form>
        <div>
          <Image
            src="/static/miscellanea/me.jpg"
            width={40}
            height={40}
            alt=""
          />
        </div>
        <input type="text" placeholder="What's on your mind, Wilber" />
      </form>
      <AddPostFooter>
        <ul>
          <li>
            <a href="">
              <Icon
                url="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/jrzbj1_5Jys.png"
                posX={0}
                posY={0}
                height={24}
                width={24}
              />
              <span>Live Video</span>
            </a>
          </li>
          <li>
            <a href="">
              <Icon
                url="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/jrzbj1_5Jys.png"
                posX={0}
                posY={-225}
                height={24}
                width={24}
              />
              <span>Photo/Video</span>
            </a>
          </li>
          <li>
            <a href="">
              <Icon
                url="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/jrzbj1_5Jys.png"
                posX={0}
                posY={-25}
                height={24}
                width={24}
              />
              <span>Feeling/Activity</span>
            </a>
          </li>
        </ul>
      </AddPostFooter>
    </div>
  );
};

export const AddPost = styled(_AddPost)`
  margin: 16px 0;
  padding: 12px 16px 10px;
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.2);

  form {
    display: flex;
    border-bottom: 1px solid #e4e6eb;
    padding-bottom: 12px;
    div {
      height: 40px;
      width: 40px;
      margin-right: 8px;
    }
    div > div {
      border-radius: 50%;
    }
  }

  input {
    width: 100%;
    height: 40px;
    padding: 7px 16px 9px 36px;
    border: 0;
    outline: none;
    border-top-right-radius: 50px;
    border-top-left-radius: 50px;
    border-bottom-right-radius: 50px;
    border-bottom-left-radius: 50px;
    background-color: #f0f2f5;
    color: #505050;
    font-size: 14px;
  }
`;