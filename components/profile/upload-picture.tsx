import React, { useRef, useState } from "react";
import styled from "styled-components";
import { StyledProps } from "../../common/props-interface";

interface UploadPictProps extends StyledProps {
  onSubmit: (image: FormData) => void;
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


export const UploadPicture = (props: UploadPictProps) => {
  const { className, onSubmit } = props;
  const [image, setImage] = useState(null);
  const [objectURL, setObjectURL] = useState(null);

  const imagePicker = useRef(null);

  const onFileChange = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setObjectURL(URL.createObjectURL(e.target.files[0]));
      onSubmit(e.target.files[0]);
    }
  };

  const submitPicture = (e: any) => {
    e.preventDefault();
    onSubmit(image);
  };

  return (
    <div>
      <ChangeProfilePic onClick={()=> imagePicker.current.click()}>
        <i></i>
      </ChangeProfilePic>
      <input ref={imagePicker} type="file" name="image" onChange={onFileChange} hidden />
      {/* <button type="submit" onClick={submitPicture}>Upload</button> */}
    </div>

    // </form>
  );
};
