import React, { useState } from "react";
import styled from "styled-components";
import { StyledProps } from "../../common/props-interface";
import Image from "next/image";
import { Icon } from "../navbar/menu";
import { usePersonContext } from "../../context/person-context";
import Modal from "../modal";
import { CreatePost } from "../modals/create-post";
import { IPost } from "../../models/post";

const AddPostFooter = styled.div`
  width: 100%;
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
  }
  li {
    display: flex;
    width: 100%;
    padding: 6px 2px;
    align-items: center;
    justify-content: center;

    a {
      display: flex;
      align-items: center;
    }

    i {
      margin-right: 8px;
    }
    span {
      color: #65676b;
      font-size: 15px;
    }
  }

  li:hover {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }
`;

const InputStyleComp = styled.div`
  width: 100% !important;
  height: 40px;
  padding: 7px 16px 9px 36px;
  border: 0;
  outline: none;
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-right-radius: 50px;
  border-bottom-left-radius: 50px;
  background-color: #f0f2f5;
  display: flex;
  align-items: center;
  cursor: pointer;

  > span {
    color: #505050;
    font-size: 14px;
  }
`;

interface AddPostProps extends StyledProps{
  onAddedPost: (post: IPost) => void;
}

const _AddPost = (props: AddPostProps): JSX.Element => {
  const { className, onAddedPost } = props;
  const { person } = usePersonContext();
  const [open, setOpen] = useState(false);

  const createPost = () => {
    setOpen(false);
  };

  const onCloseModal = (post: IPost) => {
    setOpen(false);
    onAddedPost(post);
  }

  return (
    <div className={className}>
      <Modal title="Create post" show={open} onClose={createPost}>
        <CreatePost person={person} onAddedPost={onCloseModal} />
      </Modal>
      <form>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={person?.image} width={40} height={40} alt="" />
        </div>
        <InputStyleComp onClick={() => setOpen(true)}>
          <span>Whats on your mind, Wilber</span>
        </InputStyleComp>
      </form>
      <AddPostFooter>
        <ul>
          <li>
            <a href="">
              <Icon
                url="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/jrzbj1_5Jys.png"
                posX={0}
                posY={0}
                height={24}
                width={24}
              />
              <span>Live Video</span>
            </a>
          </li>
          <li>
            <a href="">
              <Icon
                url="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/jrzbj1_5Jys.png"
                posX={0}
                posY={-225}
                height={24}
                width={24}
              />
              <span>Photo/Video</span>
            </a>
          </li>
          <li>
            <a href="">
              <Icon
                url="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/jrzbj1_5Jys.png"
                posX={0}
                posY={-25}
                height={24}
                width={24}
              />
              <span>Feeling/Activity</span>
            </a>
          </li>
        </ul>
      </AddPostFooter>
    </div>
  );
};

export const AddPost = styled(_AddPost)`
  margin: 16px 0;
  padding: 12px 16px 10px;
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.2);

  form {
    display: flex;
    border-bottom: 1px solid #e4e6eb;
    padding-bottom: 12px;
    div {
      height: 40px;
      width: 40px;
      margin-right: 8px;
    }
    div > img {
      border-radius: 50%;
    }
  }

  input {
    width: 100%;
    height: 40px;
    padding: 7px 16px 9px 36px;
    border: 0;
    outline: none;
    border-top-right-radius: 50px;
    border-top-left-radius: 50px;
    border-bottom-right-radius: 50px;
    border-bottom-left-radius: 50px;
    background-color: #f0f2f5;
    color: #505050;
    font-size: 14px;
  }
`;
