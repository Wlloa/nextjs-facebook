import React from "react";
import styled from "styled-components";
import { StyledProps } from "../../common/props-interface";

const Input = styled.input`
  font-family: SFProDisplay-Regular, Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 16px;
  padding: 11px;
  width: 100%;
  background: #f5f6f7;
  border-color: #ccd0d5;
  border-radius: 5px;
  margin: 0;
  color: #1c1e21;
  -webkit-appearance: none;
  border: 1px solid #ccd0d5;
`;

const MediumInput = styled(Input)`
  max-width: 48.5%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const LabelRow = styled.div`
  color: #606770;
  font-size: 12px;
  font-weight: normal;
  line-height: 20px;
  margin-bottom: 0;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  i {
    background-image: url(/static/miscellanea/Pb5bBOkCnl1.png);
    background-size: 22px 73px;
    background-repeat: no-repeat;
    display: inline-block;
    width: 12px;
    height: 12px;
    background-position: 0 -60px;
    margin-left: 4px;
  }
`;

const Select = styled.select`
  border-radius: 4px;
  color: #1c1e21;
  font-family: SFProText-Medium, Helvetica, Arial, sans-serif;
  font-size: 15px;
  font-weight: normal;
  height: 36px;
  line-height: 20px;
  width: 125px;
  padding: 5px;
  background-color: #fff;
  border: 1px solid #ccd0d5;
`;

const GenderContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccd0d5;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1 0 auto;
  font-weight: normal;
  height: 36px;
  margin: 8px 6px 6px;
  padding: 0 10px;
  position: relative;
  width: auto;
`;

const SmallPrint = styled.div`
  width: 399px;
  p {
    color: #777;
    font-size: 11px;
    text-align: left;
    margin: 1em 0;
  }
`;

const ButtonSection = styled.div`
  text-align: center;
  button {
    background: none;
    background-color: #00a400;
    border: none;
    border-radius: 6px;
    box-shadow: none;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    height: 36px;
    overflow: hidden;
    padding: 0 32px;
    text-shadow: none;
    cursor: pointer;
    display: inline-block;
    margin-top: 10px;
    margin-bottom: 10px;
    min-width: 194px;
  }
`;

export const CreateAccount = (props: StyledProps) => {
  const { className } = props;
  return (
    <form className={className}>
      <Row>
        <MediumInput type="text" name="name" placeholder="First name" />
        <MediumInput type="text" name="lastName" placeholder="Last name" />
      </Row>
      <Row>
        <Input type="text" placeholder="Mobile number or email" />
      </Row>

      <Row>
        <Input type="text" placeholder="New password" />
      </Row>
      <div>
        <LabelRow>
          Birthday <i></i>
        </LabelRow>
        <Row>
          <Select name="month" id="">
            <option value="1">Jan</option>
            <option value="2">Feb</option>
            <option value="3">Mar</option>
            <option value="4">Apr</option>
            <option value="5">May</option>
            <option value="6">Jun</option>
            <option value="7">Jul</option>
            <option value="8">Aug</option>
            <option value="9">Sep</option>
            <option value="10">Oct</option>
            <option value="11">Nov</option>
            <option value="12">Dec</option>
          </Select>
          <Select name="day" id="">
            {Array(31)
              .fill(undefined)
              .map((elem, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
          </Select>
          <Select name="year" id="">
            {Array(100)
              .fill(undefined)
              .map((elem, index) => (
                <option key={index} value={2021 - index}>
                  {2021 - index}
                </option>
              ))}
          </Select>
        </Row>
      </div>
      <LabelRow>
        Gender <i></i>
      </LabelRow>
      <Row>
        <GenderContainer>
          <label htmlFor="female">Female</label>
          <input type="radio" name="sex" value="1" id="female" />
        </GenderContainer>
        <GenderContainer>
          <label htmlFor="male">Male</label>
          <input type="radio" name="sex" value="2" id="male" />
        </GenderContainer>
        <GenderContainer>
          <label htmlFor="custom">Custom</label>
          <input type="radio" name="sex" value="3" id="custom" />
        </GenderContainer>
      </Row>
      <SmallPrint>
        <p>
          By clicking Sign Up, you agree to our Terms, Data Policy and Cookies
          Policy. You may receive SMS Notifications from us and can opt out any
          time.
        </p>
      </SmallPrint>
      <ButtonSection>
        <button type="submit">Sign Up</button>
      </ButtonSection>
    </form>
  );
};
