import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React, { useState } from "react";
import styled from "styled-components";
import { StyledProps } from "../common/props-interface";
import { AddPost } from "../components/home/add-post";
import { PostList } from "../components/home/postList";
import {
  UploadPicture,
  UploadWallPicture,
} from "../components/profile/upload-picture";
import { Person } from "../models/person";
import { IPost } from "../models/post";

interface ProfileProps {
  profile: Person;
  posts: IPost[];
}

export const ImageType = {
  profile: "profiles",
  wall: "wall",
};

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  background-image: linear-gradient(
    to top,
    #ffffff,
    rgba(255, 255, 255.9),
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0)
  );
  height: 507px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const WallImageContainer = styled.div`
  max-width: 940px;
  min-width: 705px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  max-height: 348px;
  overflow: hidden;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: var(--color-dark-blue);

  @media (max-width: 1200px) {
    max-width: unset;
    min-width: unset;
    border-radius: unset;

    img {
      width: 100%;
      height: 100%;
    }
  }

  img {
    background-size: cover;
    border-style: solid;
    border-width: 0;
    object-fit: cover;
    width: 100%;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  height: 80px;
  padding-bottom: 16px;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 32px;
`;

const ImageAction = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
  width: 100%;
  height: 80px;
  justify-content: space-between;
`;

const ProfileImage = styled.div`
  border-radius: 50%;
  width: 168px;
  height: 168px;
  position: absolute;
  bottom: 133px;
  z-index: 5;
  background-color: var(--color-white);
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border-style: solid;
    border-width: 4px;
    border-color: var(--color-white);
    object-fit: cover;
    width: 100%;
  }
`;

const ProfileBody = styled.div`
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  justify-content: space-around;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 6px;
  }
`;

const PostSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.7;
  max-width: 500px;
`;

const InfoSection = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  width: 400px;
  flex: 0.3;
  text-align: left;
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 12px;
  height: 300px;
  
  h2 {
    margin-bottom: 16px;
  }

  @media(max-width: 768px) {
    width: 100%;
  }
`;

const InfoRow = styled.div`
  display: flex;
  margin: 8px 0;
  align-items: center;
  h3 {
    font-size: 16px;
    margin-right: 8px;
  }
  span {
    font-size: 14px;
  }
`;

const Profile = ({ profile, posts }: ProfileProps): JSX.Element => {
  const [localPosts, setLocalPost] = useState(posts);

  const addedPostHandler = (post: IPost) => {
    console.log(post);
    setLocalPost((current) => [post, ...current]);
  };

  const uploadPicture = async (picture: any, type: string) => {
    const body = new FormData();
    body.append("image", picture);
    body.append("type", type);
    console.log(body.get("type"));
    fetch(`${process.env.SERVER_HOST}/api/person`, {
      method: "PUT",
      body,
    }).then((response) => {
      window.location.reload();
    });
  };

  return (
    <ProfileContainer>
      <ImageContainer>
        <ProfileImage>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profile?.image} alt="" />
        </ProfileImage>
        <UploadPicture onSubmit={uploadPicture} />
        <WallImageContainer>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profile?.wallImage} alt="" />
          <ImageAction>
            <UploadWallPicture onSubmit={uploadPicture}></UploadWallPicture>
          </ImageAction>
        </WallImageContainer>
        <InfoContainer>
          {profile && (
            <h2>
              {profile.firstName} {profile.lastName}
            </h2>
          )}
        </InfoContainer>
      </ImageContainer>
      <ProfileBody>
        <InfoSection>
          <h2>Intro</h2>
          <InfoRow>
            <h3>Full Name</h3>
            <span>{`${profile?.firstName} ${profile?.lastName}`}</span>
          </InfoRow>
          <InfoRow>
            <h3>Email</h3>
            <span>{profile?.email}</span>
          </InfoRow>
          <InfoRow>
            <h3>Birthday</h3>
            <span>{profile?.birthday}</span>
          </InfoRow>
          <InfoRow>
            <h3>Gender</h3>
            <span>{profile?.gender}</span>
          </InfoRow>
        </InfoSection>
        <PostSection>
          <AddPost onAddedPost={addedPostHandler} />
          <PostList posts={localPosts} />
        </PostSection>
      </ProfileBody>
    </ProfileContainer>
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

  const response = await fetch(
    `${process.env.SERVER_HOST}/api/person?email=${session.user.email}`
  );

  const data = await response.json();
  const posts = [];

  if (data && data.id) {
    const postResponse = await fetch(
      `${process.env.SERVER_HOST}/api/posts?id=${data.id}`
    );

    const postData = await postResponse.json();

    for (let key in postData.posts) {
      const postTemp = { ...postData.posts[key], id: key };
      posts.unshift(postTemp);
    }
  }

  return {
    props: { profile: data, posts: posts },
  };
};

export default Profile;
