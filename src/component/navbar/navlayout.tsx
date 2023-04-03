import React, { useEffect, useState } from "react";
import logo from "../../assets/logoL3M.png";
import { FaLayerGroup } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import { MdLogin, MdLogout } from "react-icons/md"
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CloseOutlined } from "@ant-design/icons"
import Image from "next/image";
import Link from "next/link";
import { log } from "console";

export const Left = () => {
    return (
        <>
            <div className="flex items-center gap-x-3 shrink-0">
                <div className="rounded-full">
                    <Link href={"/"}><Image src={logo} alt="" height={70} /></Link>
                </div>
                <div className="md:flex gap-2 items-center hidden hover:bg-[#06529a] px-3 rounded-full transition-all">
                    <FaLayerGroup className="text-[17px]" />
                    <p className="text-[16px] font-semibold pt-4">Sections</p>
                </div>
                <div className="md:flex items-center hidden gap-2 hover:bg-[#06529a] px-3 rounded-full transition-all">
                    <HiUserGroup className="text-[20px]" />
                    <p className="text-[16px] font-semibold pt-4">Partners</p>
                </div>
            </div>
        </>
    );
};

export const Right = () => {
    return (
        <>
            {/* Right */}
            <div className="flex items-center gap-x-2">
                <div className="hidden md:flex items-center gap-2 hover:bg-[#06529a] px-3 rounded-full transition-all">
                    <MdLogin className="text-[17px] rotate-90" />
                    <p className="text-[16px] font-semibold pt-4">Register</p>
                </div>
                <div className="hidden md:flex items-center gap-2 hover:bg-[#06529a] px-3 rounded-full whitespace-nowrap transition-all">
                    <MdLogout className="text-[20px] -rotate-90" />
                    <p className="text-[16px] font-semibold pt-4">Sign in</p>
                </div>
                <div className="hover:bg-[#06529a] py-3 px-4 rounded-full transition-all">
                    <AiOutlineShoppingCart className="md:w-5 md:h-5 w-8 h-8" />
                </div>
            </div>
        </>
    )
}

export const Middle = () => {
    const [show, setShow] = useState(false);
    const [onSearch, setOnSearch] = useState("");

    useEffect(() => {
        if (onSearch != "")
            setShow(true);
        else
            setShow(false);
    }, [onSearch])

    return (
        <>
            <div className="relative flex items-center flex-1 mx-1 md:mx-6 ">
                <div className="flex justify-center items-center w-full">
                    <div className="rounded-l-full bg-white py-2.5 pl-5 h-10"></div>
                    <input
                        type="text"
                        className="rounded-none border-0 py-3 w-full outline-0 text-black bg-white"
                        placeholder="Tìm kiếm sản phẩm"
                        onChange={(e) => setOnSearch(e.target.value)}
                        value={onSearch}
                    />
                    <div className="rounded-r-full bg-white py-2.5 pr-5 pl-16 h-10"></div>
                </div>
                <div className="absolute bg-[#ffc220] hover:bg-slate-300 px-2 py-1.5 rounded-full right-1.5 cursor-pointer">
                    <GoSearch className="text-black" />
                </div>
                {show ?
                    <div className="absolute right-12 hover:bg-slate-300/50 rounded-full px-1.5 py-1 cursor-pointer" onClick={() => setOnSearch("")}>
                        <CloseOutlined className="text-black" />
                    </div>
                    : null
                }
            </div>
        </>
    )
}