import React, { useState } from "react";
import styled from "styled-components";
import { StyledProps } from "../../common/props-interface";

export interface ErrorProps extends StyledProps {
  title?: string;
  text?: string;
}

const ErrorBlock = (props: ErrorProps): JSX.Element => {
  const { title, text, className } = props;
  const [showBlock, setShowBlock] = useState(true);

  const dismiss = () => {
    setShowBlock(false);
  };

  if(!showBlock) {
      return null;
  }

  return (
    <div className={className}>
      <span onClick={dismiss}>x</span>
      {title && <h3>{title}</h3>}
      {text && <p>{text}</p>}
    </div>
  );
};

export const StyledErrorBlock = styled(ErrorBlock)`
  background-color: #ffebe8;
  border: 1px solid #dd3c10;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  h3 {
    color: #333;
    font-weight: 700;
    font-size: 14px;
    text-align: center;
    line-height: 1.34;
  }

  p {
    font-size: 12px;
    color: #1c1e21;
    line-height: 1.34;
  }

  span {
    position: absolute;
    top: 4px;
    right: 4px;
    font-weight: 700;
    color: #333;
    cursor: pointer;
  }

  @media (max-width: 767px) {
    margin: 0 16px;
  }
`;
