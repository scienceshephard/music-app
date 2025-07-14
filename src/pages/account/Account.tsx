import { useContext, useState } from "react"
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router";
import { MyContext } from "../../Context";

export const Account = () => {

  const { setShowAuthPage, user} = useContext(MyContext);
  const [firstName, setFirstName] = useState(user.displayName ? user.displayName.split(" ")[0] : "");
  const [lastName, setLastName] = useState(user.displayName ? user.displayName.split(" ")[1] : "");
  const [email, setEmail] = useState(user.email ? user.email: "");
  const [focusedField, setFocusedField] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const photoURL = user.photoURL ? user.photoURL: "https://www.w3schools.com/w3images/avatar2.png";
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    navigate('/'); 
  };
  console.log(user)
  
    return(
      <div className="flex flex-col items-center min-h-[85dvh]">
        <div className="flex w-4/5 mx-auto p-8">
          <div className="flex flex-col gap-6 w-full">
            {/* Profile Picture Section */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img 
                  src={photoURL}
                  alt="Profile Picture"
                  className="w-40 h-40 rounded-full border-4 border-gray-300 object-cover"
                />
              </div>
            </div>

            {/* Name Fields Row */}
            <div className="flex gap-6 w-full">
              {/* First Name Input */}
              <div className="relative flex-1">
                <input
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 peer"
                  type="text"
                  id="Fname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onFocus={() => setFocusedField("firstName")}
                  onBlur={() => setFocusedField("")}
                  placeholder=" "
                  required
                />
                <label 
                  htmlFor="Fname" 
                  className={`absolute left-4 transition-all duration-200 ease-in-out cursor-text pointer-events-auto
                    ${focusedField === 'firstName' || firstName 
                      ? 'top-0 -translate-y-1/2 text-sm bg-white px-2 text-blue-500' 
                      : 'top-1/2 -translate-y-1/2 text-gray-500'
                    }
                    peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-2 peer-focus:text-blue-500
                    peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-1/2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:bg-white peer-[&:not(:placeholder-shown)]:px-2 peer-[&:not(:placeholder-shown)]:text-blue-500
                  `}
                >
                  First Name *
                </label>
              </div>
              
              {/* Last Name Input */}
              <div className="relative flex-1">
                <input
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 peer"
                  type="text"
                  id="Lname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onFocus={() => setFocusedField('lastName')}
                  onBlur={() => setFocusedField('')}
                  placeholder=" "
                  required
                />
                <label 
                  htmlFor="Lname" 
                  className={`absolute left-4 transition-all duration-200 ease-in-out cursor-text pointer-events-auto
                    ${focusedField === 'lastName' || lastName 
                      ? 'top-0 -translate-y-1/2 text-sm bg-white px-2 text-blue-500' 
                      : 'top-1/2 -translate-y-1/2 text-gray-500'
                    }
                    peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-2 peer-focus:text-blue-500
                    peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-1/2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:bg-white peer-[&:not(:placeholder-shown)]:px-2 peer-[&:not(:placeholder-shown)]:text-blue-500
                  `}
                >
                  Last Name *
                </label>
              </div>
            </div>

            {/* Email Field - Full Width */}
            <div className="relative w-full">
              <input
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 peer"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
                placeholder=" "
                required
                readOnly
              />
              <label 
                htmlFor="email"
                className={`absolute left-4 transition-all duration-200 ease-in-out cursor-text pointer-events-auto
                  ${focusedField === 'email' || email 
                    ? 'top-0 -translate-y-1/2 text-sm bg-white px-2 text-blue-500' 
                    : 'top-1/2 -translate-y-1/2 text-gray-500'
                  }
                  peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-2 peer-focus:text-blue-500
                  peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-1/2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:bg-white peer-[&:not(:placeholder-shown)]:px-2 peer-[&:not(:placeholder-shown)]:text-blue-500
                `}
              >
                Email Address *
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-200 ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Update Profile'
              )}
            </button>
          </div>
        </div>
        <button
        onClick={() => setShowAuthPage(true)}
        className='mr-20 mt-auto self-end cursor-pointer'>
          <AiOutlineLogout
            size={42}
            className="text-gray-900 hover:text-green-900 active:text-green-900"

          />
        </button>
      </div>
    )
}