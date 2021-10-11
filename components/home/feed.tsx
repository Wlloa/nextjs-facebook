import React from "react";
import styled from "styled-components";
import { StyledProps } from "../../common/props-interface";
import { PostList, PostsProp } from "./postList";

const Feed = (props: PostsProp): JSX.Element => {
  const { posts, className } = props;
  return (
    <div className={className}>
      <PostList posts={posts} />
    </div>
  );
};

export const MainFeed = styled(Feed)`
  margin-top: 56px;
  min-height: calc(100vh - 56px);
  overflow-y: auto;
  display: flex;
  flex-flow: column nowrap;
  flex-basis: 744px;
  max-width: 500px;
  align-items: stretch;
  padding: 0 32px;
  flex-grow: 1;
  z-index: 0;
  @media(min-width: 760px) {
      max-width: 680px;
  }
`;
