import React, { ReactNode, useState } from "react";
import { Button, Modal } from "antd";
import { useDispatch } from "react-redux";
import { openModal, closeModal, currModal } from "../redux/modalSlide";
type ModalProps = {
  title?: string,
  children?: React.ReactNode;
  submit?: React.ReactNode;
  clickFunction?: () => void;
};
const Modal1 = ({children,title} : ModalProps) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModal());
    dispatch(currModal(""))
  };
  return (
    <>
      <Modal
        title={title}
        open={true}
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={handleClose}>
            Return
          </Button>,
          <Button key="submit" style={{backgroundColor:"#1890ff"}} type="primary">Submit</Button>,
        ]}
      >
       {children}
      </Modal>
    </>
  );
};

export default Modal1;
