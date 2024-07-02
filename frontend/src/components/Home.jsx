import React, { useState, useEffect, useRef } from "react";
import { MdChat } from "react-icons/md";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { MdSend } from "react-icons/md";
import { useAuthContext } from "../context/authContextProvider.jsx";
import useGetConversation from "../hooks/useGetConversation.js";
import { useSocketContext } from "../context/socketContext.jsx";
import useListernMessage from "../hooks/useListernMessage.js";
import useConversation from "../zustand/useConversation.js";
import useSendMessage from "../hooks/useSendMessage.js";
import useGetMessages from "../hooks/useGetMessages.js";

const Home = () => {
  const { conversation } = useGetConversation();
  const [currentMessage, setCurrentMessage] = useState();
  const { selectedConversation, setSelectedConversation, messages } =
    useConversation();
  const bottomRef = useRef(null);
  const { authUser } = useAuthContext();
  const { onlineUsers } = useSocketContext();
  const { sendMessage } = useSendMessage();

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const selectUSer = (data) => {
    setSelectedConversation(data);
  };

  const dateConvert = (isoDate) => {
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return formattedDate;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentMessage.trim()) {
        sendMessage(currentMessage);
        setCurrentMessage("");
      }
    }
  };

  const handleSubmitMessage = () => {
    if (currentMessage.trim()) {
      sendMessage(currentMessage);
      setCurrentMessage("");
    }
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // This navigates back to the previous page
  };

  useGetMessages();
  useListernMessage();

  return (
    <div className="grid grid-cols-4 overflow-hidden">
      <div className="h-[100dvh] col-span-1 bg-[#3EE4CA]">
        <div className="m-2 flex flex-col gap-5">
          <div>
            <p className="text-[#12141d] md:p-2 text-[1rem] max-md:text-[0.5rem] text-center font-bold m-1 uppercase">
              connection
            </p>
            <div className="h-[92dvh] overflow-y-scroll m-2 text-[0.7rem] containe">
              <div className="p-1 text-center font-bold">
                <div>
                  {conversation?.map((friend, index) => (
                    <div
                      className={`flex md:gap-2 text-center m-1 ${
                        selectedConversation?._id === friend._id
                          ? "sm:bg-[#12141d] text-[#fff]"
                          : "sm:bg-white text-black"
                      } items-center p-1 rounded-3xl justify-between`}
                      key={index}
                      onClick={() => selectUSer(friend)}
                    >
                      <div className="flex md:gap-5 items-center ">
                        {friend.profileUrl ? (
                          <img
                          className="ring-1 ring-gray-500 rounded-full w-10"
                          src="avatar.svg"
                          />
                        ) : (
                          <img
                          className="ring-1 ring-gray-500 rounded-full w-10"
                          src="avatar.svg"
                          />
                        )}
                        <p className="max-md:hidden">{friend.fullname}</p>
                      </div>
                          <div className="sm:mr-4 max-sm:hidden">
                            <p className="">
                              {onlineUsers?.includes(friend._id)
                                ? <span className="relative flex h-3 w-3">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${ selectedConversation?._id === friend._id ? "bg-white": "bg-[#12141d]"}  opacity-75`}></span>
                                <span className={`relative inline-flex rounded-full h-3 w-3 ${ selectedConversation?._id === friend._id ? "bg-white": "bg-[#12141d]"}`}></span>
                              </span>
                                : ""}
                            </p>
                          </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-3 bg-black">
        <div className="flex justify-between min-h-[8dvh] mx-4">
          <div className="flex md:gap-5 items-center justify-between w-full text-[#fff]">
            <div className="flex gap-4 justify-center items-center">
              {selectedConversation?.profileUrl ? (
                <img
                  className="ring-1 ring-gray-500 rounded-full w-10"
                  src={selectedConversation?.profileUrl}
                />
              ) : (
                <img
                  className="ring-1 ring-gray-500 rounded-full w-10"
                  src="avatar.svg"
                />
              )}
              <p className="max-md:text-[12px]">
                {selectedConversation?.fullname}
              </p>
            </div>
            <div className="flex justify-between items-center gap-4 mx-4">
                <IoArrowBackCircle onClick={handleGoBack} className="text-[#fff] text-[2rem] max-md:text-[1.5rem]" />
            </div>
          </div>
        </div>
        <div className="col-span-3 bg-black overflow-y-scroll h-[85dvh] overflow-x-hidden max-sm:text-[0.5rem]">
          {messages?.map((item, index) => (
            <div className="text-[12px]" key={index}>
              {item.senderId !== authUser._id ? (
                <>
                  <div className="flex justify-start mx-4">
                    <div className="p-2 m-2 rounded-r-xl rounded-t-xl max-w-[50%] text-[#fff] bg-[#12141d]">
                      <p className="whitespace-normal break-words text-balance mx-2 font-medium">
                        {item.message}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-start text-xs text-[#fff] gap-4 mx-4">
                    <img
                      src="avatar.svg"
                      className="w-5 rounded-full"
                      alt="photo"
                    />
                    <p className="text-[0.5rem]">{item.sender}</p>
                    <p className="text-[0.5rem]">
                      {dateConvert(item.createdAt)}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-end mx-4">
                    <div className="p-2 m-2 max-w-[50%] rounded-l-xl rounded-t-xl text-[#12141d] bg-[#3EE4CA]">
                      <p className="whitespace-normal break-words text-balance mx-2 font-medium">
                        {item.message}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end text-[#fff] text-xs gap-4 mx-4">
                    <p className="text-[0.5rem]">
                      {dateConvert(item.createdAt)}
                    </p>
                    <p className="text-[0.5rem]">{item.sender}</p>
                    <img
                      src="avatar.svg"
                      className="w-5 rounded-full"
                      alt="photo"
                    />
                  </div>
                </>
              )}
            </div>
          ))}
          <div className="fixed bottom-0 w-[70%] p-2">
            <div className="flex items-center md:mx-6">
              <div
                className={`flex gap-5 w-full justify-between items-center ${
                  !selectedConversation ? "hidden" : null
                }`}
              >
                <input
                  type="text"
                  className="w-full h-10 max-md:h-8 text-[12px] rounded-3xl px-4 focus:outline-none text-[#000] ring-1"
                  name="currentMessage"
                  value={currentMessage || ""}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className="flex justify-center items-center">
                  <MdSend
                    className="h-10 cursor-pointer text-center text-[30px] max-md:h-5 text-[#fff]"
                    onClick={handleSubmitMessage}
                  />
                </div>
              </div>
            </div>
          </div>
          <div ref={bottomRef}></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
