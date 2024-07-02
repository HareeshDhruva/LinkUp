import { RxCross2 } from "react-icons/rx";
import useConversation from "../zustand/useConversation";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContextProvider";
import { useState } from "react";
import axios from "axios";

const Signin = () => {
  const { openSignin, setOpenSignin, openRegister, setOpenRegister } = useConversation();
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    address: "",
    gender: "",
  });

  const handleClose = () => {
    setOpenSignin(false);
    setOpenRegister(false);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/api/auth/${openSignin ? "login" : "register"}`,
        data,
        { withCredentials: true }
      );
      if (response.status === 200) {
        const userData = response.data.data;
        localStorage.setItem("user", JSON.stringify(userData));
        setAuthUser(userData);
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <div className={`${openSignin || openRegister ? "visible" : "hidden"}`}>
      <div className="fixed top-1/2 left-1/2 w-[400px] h-[400px] max-md:w-[300px] max-md:h-[300px] bg-[#3EE4CA] text-[#12141d] transform -translate-x-1/2 -translate-y-1/2 z-20 rounded-3xl shadow-lg">
        <div className="fixed top-4 right-4 w-[40px] h-[40px] flex justify-center items-center bg-gray-600 bg-opacity-50 backdrop-blur-lg rounded-full cursor-pointer">
          <RxCross2 onClick={handleClose} />
        </div>
        <div className="flex justify-center items-center h-full">
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5 w-full px-6">
            <h1 className="uppercase font-bold">{openSignin ? "Login" : "Register"}</h1>
            {openRegister && (
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={data.fullname}
                onChange={handleChange}
                className="text-center py-2 px-4 bg-[#12141d] text-white placeholder:text-white rounded-lg max-md:w-[250px]"
                autoComplete="name"
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
              className="text-center py-2 px-4 bg-[#12141d] text-white placeholder:text-white rounded-lg max-md:w-[250px]"
              autoComplete={openSignin ? "email" : "new-email"}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              className="text-center py-2 px-4 bg-[#12141d] text-white placeholder:text-white rounded-lg max-md:w-[250px]"
              autoComplete={openSignin ? "current-password" : "new-password"}
            />
            {openRegister && (
              <>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={data.address}
                  onChange={handleChange}
                  className="text-center py-2 px-4 bg-[#12141d] text-white placeholder:text-white rounded-lg max-md:w-[250px]"
                  autoComplete="street-address"
                />
                <div className="flex items-center gap-2">
                  <p className="uppercase font-bold">Gender:</p>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={data.gender === "male"}
                      onChange={handleChange}
                      className="accent-[#12141d]"
                    />
                    Male
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={data.gender === "female"}
                      onChange={handleChange}
                      className="accent-[#12141d]"
                    />
                    Female
                  </label>
                </div>
              </>
            )}
            <button
              type="submit"
              className="py-2 px-5 bg-[#12141d] text-white rounded-lg"
            >
              {openSignin ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </div>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-lg z-10"></div>
    </div>
  );
};

export default Signin;
