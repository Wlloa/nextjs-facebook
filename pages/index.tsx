import type { NextPage } from "next";
import styled from "styled-components";
import { MainFeed } from "../components/home/feed";
import { POSTS } from "../models/post";

const MainLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  min-width: 280px;
`;

const Home: NextPage = (): JSX.Element => {
  return (
    <MainLayout>
      <LeftContainer />
      <MainFeed posts={POSTS} />
      <LeftContainer />
    </MainLayout>
  );
};

export default Home;
