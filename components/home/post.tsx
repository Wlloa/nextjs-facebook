import React from "react";
import styled from "styled-components";
import { StyledProps } from "../../common/props-interface";
import { IPost } from "../../models/post";
import Image from "next/image";
import { Icon } from "../navbar/menu";

export interface Prop extends StyledProps {
  post: IPost;
}

const PostHeader = styled.div`
  display: flex;
  padding: 12px 16px 0;
  width: 100%;
`;

const ImageContainer = styled.a`
  margin-right: 8px;
  span {
    width: 38px;
    height: 38px;
    border-radius: 50%;
  }
`;

const Info = styled.div`
  display: flex;
  flex-flow: column nowrap;
  span:first-of-type {
    font-weight: 600;
    font-size: 15px;
  }

  span:last-of-type {
    font-size: 13px;
    color: #65676b;
  }
`;

const Description = styled.div`
  padding: 4px 16px 16px;
`;

export const Footer = styled.div`
  width: 100%;
  ul {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    border-top: 1px solid #e4e6eb;
    margin-top: 48px;
    margin-left: auto;
    margin-right: auto;
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
      opacity: 0.6;
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

const PostImage = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const _Post = (props: Prop): JSX.Element => {
  const { post, className } = props;
  return (
    <div className={className}>
      <PostHeader>
        <ImageContainer href="">
          {/* <Image
            src={post.postPicture}
            alt={post.userName}
            width="38px"
            height="38px"
          /> */}
        </ImageContainer>
        <Info>
          {/* <span>{post.userName}</span> */}
          <span>{post.timestamp}</span>
        </Info>
      </PostHeader>
      <Description>
        <p>{post.description}</p>
      </Description>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <PostImage>
        <img src={post?.postPicture} alt="" />
      </PostImage>
      <Footer>
        <ul>
          <li>
            <a href="">
              <Icon
                url="https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/AxgTurULzhJ.png"
                posX={0}
                posY={-306}
                height={20}
                width={20}
              />
              <span>Like</span>
            </a>
          </li>
          <li>
            <a href="">
              <Icon
                url="https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/AxgTurULzhJ.png"
                posX={0}
                posY={-268}
                height={20}
                width={20}
              />
              <span>Comment</span>
            </a>
          </li>
          <li>
            <a href="">
              <Icon
                url="https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/AxgTurULzhJ.png"
                posX={0}
                posY={-325}
                height={20}
                width={20}
              />
              <span>Share</span>
            </a>
          </li>
        </ul>
      </Footer>
    </div>
  );
};

export const Post = styled(_Post)`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  display: flex;
  flex-flow: column nowrap;
  min-height: 100px;
  margin: 16px 0;
  background-color: #ffffff;
`;
