import React, { useState, useRef } from "react";
import styled from "styled-components";
import { StyledProps } from "../../common/props-interface";
import Image from "next/image";
import Facebook from "../../public/static/miscellanea/facebook.svg";
import Modal from "../../components/modal";
import { CreateAccount } from "../../components/modals/create-account";
import { Person } from "../../models/person";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { StyledErrorBlock } from "../../components/login/error-block";

export interface AuthProps extends StyledProps {}

function _Auth(props: AuthProps): JSX.Element {
  const { className } = props;
  const [showModal, setShowModal] = useState(false);
  const [loginError, setLoginError] = useState({
    state: false,
    title: null,
    text: null,
  });

  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const createAccount = (event: any): void => {
    event.preventDefault();
    setShowModal((current) => !current);
  };

  const onClose = () => {
    setShowModal(false);
  };

  const onSubmit = async (person: Person) => {
    console.log(person);
    setShowModal(false);
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(person),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    const result = await signIn("credentials", {
      redirect: false,
      email: person.email,
      password: person.password,
    });

    if (!result.error) {
      router.replace("/");
    }

    return data;
  };

  const onLogin = async (e: any) => {
    e.preventDefault();

    setLoginError({state: false, text: null, title: null});
    const result = await signIn("credentials", {
      redirect: false,
      email: emailRef.current?.value,
      password: passRef.current?.value,
    });

    //@ts-ignore
    if (!result.error) {
      router.replace("/");
    } else {
      setLoginError({state: true, title: result.error, text: "Something went wrong"});
    }

    console.log(result);
  };

  return (
    <div className={className}>
      <Modal
        show={showModal}
        onClose={onClose}
        title="Sign Up"
        subtitle="It’s quick and easy."
      >
        <CreateAccount onSubmit={onSubmit} />
      </Modal>
      <Body>
        <LogoSection>
          <div>
            <FbkLogo />
            {/* <Image src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" width={301} height={106} alt="facebook" /> */}
          </div>
          <h2>Connect with friends and the world around you on Facebook.</h2>
        </LogoSection>
        <div>
          {loginError.state && (
            <StyledErrorBlock
              title={loginError.title}
              text={loginError.text}
            />
          )}
          <CardForm>
            <form onSubmit={onLogin}>
              <input
                type="text"
                placeholder="Email or Phone Number"
                ref={emailRef}
              />
              <input type="password" placeholder="Password" ref={passRef} />
              <SubmitBtn type="submit">Log In</SubmitBtn>
              <a href="">Forgot Password?</a>
              <Separator></Separator>
              <CreateAccountBtn onClick={(event) => createAccount(event)}>
                Create New Account
              </CreateAccountBtn>
            </form>
          </CardForm>
          <Celebrity>
            <a href="">Create a Page</a> for a celebrity, band or business.
          </Celebrity>
        </div>
      </Body>
      <Footer></Footer>
    </div>
  );
}

const Footer = styled.footer`
  background-color: var(--color-white);
  height: 200px;
  width: 100%;
  @media (max-width: 767px) {
    display: none;
  }
`;

const Body = styled.div`
  background-color: var(--color-gray);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding-bottom: 112px;
  padding-top: 72px;
  width: 100%;

  @media (max-width: 767px) {
    flex-direction: column;
    padding-top: 8px;
    padding-bottom: 0;
    background-color: var(--color-white);
    justify-content: flex-start;
  }
`;

const LogoSection = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  align-items: flex-start;
  h2 {
    @media (max-width: 767px) {
      display: none;
    }
    font-size: 28px;
    font-weight: normal;
    line-height: 32px;
  }
`;

const FbkLogo = styled(Facebook)`
  width: 301px;
  height: 106px;
  width: 100%;
  margin-left: -28px;
  @media (max-width: 767px) {
    margin: 0;
    width: 112px;
    height: 40px;
  }
`;

const CardForm = styled.div`
  text-align: center;
  align-items: center;
  background-color: #fff;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  box-sizing: border-box;
  margin: 40px 0 0;
  padding: 20px 16px 28px;
  width: 396px;
  height: fit-content;

  form {
    display: flex;
    flex-direction: column;
    input {
      border-radius: 6px;
      font-size: 17px;
      padding: 14px 16px;
      width: 100%;
      border: 1px solid #dddfe2;
      color: #1d2129;
      line-height: 16px;
      vertical-align: middle;
      margin: 6px 0;

      &:focus {
        border-color: #1877f2;
        box-shadow: 0 0 0 2px #e7f3ff;
        caret-color: #1877f2;
        outline: none !important;
      }
    }

    a {
      color: #1877f2;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;
    }
  }

  @media (max-width: 767px) {
    box-shadow: none;
    margin: 0;
    padding-top: 8px;

    form {
      input {
        margin-top: 0;
      }
      a {
        color: #216fdb;
        font-family: "Roboto-Regular", "Helvetica", "sans-serif";
        font-size: 14px;
        line-height: 16px;
      }
    }
  }
`;

const SubmitBtn = styled.button`
  background-color: #1877f2;
  border: none;
  border-radius: 6px;
  font-size: 20px;
  line-height: 48px;
  padding: 0 16px;
  width: 100%;
  margin: 16px 0;
  color: var(--color-white);
  font-weight: bold;
  cursor: pointer;

  transition: 200ms cubic-bezier(0.08, 0.52, 0.52, 1) background-color,
    200ms cubic-bezier(0.08, 0.52, 0.52, 1) box-shadow,
    200ms cubic-bezier(0.08, 0.52, 0.52, 1) transform;

  &:hover {
    background-color: #166fe5;
    border-color: #365899;
  }

  &:active {
    background-color: #29487d;
    border-color: #29487d;
  }

  @media (max-width: 767px) {
    margin-top: 4px;
    text-shadow: 0 -1px rgb(0 0 0 / 25%);
  }
`;

const CreateAccountBtn = styled.button`
  border: none;
  border-radius: 6px;
  font-size: 17px;
  line-height: 48px;
  padding: 0 16px;
  background-color: #42b72a;
  color: var(--color-white);
  text-align: center;
  font-weight: bold;
  justify-content: center;
  position: relative;
  text-align: center;
  text-shadow: none;
  vertical-align: middle;
  margin-top: 6px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;

  transition: 200ms cubic-bezier(0.08, 0.52, 0.52, 1) background-color,
    200ms cubic-bezier(0.08, 0.52, 0.52, 1) box-shadow,
    200ms cubic-bezier(0.08, 0.52, 0.52, 1) transform;

  @media (max-width: 767px) {
    height: 36px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 5px;
    padding-bottom: 5px;
    background: #00a400;
    border: none;
    box-shadow: none;
    line-height: 27px;
    font-size: 14px;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 35%);
  }
`;

const Separator = styled.div`
  width: 100%;
  align-items: center;
  border-bottom: 1px solid #dadde1;
  display: flex;
  margin: 20px 0;
`;

const Celebrity = styled.div`
  font-size: 14px;
  border-top: none;
  color: #1c1e21;
  font-weight: normal;
  padding-top: 0;
  margin-top: 28px;
  text-align: center;
  a {
    font-weight: 600;
    text-decoration: none;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const Auth = styled(_Auth)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  @media (max-width: 767px) {
    min-width: 100vw;
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Auth;
