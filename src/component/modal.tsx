import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "../redux/modalSlide";

const Modal1: React.FC = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModal(false));
  };
  return (
    <>
      <Modal
        title="Title"
        open={true}
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={handleClose}>
            Return
          </Button>,
          <Button key="submit" style={{backgroundColor:"#1890ff"}} type="primary">Submit</Button>,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default Modal1;
