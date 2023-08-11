import React, { useEffect, useState } from "react";

function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        setCurrentUserImage(currentUser.avatarImage);
        setCurrentUserName(currentUser.username);
      }
    };

    fetchData();
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserName && (
        <div className="grid grid-rows-[15%_75%_10%] overflow-hidden bg-[#080420] rounded-md">
          <h1 className="text-[4rem] text-icon-green  uppercase font-bold text-center">
            Chat
          </h1>
          <div className="contacts flex flex-col items-center overflow-auto gap-3">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  onClick={() => changeCurrentChat(index, contact)}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  } ${
                    index === currentSelected ? "bg-[#9a86f3]" : "bg-[#ffffff34]"
                  } cursor-pointer w-[90%] rounded p-2 flex gap-4 items-center `}
                >
                  <div className="avatar">
                    <img
                      className="h-[3rem]"
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username text-white font-bold">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user bg-[#0d0d30] flex justify-center items-center gap-8">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
                className="h-[3rem]"
              />
            </div>
            <div className="username text-white font-bold">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Contacts;
