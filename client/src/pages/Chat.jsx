import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

function Chat(props) {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!localStorage.getItem("chat")) {
        navigate("/login");
      } else {
        const storedUser = JSON.parse(localStorage.getItem("chat"));
        setCurrentUser(storedUser);
      }
    };

    fetchCurrentUser();
  }, [navigate]);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  useEffect(() => {
    const fetchContactData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            const response = await axios.get(
              `${allUsersRoute}/${currentUser._id}`
            );
            setContacts(response.data);
          } catch (error) {
            console.error("Error fetching contact data:", error);
          }
        } else {
          navigate("/setAvatar");
        }
        setIsLoading(false);
      }
    };

    if (currentUser) {
      fetchContactData();
    }
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen gap-2 bg-panel-header-background">
      <div className="h-[85vh] w-[85vw] bg-black grid grid-cols-[15%_85%] md:grid-cols-[35%_65%] rounded-md">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </div>
  );
}

export default Chat;
