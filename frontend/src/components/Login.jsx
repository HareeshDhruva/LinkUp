import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContextProvider.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();
  const loginData = {
    email: "",
    password: "",
  };

  const [data, setData] = useState(loginData);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const login = async () => {
    const response = await axios.post(
      `/api/auth/login`,data,{withCredentials:true}
    );
    if (response.status === 200) {
      const { data } = response.data;
      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
      navigate("/home");
    }
  };

  return (
    <div className="w-full h-[100dvh] flex justify-center items-center">
      <div className="bg-red-500 w-1/2 h-[50dvh] flex justify-center items-center flex-col gap-5 rounded-lg">
        <h1 className="uppercase font-bold">login</h1>
        <input
          type="email"
          placeholder="email"
          name="email"
          className="text-center rounded-lg py-1 px-4 focus:outline-none"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          className="text-center rounded-lg py-1 px-4 focus:outline-none"
          onChange={handleChange}
        />
        <input
          type="button"
          value="login"
          className="text-center rounded-lg py-1 px-4 focus:outline-none bg-white"
          onClick={login}
        />
      </div>
    </div>
  );
};

export default Login;
