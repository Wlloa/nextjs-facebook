import type { GetServerSideProps, NextPage } from "next";
import styled from "styled-components";
import { MainFeed } from "../components/home/feed";
import { POSTS } from "../models/post";
import { getSession } from "next-auth/react";
import { PersonContext, PersonDto } from "../context/person-context";
import { ReactNode, useContext, useState, useEffect } from "react";
import { Session } from "next-auth";
import { Person } from "../models/person";

const MainLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  min-width: 280px;
`;

interface HomeProps {
  session: Session;
  personData: Person;
  children: ReactNode;
}

const Home: NextPage = (props: HomeProps): JSX.Element => {
  const { personData } = props;
  const { person, setPerson } = useContext(PersonContext);

  useEffect(() => {
    setPerson(personData);
  }, []);

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

  const result = await fetch(`http://localhost:3000/api/person?email=${session.user.email}`);

  const data = await result.json();

  return {
    props: { session, personData: data },
  };
};

export default Home;
