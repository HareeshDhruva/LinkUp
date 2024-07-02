import React from "react";
import Navbar from "./navbar";
import { navItems } from "../../data";
import CustomButton from "./customButton";
import Social from "./social";

const Hero = () => {
  return (
    <div className="bg-[#12141d] p-4 m-2 rounded-lg max-sm:h-[100dvh] h-[80dvh] max-md:h-[70dvh] text-white md:space-y-10">
      <Navbar navItems={navItems} heading={"linkup"} />
      <div className="grid grid-cols-2 grid-rows-1 items-center justify-center max-md:grid-cols-1 md:w-[80%] m-auto">
        <div className="first-letter:uppercase p-5 font-bold space-y-5 self-center flex flex-col max-md:items-center">
          <h1 className="text-[2.5rem] max-md:text-[1.2rem] max-md:text-center tracking-widest uppercase">
            connect instantly with other
          </h1>
          <p className="tracking-widest max-md:text-center max-md:text-[0.8rem]">
            Experience seamless, user-friendly messaging that brings together
            effortlessly
          </p>
          <Social navItems={navItems} />
          <CustomButton name={"start chatting now"}/>
        </div>
        <div className="justify-self-center">
          <img src="hero.png" alt="" className="max-md:w-64 max-md:h-64" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
