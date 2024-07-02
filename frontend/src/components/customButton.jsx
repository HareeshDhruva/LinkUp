import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useConversation from "../zustand/useConversation";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContextProvider";
import axios from "axios"

const CustomButton = ({ name }) => {
  const box = useRef();
  const container = useRef();
  const navigation = useNavigate();
  const { authUser } = useAuthContext();
  const { openSignin, setOpenSignin, openRegister, setOpenRegister } =
    useConversation();

  useGSAP(
    () => {
      gsap.from(box.current, { scale: 0, delay: 1, opacity: 0 });
    },
    { scope: container }
  );

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`/api/auth/logout`, "", {
        withCredentials: true,
      });
      if (response.status === 200) {
        localStorage.setItem("user",null);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  useEffect(()=>{
    setOpenSignin(false);
    setOpenRegister(false);
  },[])

  const onClickHandle = () => {
    if (name === "Login") {
      setOpenSignin(true);
      setOpenRegister(false);
    } else if (name === "Sign up") {
      setOpenRegister(true);
      setOpenSignin(false);
    } else if (name === "Logout") {
      handleSubmit();
    } else if (name === "start chatting now") {
    
      if (authUser !== null) {
        navigation("/home");
      } else if(authUser === null) {
        setOpenSignin(true);
      }
      else{
        setOpenSignin(false);
        setOpenRegister(false);
      }
    } else {
      setOpenSignin(false);
      setOpenRegister(false);
    }
  };

  return (
    <div ref={container}>
      <input
        type="button"
        ref={box}
        value={name}
        className={`py-2 px-5 rounded-lg ${
          name !== "Login"
            ? "bg-[#3EE4CA] text-[#12141d]"
            : "ring-2 ring-[#3EE4CA] text-white bg-[#12141d]"
        }`}
        onClick={onClickHandle}
      />
    </div>
  );
};

export default CustomButton;
