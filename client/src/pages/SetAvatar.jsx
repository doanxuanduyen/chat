import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import { toast } from "react-toastify";
import { Buffer } from "buffer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";

function SetAvatar(props) {
  const api = "https://api.multiavatar.com";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOption = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "#2222",
  };
  useEffect(() => {
    const checkLocalStorage = async () => {
      if (!localStorage.getItem("chat")) navigate("/login");
    };
    checkLocalStorage();
  }, []);
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOption);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOption);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch avatars:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen ">
          <img src={loader} alt="loader" />
        </div>
      ) : (
        <div className="flex flex-col bg-panel-header-background h-screen w-screen gap-3 items-center justify-center">
          <h1 className="text-white text-4xl font-bold mb-6">
            Pick an avatar as your profile picture
          </h1>
          <div className="avatars flex gap-8">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  } ${
                    selectedAvatar === index
                      ? "border-4 border-solid border-blue-600 rounded-full"
                      : "border-4 border-solid border-transparent rounded-full"
                  } transition duration-500 ease-in-out hover:cursor-pointer`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    className="h-20"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button
            className="bg-icon-green rounded-sm py-2 px-4 border-none cursor-pointer uppercase text-white hover:bg-secondary transition ease-linear font-bold mt-10"
            onClick={setProfilePicture}
          >
            Set as Profile Picture
          </button>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default SetAvatar;
