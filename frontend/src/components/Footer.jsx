import { useEffect, useState } from "react";
import { TiSocialFacebook } from "react-icons/ti";
import { FaGithub } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTwitterCircle } from "react-icons/ai";
import { TiSocialLinkedin } from "react-icons/ti";
import { navItems } from "../../data";

const Footer = ({ heading ,footerData}) => {
  const [currentYear, setCurrentYear] = useState("");
  useEffect(() => {
    const year = new Date().getFullYear();
    setCurrentYear(year.toString());
  }, []);
  return (
    <div className="bg-[#12141d] p-6 m-2 rounded-lg text-white max-md:flex-col max-md:text-[0.7rem] text-[.9rem]">
      <footer className="flex bg-[#12141d] justify-between p-10 gap-10">
        <aside className="flex gap-5 flex-col">
          <div className="flex gap-3">
            <img src="chat.png" alt="" className="w-10 h-10" />
            <p className="first-letter:uppercase font-bold text-3xl text-[#3EE4CA]">
              {heading}
            </p>
          </div>
          <p>
              &copy; {currentYear} linkup. All rights reserved.
          </p>
          <p>
            <p> email : hareeshdhruva123@gmail.com </p>
            <p>phone : +91 8522832511 </p>
          </p>
        </aside>
        <div className="flex gap-10">
        {
          footerData.map((items)=>(
            <nav className="flex flex-col gap-2">
            <h6>{items.heading}</h6>
            <a className="hover:underline cursor-pointer text-gray-500">{items.sub1}</a>
            <a className="hover:underline cursor-pointer text-gray-500">{items.sub2}</a>
            <a className="hover:underline cursor-pointer text-gray-500">{items.sub3}</a>
            <a className="hover:underline cursor-pointer text-gray-500">{items.sub4}</a>
          </nav>
          ))
        }
        </div>
      </footer>
    </div>
  );
};

export default Footer;
