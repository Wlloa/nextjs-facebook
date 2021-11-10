import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import styled from "styled-components";
import { StyledProps } from "../common/props-interface";
import { UploadPicture, UploadWallPicture } from "../components/profile/upload-picture";
import { Person } from "../models/person";

interface ProfileProps {
  profile: Person;
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
  

  img {
    background-size: cover;
    border-style: solid;
    border-width: 0;
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
  }
`;

const Profile = ({ profile }: ProfileProps): JSX.Element => {
  console.log(profile);

  const uploadPicture = async (picture: any, type: string) => {
    console.log(picture);
    const body = new FormData();
    body.append("image", picture);
    body.append("type", type);
    console.log(body.get('type'));
    fetch("http://localhost:3000/api/person", {
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
          <img src={profile?.image} alt="" />
        </ProfileImage>
        <UploadPicture onSubmit={uploadPicture} />
        <WallImageContainer>
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
    </ProfileContainer>
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

  const response = await fetch(
    `http://localhost:3000/api/person?email=${session.user.email}`
  );
  const data = await response.json();

  return {
    props: { profile: data },
  };
};

export default Profile;
