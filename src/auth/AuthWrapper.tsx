import { createContext, useContext, useEffect, useState } from "react"
import { RenderMenu, RenderRoutes } from "../components/structure/render-navigation";
import { useNavigate } from "react-router-dom/dist";
import { IUser } from "../types/user";
import axios from "axios";
import { config } from "../utils/config";
import urls from "../utils/urls";
//import { sendFetchRequest } from "../utils/send-fetch-request";
//import urls from "../utils/urls";

const AuthContext = createContext<{
     user: IUser,
     login: ((email: string, password: string) => Promise<boolean>) | (() => void),
     logout: () => void
}>({
     user: {id: "", name: "", email: "", AuthToken: "" },
     login: () => { },
     logout: () => { }
});
export const AuthData = () => useContext(AuthContext);


export const AuthWrapper = () => {
     const [user, setUser] = useState({id: "", name: "", email: "", AuthToken: "" })
     const navigate = useNavigate()

     useEffect(() => {
          const userDataFromSession = sessionStorage.getItem("user");
          if (userDataFromSession) {
            const parsedUserData = JSON.parse(userDataFromSession);
            setUser(parsedUserData);
          }
        }, []);

     const login = async (email: string, password: string) => {

          const response = await axios.post(
               `http://${config.backend}${urls.backend.auth.login}`, {
               email: email,
               password: password
          }
          );

          if (response.status !== 200) return false;
          else {
               setUser({
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    AuthToken: response.data.AuthToken
               })
               sessionStorage.setItem("user", JSON.stringify({
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    AuthToken: response.data.AuthToken
               }));
               return true;
          }
     };
     const logout = async () => {
          sessionStorage.removeItem("user");
          setUser({id: "", name: "", email: "", AuthToken: "" })
          navigate("/")
     }
     return (

          <AuthContext.Provider value={{ user, login, logout }}>
               <>
                    <RenderMenu />
                    <main className="container bg-light p-4">
                         <RenderRoutes />
                    </main>
               </>
          </AuthContext.Provider>

     )
}

