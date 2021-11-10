import React, { useRef, useState } from "react";
import styled from "styled-components";
import { StyledProps } from "../../common/props-interface";
import { ImageType } from "../../pages/[profile]";
import Compressor from "compressorjs";

interface UploadPictProps extends StyledProps {
  onSubmit: (image: File | Blob, type: string) => void;
}

const ChangeProfilePic = styled.div`
  position: absolute;
  background-color: #e4e6eb;
  width: 36px;
  height: 36px;
  bottom: 152px;
  left: 53%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 5;
  cursor: pointer;

  @media(max-width: 768px) {
    left: 60%;
  }

  i {
    background-image: url(/static/miscellanea/L6YgZDYsHgO.png);
    background-position: -25px -355px;
    background-size: auto;
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    display: inline-block;
  }
`;

const WallPicture = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 5;
  cursor: pointer;

  @media (max-width: 768px) {
    button {
      i {
        margin-right: 0px;
      }
      span {
        display: none;
      }
    }
  }

  > button {
    padding: 4px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  i {
    background-image: url(/static/miscellanea/L6YgZDYsHgO.png);
    background-position: -25px -355px;
    background-size: auto;
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    display: inline-block;
    margin-right: 4px;
  }
`;

export const UploadPicture = (props: UploadPictProps) => {
  const { onSubmit } = props;
  const [image, setImage] = useState(null);
  const imagePicker = useRef(null);

  const onFileChange = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      new Compressor(e.target.files[0], {
        quality: 0.6,
        success(result) {
          setImage(result);
          onSubmit(result, ImageType.profile);
        },
      });
    }
  };

  return (
    <div>
      <ChangeProfilePic onClick={() => imagePicker.current.click()}>
        <i></i>
      </ChangeProfilePic>
      <input
        ref={imagePicker}
        type="file"
        name="image"
        onChange={onFileChange}
        hidden
      />
    </div>
  );
};

export const UploadWallPicture = (props: UploadPictProps) => {
  const { onSubmit } = props;
  const [image, setImage] = useState(null);
  const imagePicker = useRef(null);

  const onFileChange = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      new Compressor(e.target.files[0], {
        quality: 0.6,
        success(result) {
          setImage(result);
          onSubmit(result, ImageType.wall);
        },
      });
    }
  };

  return (
    <div>
      <WallPicture onClick={() => imagePicker.current.click()}>
        <button>
          <i></i>
          <span>Edit Cover Photo</span>
        </button>
      </WallPicture>
      <input
        ref={imagePicker}
        type="file"
        name="image"
        onChange={onFileChange}
        hidden
      />
    </div>

    // </form>
  );
};
