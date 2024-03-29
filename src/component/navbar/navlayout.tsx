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
import { useDispatch } from "react-redux";
import { deleteCookie, getCookie } from "../../../cookies";
import { useRouter, useSearchParams } from "next/navigation";
import { pageRoutes } from "@/redux/constant/page-routes.constant";
import { Category, UserDropDown } from "./category";
import { message, Badge } from 'antd'
import { AppDispatch } from "@/redux/store";
import { fetchCart, selectCart } from "@/redux/cartSlice";
import { useSelector } from "react-redux";
import { setfilterData } from "@/redux/productSlice";


const NavButtonCss = "text-[16px] font-semibold pt-4 select-none";
const buttonContainer = "md:flex gap-2 items-center hidden hover:bg-slate-300/50 px-3 rounded-full transition-all cursor-pointer hover:text-white";
const CartCss = "hover:bg-slate-300/50 py-3 px-4 rounded-full transition-all cursor-pointer hover:text-white"

export const Left = () => {
    const dispatch = useDispatch()
    const handleLoadProduct = () => {
        dispatch(setfilterData(undefined))
    }
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
                <Link onClick={handleLoadProduct} href={pageRoutes.sanPhamUser.route} className={buttonContainer}>
                    <BsLaptop className="text-[20px]" />
                    <p className={NavButtonCss}>Sản Phẩm</p>
                </Link>
            </div>
        </>
    );
};

export const Right = () => {
    const [userAuth, setUserAuth] = useState("")
    const [role, setRole] = useState<string | null>(null)
    const userId = typeof window != "undefined" ? localStorage.getItem("id") : null
    const dispatch = useDispatch<AppDispatch>()
    const cart = useSelector(selectCart)
    const searchParams = useSearchParams()

    useEffect(() => {
        if (role === "5") dispatch(fetchCart(userId))
    }, [role])

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        setUserAuth(storedUsername || "")
        setRole(getCookie("role") || null)
    }, []);

    useEffect(() => {
        if (searchParams.get("action") === "logout") handleLogout()
    }, [searchParams])
    const { push } = useRouter()
    const handleLogout = () => {
        message.success('Đăng xuất thành công')
        localStorage.removeItem("username")
        setUserAuth("")
        localStorage.removeItem("id")
        deleteCookie("token")
        deleteCookie("role")
        push("/")
    }
    return (
        <>
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
                        {role === "3" || role === "4" || role === "6"
                            ? null
                            : <Link href={"/cart"}>
                                <div className={CartCss}>
                                    <Badge count={cart.length} showZero size="small" color="gold" offset={[2, 0]} style={{ backgroundColor: 'transparent' }}>
                                        <AiOutlineShoppingCart className="md:w-5 md:h-5 w-8 h-8 text-white" />
                                    </Badge>
                                </div>
                            </Link>
                        }
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
    const router = useRouter()
    const params = new URLSearchParams()

    useEffect(() => {
        if (onSearch != "")
            setShow(true);
        else
            setShow(false);
    }, [onSearch])

    const handleSearch = () => {
        if (params.has("search")) {
            router.replace(`/sanpham?search=${onSearch}`)
        }
        router.push(`/sanpham?search=${onSearch}`)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

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
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
                <div className="absolute bg-black hover:bg-slate-300 px-2 py-1.5 rounded-full right-1.5 cursor-pointer transition-all" onClick={handleSearch}>
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