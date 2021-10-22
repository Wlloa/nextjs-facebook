import type { GetServerSideProps, NextPage } from "next";
import styled from "styled-components";
import { MainFeed } from "../components/home/feed";
import { POSTS } from "../models/post";
import { getSession } from "next-auth/react";

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Home;
