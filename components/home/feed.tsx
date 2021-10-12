import React from "react";
import styled from "styled-components";
import { StyledProps } from "../../common/props-interface";
import { HISTORIES } from "../../models/history";
import { HistoryCards } from "./history-cards";
import { PostList, PostsProp } from "./postList";

const Feed = (props: PostsProp): JSX.Element => {
  const { posts, className } = props;
  return (
    <div className={className}>
      <HistoryCards histories={HISTORIES.slice(0, 5)}/>
      <PostList posts={posts} />
    </div>
  );
};

export const MainFeed = styled(Feed)`
  padding: 56px 32px 0;
  min-height: calc(100vh - 56px);
  overflow-y: auto;
  display: flex;
  flex-flow: column nowrap;
  flex-basis: 744px;
  max-width: 500px;
  align-items: stretch;
  flex-grow: 1;
  z-index: 0;
  @media(min-width: 760px) {
      max-width: 744px;
  }
`;
