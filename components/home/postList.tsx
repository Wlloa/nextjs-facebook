import React from "react";
import styled from "styled-components";
import { StyledProps } from "../../common/props-interface";
import { IPost } from "../../models/post";
import { Post } from "./post";

export interface PostsProp extends StyledProps {
  posts: IPost[];
}

const EmptySection = styled.div`
  text-align: center;
  padding-top: 64px;
  @media(max-width: 768px) {
    h2 {
      font-size: 20px;
    }
    p {
      font-size: 14px;
    }
  }
`;

export const PostList = (props: PostsProp): JSX.Element => {
  const { posts } = props;

  if(!posts || !posts.length) {
    return (
      <EmptySection>
        <h2>Facebook is more fun with <strong>Friends</strong></h2>
        <p>Create some fun post and share them with your <strong>Friends</strong></p>
      </EmptySection>
    )
  }

  return (
    <div>
      <ul>
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};
