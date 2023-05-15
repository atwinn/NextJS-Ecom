import { ProCard } from "@ant-design/pro-components";
import RcResizeObserver from "rc-resize-observer";
import { useState } from "react";
import ContactPage from "./contact-form";
const LayoutContact = () => {
  const [responsive, setResponsive] = useState(false);
  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        title="LIÊN HỆ VỚI CHÚNG TÔI"
        // extra=""
        split={responsive ? "horizontal" : "vertical"}
        bordered
        // headerBordered
        style={{
           borderRadius:"1rem",
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "2rem",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://png.pngtree.com/background/20210716/original/pngtree-color-geometric-line-color-block-background-picture-image_1338209.jpg)",
        }}
      >
        <ProCard
          colSpan="30%"
          className="bg-transparent"
          style={{ border: "none",minWidth:"250px" }}
        >
          <div style={{ height: "100%" }}>
            <p className="font-bold">Hỗ trợ 24/7</p>
            <p className="font-semibold">Giờ làm việc: 9am - 5pm</p>
            <p className="font-semibold">Địa chỉ: An Dương Vương, Quận 5, Tp.HCM</p>
          </div>
        </ProCard>
        <ProCard className="bg-transparent" style={{ border: "none" }}>
          <ContactPage />
        </ProCard>
      </ProCard>
    </RcResizeObserver>
  );
};
export default LayoutContact;
