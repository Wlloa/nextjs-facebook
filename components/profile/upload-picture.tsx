import React, { useRef, useState } from "react";
import styled from "styled-components";
import { StyledProps } from "../../common/props-interface";
import { ImageType } from "../../pages/[profile]";

interface UploadPictProps extends StyledProps {
  onSubmit: (image: FormData, type: string) => void;
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
  right: 0;
  bottom: 0;
  z-index: 5;
`;


export const UploadPicture = (props: UploadPictProps) => {
  const { onSubmit } = props;
  const [image, setImage] = useState(null);
  const imagePicker = useRef(null);

  const onFileChange = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      onSubmit(e.target.files[0], ImageType.profile);
    }
  };

  return (
    <div>
      <ChangeProfilePic onClick={()=> imagePicker.current.click()}>
        <i></i>
      </ChangeProfilePic>
      <input ref={imagePicker} type="file" name="image" onChange={onFileChange} hidden />
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
      setImage(e.target.files[0]);
      onSubmit(e.target.files[0], ImageType.wall);
    }
  };

  return (
    <div>
      <WallPicture onClick={()=> imagePicker.current.click()}>
        <button>
        <i></i>
        <span>Edit Cover Photo</span>
        </button>
        
      </WallPicture>
      <input ref={imagePicker} type="file" name="image" onChange={onFileChange} hidden />
    </div>

    // </form>
  );
};
