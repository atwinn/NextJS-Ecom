import React from "react";
import logo from "../../assets/logoL3M.png";
import { FaLayerGroup } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import { MdLogin, MdLogout } from "react-icons/md"
import { AiOutlineShoppingCart } from "react-icons/ai";
import Image from "next/image";

export const Left = () => {
    return (
        <>
            <div className="flex items-center gap-x-3 shrink-0">
                <div className="rounded-full">
                    <Image src={logo} alt="" height={70} />
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
    return (
        <>
            <div className="relative flex items-center flex-1 mx-1 md:mx-6 ">
                <div className="flex justify-center items-center w-full">
                    <div className="rounded-l-full bg-white py-2.5 pl-5 h-10"></div>
                    <input
                        type="text"
                        className="rounded-none border-0 py-3 w-full outline-0 text-black bg-white"
                        placeholder="Tìm kiếm sản phẩm"
                    />
                    <div className="rounded-r-full bg-white py-2.5 pr-5 h-10"></div>
                </div>
                <div className="absolute bg-[#ffc220] px-2 py-1.5 rounded-full right-1.5">
                    <GoSearch className="text-black" />
                </div>
            </div>
        </>
    )
}