import React from "react";
import { Left, Middle, Right } from "./navbar/navlayout";

const Navbar = () => {
    return (
        <div className="bg-[#0071dc] px-3 py-4 lg:px-8 text-white flex justify-between items-center">
            <Left />
            <Middle />
            <Right />
        </div>
    );
};

export default Navbar;