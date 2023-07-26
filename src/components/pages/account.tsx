import { AuthData } from "../../auth/AuthWrapper"

export const Account = () => {

     const { user } = AuthData();
     console.log("User" ,user)
     return (
          <div className="page">
               <h2>Your Account</h2>
               <p>Username: {user.name} {user.AuthToken ? "true" : "false"}</p>
          </div>
     )
}