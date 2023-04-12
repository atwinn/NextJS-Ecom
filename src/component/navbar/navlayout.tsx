import React, { useEffect, useState } from "react";
import logo from "../../assets/logoL3M.png";
import { FaLayerGroup } from "react-icons/fa";
import { VscSignIn, VscSignOut } from "react-icons/vsc";
import { GoSearch } from "react-icons/go";
import { TfiPencilAlt } from "react-icons/tfi"
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsLaptop } from "react-icons/bs"
import { CloseOutlined } from "@ant-design/icons"
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { deleteCookie } from "../../../cookies";
import { useRouter } from "next/navigation";
import { clearUser, setUser } from "@/redux/userSlice";
import { pageRoutes } from "@/redux/constant/page-routes.constant";
import { Category, UserDropDown } from "./category";
import { message } from 'antd'

const NavButtonCss = "text-[16px] font-semibold pt-4 select-none";
const buttonContainer = "md:flex gap-2 items-center hidden hover:bg-slate-300/50 px-3 rounded-full transition-all cursor-pointer hover:text-white";
const CartCss = "hover:bg-slate-300/50 py-3 px-4 rounded-full transition-all cursor-pointer hover:text-white"

export const Left = () => {
    return (
        <>
            <div className="flex items-center gap-x-3 shrink-0">
                <Link href={"/"} className="md:flex items-center rounded-full cursor-pointer">
                    <Image src={logo} alt="" height={70} />
                    <div className="hidden md:block text-white text-4xl font-bold mt-1.5">SHOP</div>
                </Link>
                <Category>
                    <div className={buttonContainer}>
                        <FaLayerGroup className="text-[17px]" />
                        <p className={NavButtonCss}>Danh mục</p>
                    </div>
                </Category>
                <Link href={pageRoutes.sanPhamUser.route} className={buttonContainer}>
                    <BsLaptop className="text-[20px]" />
                    <p className={NavButtonCss}>Sản Phẩm</p>
                </Link>
            </div>
        </>
    );
};

export const Right = () => {
    // const user = useSelector((state: any) => state.user)
    const [messageApi, contextHolder] = message.useMessage();
    const [userAuth, setUserAuth] = useState("")
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        setUserAuth(storedUsername || ""); // Set userAuth to an empty string if storedUsername is null or undefined
    }, []);
    // const userAuth = typeof window != 'undefined' ? localStorage.getItem("username") : null
    const dispatch = useDispatch()
    const { push } = useRouter()
    const handleLogout = () => {
        messageApi.open({
            type: 'success',
            content: 'Đăng xuất thành công'
        })
        localStorage.removeItem("username")
        setUserAuth("")
        localStorage.removeItem("id")
        deleteCookie("token")
        push("/")
        dispatch(clearUser())
    }
    return (
        <>
            {/* Right */}
            {contextHolder}
            <div className="flex items-center gap-x-2">
                {userAuth != "" ? (
                    <>
                        <UserDropDown>
                            <div className={buttonContainer}>
                                <TfiPencilAlt className="text-[20px]" />
                                <p className={NavButtonCss}>{userAuth}</p>
                            </div>
                        </UserDropDown>
                        <div className={buttonContainer} onClick={handleLogout}>
                            <VscSignOut className="text-[21px]" />
                            <p className={NavButtonCss}>Đăng Xuất</p>
                        </div>
                        <Link href={"/cart"}>
                            <div className={CartCss}>
                                <AiOutlineShoppingCart className="md:w-5 md:h-5 w-8 h-8" />
                            </div>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href={"/auth/register"}>
                            <div className={buttonContainer}>
                                <TfiPencilAlt className="text-[20px]" />
                                <p className={NavButtonCss}>Đăng ký</p>
                            </div>
                        </Link>
                        <Link href={"/auth/login"}>
                            <div className={buttonContainer}>
                                <VscSignIn className="text-[21px]" />
                                <p className={NavButtonCss}>Đăng nhập</p>
                            </div>
                        </Link>
                        <Link href={"/cart"}>
                            <div className={CartCss}>
                                <AiOutlineShoppingCart className="md:w-5 md:h-5 w-8 h-8" />
                            </div>
                        </Link>
                    </>
                )
                }
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
                    <div className="rounded-full bg-white pl-5 pr-20 w-full">
                        <input
                            type="text"
                            className="rounded-none border-0 py-3 w-full outline-0 text-black bg-white"
                            placeholder="Tìm kiếm sản phẩm"
                            onChange={(e) => setOnSearch(e.target.value)}
                            value={onSearch}
                        />
                    </div>
                </div>
                <div className="absolute bg-black hover:bg-slate-300 px-2 py-1.5 rounded-full right-1.5 cursor-pointer transition-all">
                    <GoSearch className="text-white" />
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