import React from "react";
import styled from "styled-components";
import { StyledProps } from "../../common/props-interface";
import { HISTORIES } from "../../models/history";
import { AddPost } from "./add-post";
import { HistoryCards } from "./history-cards";
import { PostList, PostsProp } from "./postList";

const Feed = (props: PostsProp): JSX.Element => {
  const { posts, className } = props;
  return (
    <div className={className}>
      <HistoryCards histories={HISTORIES.slice(0, 2)} />
      <AddPost />
      <PostList posts={posts} />
    </div>
  );
};

export const MainFeed = styled(Feed)`
  padding: 0 32px;
  min-height: calc(100vh - 56px);
  overflow-y: auto;
  display: flex;
  flex-flow: column nowrap;
  flex-basis: 744px;
  max-width: 500px;
  align-items: stretch;
  flex-grow: 1;
  z-index: 0;
  @media (min-width: 760px) {
    max-width: 744px;
  }

  @media(max-width: 768px) {
    padding: 0 5px;
  }
`;
