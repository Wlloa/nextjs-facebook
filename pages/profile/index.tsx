import { getSession } from "next-auth/react";
import React from "react";

const Profile = () => {
  return <div></div>;
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    const response = await fetch("http://localhost:3000/api/person", {
      body: JSON.stringify({ email: session.user.email }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  }

  return {
    props: {},
  };
}

export default Profile;
