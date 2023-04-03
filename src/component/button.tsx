import * as React from "react";
import { Button, Tooltip,Popconfirm,message } from "antd";
import { useDispatch } from "react-redux";
import {modalSlice, openModal} from "../redux/modalSlide"
export interface IButton1Props {
    title?: string,
    icon?: React.ReactNode,
    red? : boolean
}
export default function ButtonToolTip({title,icon,red}: IButton1Props) { 
  const dispatch = useDispatch();
  const confirm = () => {
    message.success('Xóa thành công');
  };
  return (
    <>
     {red ? <Tooltip title={title}>
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
          danger
          className="flex justify-center items-center"
          shape="circle"
          icon={icon}
        />
        </Popconfirm>
      </Tooltip> :   <Tooltip title={title}>
        <Button
          onClick={()=> dispatch(openModal())}
          className="flex justify-center items-center"
          shape="circle"
          icon={icon}
        />
      </Tooltip>}
    
    </>
  );
}
