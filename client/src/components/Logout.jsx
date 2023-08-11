import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

function Logout(props) {
  const navigate = useNavigate();
  const handleClick = async() => {
    localStorage.clear();
    navigate("/login")
  }
  return (
    <div className="flex justify-center items-center p-2 bg-[#9a86f3] border-none rounded-3xl cursor-pointer" onClick={handleClick}>
      <BiPowerOff className="text-xl text-[#ebe7ff]"/>
    </div>
  );
}

export default Logout;
