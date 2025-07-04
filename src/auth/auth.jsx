import React, { useContext, useState, useRef, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { MyContext } from "../Context";

export const AuthPage = () => {
  const { user, setShowAuthPage } = useContext(MyContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authRef = useRef(null);

  // Hide on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (authRef.current && !authRef.current.contains(event.target)) {
        setShowAuthPage(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowAuthPage]);

  const login = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err.message);
    }
  };

  const loginGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div ref={authRef} className="border h-[70vh] bg-white p-6 rounded shadow-lg">
      {user ? (
        <div>
          <p>Welcome, {user.email || "User"}!</p>
        </div>
      ) : (
        <div className="w-full grid grid-cols-2 gap-x-10 h-full grid-rows-2">
          
          <div className=" grid h-fit grid-cols-1">
            <div className="sm:cols-span-3">
                <label class="sm:text-sm/6 lg:text-2xl font-medium text-gray-900" htmlFor="mail">Email</label>
                <input
                className="block w-full bg-white px-3 py-1.5  text-gray-900 border-b-2  border-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6  lg:text-2xl"
                    type="email"
                    name="email"
                    id="mail"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
         </div>
          <div className=" grid h-fit grid-cols-1">
            <div className="sm:cols-span-3">
                <label class="block sm:text-sm/6  lg:text-2xl font-medium text-gray-900" htmlFor="pass">Password</label>
                <input
                className="block w-full bg-white px-3 py-1.5  text-gray-900 border-b-2  border-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6  lg:text-2xl"
                type="password"
                name="password"
                id="pass"
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
         </div>
          <button className="border col-span-2 h-fit bg-blue-700" onClick={login}>Sign Up</button>
          <div className="border col-span-2">
            <button onClick={loginGoogle}>
                <img src="" alt="" />s
            </button>
          </div>
        </div>
      )}
    </div>
  );
};