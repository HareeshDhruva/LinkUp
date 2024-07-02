import React from "react";
import CustomButton from "./customButton";
import { TiThMenu } from "react-icons/ti";
import Signin from "./signin";
import { useAuthContext } from "../context/authContextProvider";

const Navbar = ({ navItems, heading }) => {
  const {authUser} = useAuthContext();
  return (
    <div className="flex justify-between items-center md:w-[80%] text-white m-auto md:py-5">
      <div className="flex items-center justify-center gap-3">
        <img src="chat.png" alt="" className="w-10 h-10" />
        <p className="first-letter:uppercase font-bold text-3xl text-[#3EE4CA]">{heading}</p>
      </div>
      <ul className="flex justify-center items-center gap-5 max-md:hidden">
        {navItems.map((items, index) => (
          <li key={index} className="first-letter:uppercase">{items}</li>
        ))}
      </ul>
      <div className="flex gap-5 items-center max-md:hidden">
        {
          authUser === null ? 
       <>
        <CustomButton name={"Login"}/>
        <CustomButton name={"Sign up"}/>
       </>
        :
        <CustomButton name={"Logout"}/>
        }
      </div>
      <TiThMenu className="md:hidden text-[1.5rem]"/>
      <Signin/>
    </div>
  );
};

export default Navbar;
