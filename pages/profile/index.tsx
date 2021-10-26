import { getSession } from "next-auth/react";
import React from "react";
import { StyledProps } from "../../common/props-interface";
import { Person } from "../../models/person";

interface ProfileProps extends StyledProps {
  profile: Person;
}

const Profile = (props: ProfileProps) => {
  const { profile } = props;
  return (
    <div>
      <h1>{profile?.firstName}</h1>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  let data;
  if (session) {
    const response = await fetch("http://localhost:3000/api/person", {
      body: JSON.stringify({ email: session.user.email }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
