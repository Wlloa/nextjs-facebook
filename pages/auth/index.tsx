import React from "react";
import styled from "styled-components";
import { StyledProps } from "../../common/props-interface";
import Image from "next/image";
import Facebook from "../../public/static/miscellanea/facebook.svg";

export interface AuthProps extends StyledProps {}

function _Auth(props: AuthProps): JSX.Element {
  const { className } = props;
  return (
    <div className={className}>
      <Body>
        <LogoSection>
          <div>
            <FbkLogo />
            {/* <Image src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" width={301} height={106} alt="facebook" /> */}
          </div>
          <h2>Connect with friends and the world around you on Facebook.</h2>
        </LogoSection>
        <div>
          <CardForm>
            <form>
              <input type="text" placeholder="Email or Phone Number" />
              <input type="password" placeholder="Password" />
              <SubmitBtn type="submit">Log In</SubmitBtn>
              <a href="">Forgot Password?</a>
              <Separator></Separator>
              <CreateAccountBtn>Create New Account</CreateAccountBtn>
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
`;

const LogoSection = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  align-items: flex-start;
  h2 {
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

  transition: 200ms cubic-bezier(0.08, 0.52, 0.52, 1) background-color,
    200ms cubic-bezier(0.08, 0.52, 0.52, 1) box-shadow,
    200ms cubic-bezier(0.08, 0.52, 0.52, 1) transform;
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
`;

const Auth = styled(_Auth)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

export default Auth;
