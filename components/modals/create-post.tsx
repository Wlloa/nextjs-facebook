import Compressor from "compressorjs";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Icon } from "../navbar/menu";
import Image from "next/image";
import fs from "fs";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const AccountBlock = styled.div``;

const DescriptionBlock = styled.textarea`
  border: none;
`;

const ImageSection = styled.div`
  border-radius: 8px;
  border: 1px solid #ced0d4;
  box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2 px 4 px 0 rgba(0, 0, 0, 0.1),
    inset 0 0 0 1 px rgba(255, 255, 255, 0.5);
  width: 100%;
  margin: 16px 0;
  height: 180px;
  overflow: hidden;
  position: relative;
  img {
      object-fit: contain;
      width: 100%;
  }
`;

const AddImageSection = styled.div`
  border-radius: 8px;
  border: 1px solid #ced0d4;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 58px;
`;

const SubmitPost = styled.button`
  cursor: pointer;
  height: 36px;
  width: 100%;
  background-color: #1877f2;
  border-radius: 6px;
  color: #ffffff;
  margin-top: 16px;
  outline: none;
  text-decoration: none;
  border: none;
`;

export const CreatePost = (): JSX.Element => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const imagePicker = useRef(null);

  const ImageSelectedHandler = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      new Compressor(e.target.files[0], {
        quality: 0.6,
        success(result) {
          setImage(result);
          const reader = new FileReader();
          reader.readAsDataURL(result);

          reader.onload = (event) => {
            setImagePreview(event.target.result);
          };
        },
      });
    }
  };

  return (
    <Container>
      <AccountBlock></AccountBlock>
      <DescriptionBlock placeholder="What is on your mind, Wilber" cols={5} />
      <ImageSection>
        <img src={imagePreview} alt="" />
      </ImageSection>
      <AddImageSection onClick={() => imagePicker.current.click()}>
        <div>
          <span>Add to your post</span>
        </div>

        <div>
          <input
            type="file"
            name="image"
            hidden
            onChange={ImageSelectedHandler}
            ref={imagePicker}
          />
          <Icon
            url="/static/miscellanea/jrzbj1_5Jys.png"
            posX={0}
            posY={-225}
            width={24}
            height={24}
          />
        </div>
      </AddImageSection>
      <SubmitPost>Post</SubmitPost>
    </Container>
  );
};
