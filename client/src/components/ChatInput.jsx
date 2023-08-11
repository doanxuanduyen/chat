import React, { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const handleEmojiClick = (event, emoji) => {
    let message = msg;
    message += event.emoji;
    setMsg(message);
  };
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="grid items-center grid-cols-[5%_95%] bg-[#080420] px-4">
      <div className="button-container flex items-center text-white gap-4">
        <div className="emoji relative">
          <BsEmojiSmileFill
            className="text-xl text-[#ffff00c8] cursor-pointer"
            onClick={handleEmojiPickerhideShow}
          />
          {showEmojiPicker && (
            <div className="absolute top-[-480px]" ref={emojiPickerRef}>
              <Picker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
      <form
        className="input-container w-full rounded-3xl flex items-center  justify-between gap-8 bg-[#ffffff34] p-2"
        onSubmit={(event) => sendChat(event)}
      >
        <input
          type="text"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          placeholder="Type your message here"
          className="w-[90%] h-[60%] bg-transparent text-white border-none pl-4 text-xl focus:outline-none"
        />
        <button
          type="submit"
          className="p-3  flex justify-center items-center bg-[#9a86f3] border-none rounded-full focus:outline-none"
        >
          <IoMdSend className="text-white text-xl" />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
