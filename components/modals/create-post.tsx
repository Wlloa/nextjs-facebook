import Compressor from "compressorjs";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Icon } from "../navbar/menu";
import Image from "next/image";
import fs from "fs";
import { Person } from "../../models/person";
import { uploadImage, uploadPostImage } from "../../firebase";
import { IPost } from "../../models/post";

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
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

interface CreatePostProps {
  person: Person;
  onAddedPost: (post: IPost) => void;
}

export const CreatePost = ({
  person,
  onAddedPost,
}: CreatePostProps): JSX.Element => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const imagePicker = useRef(null);
  const descriptionRef = useRef(null);

  // useEffect(()=> {
  //   console.log(person);
  // }, []);

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

  const submitPost = async () => {
    if (loading) return;
    setLoading(true);
    /*
    Steps for create post
      1. check if the post contain an image
      2. save into firebase storage the post image under user id
      3. with the image url from firebase storage create the post 
    */
    let imageUrl;
    if (imagePreview) {
      imageUrl = await uploadPostImage(
        imagePreview,
        person.id,
        "post",
        image.name
      );
    }
    const description = descriptionRef.current.value;
    const post: IPost = {
      user: person.id,
      description: description,
      postPicture: imageUrl,
      timestamp: new Date().toLocaleTimeString(),
    };
    const response = await fetch(`${process.env.SERVER_HOST}/api/posts`, {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      setLoading(false);
      console.log("something went wrong");
    }
    const data = await response.json();

    if (data) {
      setLoading(false);
      onAddedPost(data.post);
      // console.log(data);
    }
  };

  return (
    <Container>
      <AccountBlock>
        {/* <img src={person?.image} alt="" /> */}
        <span>{person?.firstName}</span>
      </AccountBlock>
      <DescriptionBlock
        placeholder="What is on your mind, Wilber"
        cols={5}
        ref={descriptionRef}
      />
      <ImageSection>
        {/* eslint-disable-next-line @next/next/no-img-element */}
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
      <SubmitPost
        onClick={submitPost}
        disabled={!image || loading}
      >
        {loading ? "Uploading..." : "Post"}
      </SubmitPost>
    </Container>
  );
};
