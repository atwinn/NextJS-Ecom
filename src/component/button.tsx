import * as React from "react";
import { Button, Tooltip, Popconfirm, message } from "antd";
import { useDispatch } from "react-redux";
import { modalSlice, openModal } from "../redux/modalSlide";
export interface IButton1Props {
  title?: string;
  icon?: React.ReactNode;
  red?: boolean;
  delete1?: any
}
export default function ButtonToolTip({ title, icon, red, delete1 }: IButton1Props) {
  const dispatch = useDispatch();
  
  const confirm = (delete1:any) => {
    console.log(delete1);
    
    message.success("Xóa thành công");

  };
  const handleOnClick = (e:any) => {
    console.log(e);
    
    dispatch(openModal())
    
  }
  return (
    <>
      {red ? (
        <Tooltip title={title}>
          <Popconfirm
            placement="top"
            title={"Xóa"}
            description={"bạn có chắc chắn không?"}
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
            okType="danger"
            showCancel={false}
            
          >
            <Button
              onClick={delete1}
              danger
              className="flex justify-center items-center"
              shape="circle"
              icon={icon}
            />
          </Popconfirm>
        </Tooltip>
      ) : (
        <Tooltip title={title}>
          <Button
            onClick={handleOnClick}
            className="flex justify-center items-center"
            shape="circle"
            icon={icon}
          />
        </Tooltip>
      )}
    </>
  );
}
