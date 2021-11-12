import type { GetServerSideProps, NextPage } from "next";
import styled from "styled-components";
import { MainFeed } from "../components/home/feed";
import { AddPost } from "../components/home/add-post";
import { HistoryCards } from "../components/home/history-cards";
import { HISTORIES } from "../models/history";
import { PostList } from "../components/home/postList";
import { IPost } from "../models/post";
import { getSession } from "next-auth/react";
import { PersonContext, PersonDto } from "../context/person-context";
import { ReactNode, useContext, useState, useEffect } from "react";
import { Session } from "next-auth";
import { Person } from "../models/person";

const MainLayout = styled.div`
  display: flex;
  justify-content: center;
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
  const { person, fetchUser } = useContext(PersonContext);
  const [posts, setPost] = useState(null);

  useEffect(() => {
    if (person && person.id) {
      fetch(`${process.env.SERVER_HOST}/api/posts?id=${person.id}`)
        .then((response) => response.json())
        .then((data) => {
          const postData = data.posts;
          const postsArray = [];
          for (const key in postData) {
            const postTemp = { ...postData[key], id: key };
            postsArray.unshift(postTemp);
          }
          setPost(postsArray);
        })
        .catch((error) => console.log(error));
    }
  }, [person]);

  console.log(personData);

  const addedPostHandler = (post: IPost) => {
    console.log(post);
    setPost(current => [post, ...current])
  }

  return (
    <MainLayout>
      {/* <LeftContainer /> */}
      <MainFeed>
        <HistoryCards histories={HISTORIES.slice(0, 2)} />  
        <AddPost onAddedPost={addedPostHandler} />
        <PostList posts={posts} />
        {/* <MainFeed posts={posts} /> */}
      </MainFeed>

      {/* <LeftContainer /> */}
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: `${process.env.SERVER_HOST}/auth`,
        permanent: false,
      },
    };
  }

  const result = await fetch(
    `${process.env.SERVER_HOST}/api/person?email=${session.user.email}`
  );

  const data = await result.json();

  return {
    props: { session, personData: data },
  };
};

export default Home;
