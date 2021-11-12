import React, {
  useState,
  useEffect,
  ReactNode,
  ReactPortal,
  useRef,
} from "react";
import { StyledProps } from "../common/props-interface";
import ReactDOM from "react-dom";
import styled from "styled-components";

interface ModalProps extends StyledProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const StyledModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  @media(max-width: 768px) {
    width: unset;
    z-index: 15;
  }
`;

const StyledModalWrapper = styled.div`
  width: 432px;
  height: 500px;
  @media(max-width: 768px) {
    width: 100vw;
    height: 100%;
  }
`;

const StyledModal = styled.div`
  background: white;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  padding: 16px;
  @media(max-width: 768px) {
    border-radius: 0;
  }
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 25px;
  padding: 0 15px 10px;
  border-bottom: 1px solid #dadde1;
  margin-left: -15px;
  margin-right: -15px;
`;

const StyledModalTitle = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    color: #1c1e21;
    font-size: 32px;
    line-height: 38px;
    margin-bottom: 0;
  }
  span {
    color: #606770;
    font-size: 15px;
    line-height: 24px;
    margin-bottom: 0;
  }
`;

const StyledModalBody = styled.div`
  padding-top: 16px;
`;

const Modal = ({
  show,
  onClose,
  children,
  title,
  subtitle,
}: ModalProps): ReactPortal | null => {
  const [isBrowser, setIsBrowser] = useState(show);

  const modalWrapperRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const backDropHandler = (e: any) => {
    if (!modalWrapperRef?.current?.contains(e.target) && show) {
      onClose();
    }
  };

  useEffect(() => {
    setIsBrowser(show);

    // attach event listener to the whole window with our handler
    window.addEventListener("click", backDropHandler);

    // remove the event listener when the modal is closed
    return () => window.removeEventListener("click", backDropHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const content = show ? (
    <StyledModalOverlay>
      <StyledModalWrapper ref={modalWrapperRef} onClick={backDropHandler}>
        <StyledModal>
          <StyledModalHeader>
            <StyledModalTitle>
              {title && <h2>{title}</h2>}
              {subtitle && <span>{subtitle}</span>}
            </StyledModalTitle>
            <a href="#" onClick={onClose}>
              x
            </a>
          </StyledModalHeader>

          <StyledModalBody>{children}</StyledModalBody>
        </StyledModal>
      </StyledModalWrapper>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      content,
      document.getElementById("modal-root") as Element
    );
  } else {
    return null;
  }
};

export default Modal;
