import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseConfig";

function Login() {
  const navigate = useNavigate();
  const [values, setValue] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!!handleValidation()) {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOption);
      }
      if (data.status === true) {
        localStorage.setItem("chat", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };
  const handleChange = (event) => {
    setValue({ ...values, [event.target.name]: event.target.value });
  };
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
  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("Email and password is required!", toastOption);
      return false;
    } else if (username.length === "") {
      toast.error("Email and password is required!", toastOption);
      return false;
    } else {
      toast.success("Successful!");
      return true;
    }
  };
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email },
    } = await signInWithPopup(firebaseAuth, provider);
    try {
      if (email) {
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("chat")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
      <div className=" py-5 px-20 rounded-lg flex flex-col items-center gap-4">
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="flex flex-col gap-5 items-center"
        >
          <div>
            <h1 className="text-[5rem] text-icon-green  uppercase font-bold">
              Chat
            </h1>
          </div>
          <div className="flex flex-col gap-4 w-80">
            <input
              className="bg-transparent py-3 px-2 text-white rounded-sm focus:outline-none border border-icon-green"
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
            />
            <input
              className="bg-transparent py-3 px-2 text-white rounded-sm focus:outline-none border border-icon-green"
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button
            type="submit"
            className="bg-icon-green rounded-sm py-2 px-4 border-none cursor-pointer uppercase text-white hover:bg-secondary transition ease-linear w-full"
          >
            Login
          </button>
        </form>
        <div className="flex flex-col gap-3 justify-center items-center">
          <button
            className="flex justify-center items-center gap-2"
            onClick={handleLogin}
          >
            <FcGoogle className="text-3xl" />
            <span className="text-white text-1xl">Login with Google</span>
          </button>
          <span className="text-white">
            Don't have an account?{" "}
            <Link to="/register" className="text-icon-green">
              Register
            </Link>
          </span>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
