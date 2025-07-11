import { useContext } from "react"
import { MyContext } from "../../Context"

export const Account = () => {
  const { user } = useContext(MyContext);
  
  if(
    user 
    // && user._tokenResponse 
    // && user._tokenResponse.isNewUser
  )
    return(
      <div className="flex">
        <div className="">
          <label htmlFor="Fname">First Name:</label>
          <input
            type="text"
            id="Fname"
            value={user.displayName ? user.displayName.split(" ")[0] : ""}
          />
        </div>
        <div className="">
          <label htmlFor="Lname">Last Name:</label>
          <input
            className=""
            type="text"
            id="Lname"
            value={user.displayName ? user.displayName.split(" ")[1] : ""}
            />
        </div>
      </div>
    )
  return (

    <>
      <h1>Account</h1>
      <p>This is the account page.</p>
      <p>Here you can manage your account settings and preferences.</p>
    </>
  )
}
