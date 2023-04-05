import * as React from 'react';
import { Divider } from "antd";

export interface IDividerProps {
    name?: string
}
export default function Divider1 ({name}:IDividerProps) {
  return (
    <>
      <Divider orientation="left" plain>
        {name}
      </Divider>
    </>
  );
}
