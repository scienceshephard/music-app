import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
// import {  } from "";

export const Auth = () =>{

    const [email, setEmail] =useState("");
    const [password, setPassword] =useState("");

    const login = async () =>{
        try{
            await createUserWithEmailAndPassword( auth, email, password );
        }catch(err){
            console.error(err.message);
        }
    }

    const loginGoogle = async () =>{
        try{
            await signInWithPopup(auth, googleProvider)
        }catch(err){
            console.error(err.message);
        }
    }

    return(
        <div className="container">
            <input type="email" name="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value) } />
            <input type="password" name="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value) }/>
            <button onClick={ login }> Sign Up </button>
            <button onClick={loginGoogle}><img src="" alt="" /></button>
        </div>
    )
}