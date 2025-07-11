import React, { useContext, useState, useRef, useEffect } from "react";
import { createUserWithEmailAndPassword,  } from "firebase/auth";
import { auth, } from "../config/firebase";
import { MyContext } from "../Context";
import { FcGoogle, } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { MdOutlineErrorOutline } from "react-icons/md";

export const AuthPage = () => {
  const { user, setShowAuthPage, Autherror, setAuthError, loginGoogle, handleSignOut, } = useContext(MyContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  
  useEffect(() => {
    // Hide on outside click
    const handleClickOutside = (event) => {
      if (authRef.current && !authRef.current.contains(event.target)) {
        setShowAuthPage(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowAuthPage]);

  // handle show password
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const loginMail = async () => {
    if(!email){
      setAuthError("email is required")
      return;
    }
    if(!password){
      setAuthError("Password is required")
      return;
    }
    if(password.length <= 6){
      setAuthError("Password must be at leat 6 charaters")
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setShowAuthPage(false);
    } catch (err) {
      switch(err.code){
        case "auth/email-already-in-use":
          setAuthError("Email already in use. Please try another email.");
          break;
        case "auth/invalid-email":
          setAuthError("Invalid email format. Please enter a valid email.");
          break;
        case "auth/weak-password":
          setAuthError("Weak password. Password must be at least 6 characters long.");
          break;
        default:
          setAuthError("An error occurred during sign up. Please try again.");
          break;
      }
    }
  };



  return (
    <div ref={authRef} className="
      w-full
      max-w-md
      sm:w-[90%]
      md:w-[60%]
      lg:w-[40%]
      p-6
      rounded-3xl
      shadow-lg
      mx-auto
      ">
      {user ? (
        <div className="w-full flex flex-col gap-10 h-full">
          <h1 className="text-center text-2xl text-red-800 font-extrabold">
            Are you sure you want to sign out?
          </h1>
          <div className="flex gap-3">
            <button
              className="w-1/2 py-3 bg-red-600 text-white font-bold text-2xl cursor-pointer hover:bg-red-700"
              onClick={handleSignOut}
            >
              Yes
            </button>
            <button
              className="w-1/2 py-3 bg-red-600 text-white font-bold text-2xl cursor-pointer hover:bg-red-700"
              onClick={() => setShowAuthPage(false)}
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full flex gap-10 h-full flex-col">
          <div className="grid h-fit grid-cols-1">
            <div className="sm:cols-span-3">
              <label className="text-white sm:text-sm/6 lg:text-2xl font-medium" htmlFor="mail">
                Email
              </label>
              <input
                className="block w-full px-3 py-1.5 border-b-2 text-white border-gray-300 outline-none sm:text-sm/6 lg:text-2xl"
                type="email"
                name="email"
                id="mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="grid h-fit grid-cols-1">
            <div className="sm:cols-span-3 sm:text-sm/6">
              <label className="block lg:text-2xl font-medium text-white" htmlFor="pass">
                Password
              </label>
              <div className="relative border-b-2 text-white border-gray-300">
                <input
                  className="block w-full px-3 py-1.5 outline-none sm:text-sm/6 lg:text-2xl"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="pass"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute text-2xl top-1/2 right-3 -translate-y-1/2"
                  onClick={handleShowPassword}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
          </div>

          <button
            className={`border hover:bg-red-700 py-4 font-bold sm:text-2xl text-white w-full sm:w-auto md:text-base lg:text-3xl col-span-2 h-fit bg-red-600
              ${(!email || !password) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-red-700'}`}
            onClick={loginMail}
          >
            Sign Up
          </button>
              {Autherror?
                <span className='text-red-600 inline-flex justify-between items-center '>
                  {Autherror}<MdOutlineErrorOutline />
                </span>
                : ''
              }
          <div className="text-5xl w-fit gap-[30px] mx-auto flex col-span-2">
            <button className="cursor-pointer" onClick={loginGoogle}>
              <FcGoogle />
            </button>
            <button className="cursor-pointer text-blue-800" onClick={loginMail}>
              <FaFacebook />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
