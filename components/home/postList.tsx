import React from "react";
import { StyledProps } from "../../common/props-interface";
import { IPost } from "../../models/post";
import { Post } from "./post";

export interface PostsProp extends StyledProps {
  posts: IPost[];
}

export const PostList = (props: PostsProp): JSX.Element => {
  const { posts } = props;
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
