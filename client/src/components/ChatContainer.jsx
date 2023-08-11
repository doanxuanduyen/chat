import React, { useEffect, useRef, useState } from "react";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { getAllMessagesRoute, sendMessagesRoute } from "../utils/APIRoutes";

function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(getAllMessagesRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    };
    fetchData();
  }, [currentChat]);
  const handleSendMsg = async (msg) => {
    await axios.post(sendMessagesRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  useEffect(() => {
    if (socket && socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="grid grid-rows-[10%_80%_10%] gap-1 overflow-hidden md:grid-rows-[15%_70%_15%]">
      <div className="chat-header flex justify-between items-center px-8">
        <div className="user-details flex items-center gap-4">
          <div className="avatar">
            <img
              className="h-[3rem]"
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3 className="text-white font-bold text-lg">
              {currentChat.username}
            </h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="p-5 flex flex-col gap-4 overflow-auto">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`flex items-center ${
                  message.fromSelf
                    ? "sended justify-start"
                    : "recieved justify-end"
                }`}
              >
                <div
                  className={`content max-w-[40%] overflow-wrap-break-word p-4 text-lg rounded-[1rem] ${
                    message.fromSelf
                      ? "bg-blue-100 text-blue-900 "
                      : "bg-purple-100 text-purple-900 "
                  }`}
                >
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}

export default ChatContainer;
