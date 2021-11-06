import React, { useState } from "react";
import { StyledProps } from "../../common/props-interface";

interface UploadPictProps extends StyledProps {
  onSubmit: (image: FormData) => void;
}

export const UploadPicture = (props: UploadPictProps) => {
  const { className, onSubmit } = props;
  const [image, setImage] = useState(null);
  const [objectURL, setObjectURL] = useState(null);

  const onFileChange = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setObjectURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  const submitPicture = (e: any) => {
    e.preventDefault();
    // const body = new FormData();
    // body.append("image", image);
    onSubmit(image);
  };

  return (
    // <form onSubmit={submitPicture} className={className}>
    <div>
      <img src={objectURL} />
      <label htmlFor="profilePic">Profile picture</label>
      <input
        type="file"
        name="image"
        onChange={onFileChange}
      />
      <button type="submit" onClick={submitPicture}>Upload</button>
    </div>

    // </form>
  );
};
