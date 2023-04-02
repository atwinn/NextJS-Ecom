import * as React from "react";
import { Button, Tooltip } from "antd";
export interface IButton1Props {
    title?: string,
    icon?: React.ReactNode,
    red? : boolean
}
export default function ButtonToolTip({title,icon,red}: IButton1Props) { 
  return (
    <>
     {red ?   <Tooltip title={title}>
        <Button
          danger
          className="flex justify-center items-center"
          shape="circle"
          icon={icon}
        />
      </Tooltip> :   <Tooltip title={title}>
        <Button
          className="flex justify-center items-center"
          shape="circle"
          icon={icon}
        />
      </Tooltip>}
    
    </>
  );
}
