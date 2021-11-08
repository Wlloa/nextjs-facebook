import { getSession } from "next-auth/react";
import React from "react";
import { StyledProps } from "../common/props-interface";
import { UploadPicture } from "../components/profile/upload-picture";
import { Person } from "../models/person";

interface ProfileProps extends StyledProps {
  profile: Person;
}

const Profile = (props: ProfileProps) => {
  const { profile } = props;

  const uploadPicture = async (picture: any) => {
    //console.log(picture);

    const body = new FormData();
    body.append("profilePic", picture);
    
    const response = await fetch("http://localhost:3000/api/person", {
      method: "PUT",
      body,
      
    });
    const responseData = await response.json();
    console.log(responseData);
  };

  return (
    <div>
      <h1>{profile?.firstName}</h1>
      <UploadPicture onSubmit={uploadPicture} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  let data = null;
  if (session) {
    const response = await fetch(
      `http://localhost:3000/api/person?email=${session.user.email}`
    );
    data = await response.json();
  } else {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { profile: data },
  };
}

export default Profile;
