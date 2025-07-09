import React, { useContext, useState, useRef, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { MyContext } from "../Context";
import { FcGoogle, } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { MdOutlineErrorOutline } from "react-icons/md";

export const AuthPage = () => {
  const { user, setShowAuthPage } = useContext(MyContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authRef = useRef(null);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [useRedirect, setUseRedirect] = useState(
    process.env.NODE_ENV === 'development' ? true : false
  ); // Auto-use redirect in development

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

  // Check for redirect result on component mount
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log('Redirect sign-in successful:', result.user.displayName);
          setShowAuthPage(false);
        }
      } catch (error) {
        console.error('Redirect result error:', error);
        setError("Sign-in failed. Please try again.");
      }
    };
    
    handleRedirectResult();
  }, [setShowAuthPage]);

  // handle show password
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const loginMail = async () => {
    if(!email){
      setError("email is required")
      return;
    }
    if(!password){
      setError("Password is required")
      return;
    }
    if(password.length <= 6){
      setError("Password must be at leat 6 charaters")
      return;
    }
    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      setShowAuthPage(false);
    } catch (err) {
      switch(err.code){
        case "auth/email-already-in-use":
          setError("Email already in use. Please try another email.");
          break;
        case "auth/invalid-email":
          setError("Invalid email format. Please enter a valid email.");
          break;
        case "auth/weak-password":
          setError("Weak password. Password must be at least 6 characters long.");
          break;
        default:
          setError("An error occurred during sign up. Please try again.");
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        setShowAuthPage(false);
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  const loginGoogle = async () => {
    // Prevent multiple simultaneous requests
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      setError(''); // Clear previous errors
      
      if (useRedirect) {
        // Use redirect method (better for mobile and popup blockers)
        await signInWithRedirect(auth, googleProvider);
        // Note: This will redirect the page, so we don't need to handle the result here
      } else {
        // Use popup method
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        console.log('signed in user: ', user.displayName);
        setShowAuthPage(false); // Close auth page on success
      }
    } catch (err) {
      console.log('Google sign-in error:', err);
      
      // Handle specific error cases
      switch(err.code) {
        case 'auth/cancelled-popup-request':
          // Don't show error for this - it's usually due to multiple requests
          console.log("Popup request cancelled - likely due to multiple requests");
          break;
        case 'auth/popup-closed-by-user':
          // Don't show error message - user intentionally closed popup
          console.log("User closed the popup");
          break;
        case 'auth/popup-blocked':
          setError("Popup was blocked by browser. Switching to redirect method...");
          setUseRedirect(true); // Auto-switch to redirect method
          break;
        case 'auth/network-request-failed':
          setError("Network error. Please check your connection and try again.");
          break;
        case 'auth/operation-not-supported-in-this-environment':
          setError("Google sign-in not supported in this environment. Please try email sign-up.");
          break;
        default:
          setError("An error occurred during Google sign-in. Please try again.");
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={authRef} className="h-[50vh] border w-[40%] p-6 rounded-3xl shadow-lg">
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
              ${(!email || !password || isLoading) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-red-700'}`}
            onClick={loginMail}
            disabled={isLoading}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
              {error?
                <span className='text-red-600 inline-flex justify-between items-center '>
                  {error}<MdOutlineErrorOutline />
                </span>
                : ''
              }
          <div className="lg:text-5xl text-[48px] w-fit gap-[30px] mx-auto flex col-span-2">
            <button 
              className={`cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={loginGoogle}
              disabled={isLoading}
              title={useRedirect ? "Sign in with Google (redirect)" : "Sign in with Google (popup)"}
            >
              <FcGoogle />
            </button>
            <button 
              className={`cursor-pointer text-blue-800 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={loginMail}
              disabled={isLoading}
            >
              <FaFacebook />
            </button>
          </div>
          
          {/* Option to switch between popup and redirect */}
          <div className="text-center">
            <button
              className="text-sm text-blue-500 underline hover:text-blue-700"
              onClick={() => setUseRedirect(!useRedirect)}
            >
              {useRedirect ? "Use popup instead" : "Having trouble? Try redirect method"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};