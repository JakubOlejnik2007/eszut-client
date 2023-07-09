import { createContext, useContext, useState } from "react"
import { RenderMenu, RenderRoutes } from "../components/structure/render-navigation";
import { useNavigate } from "react-router-dom/dist";
import React from "react";
//import { sendFetchRequest } from "../utils/send-fetch-request";
//import urls from "../utils/urls";

const AuthContext = createContext({
     user: { id: "", name: "", email: "", isAuthenticated: false },
     login: () => { },
     logout: () => { }
});
export const AuthData = () => useContext(AuthContext);


export const AuthWrapper = () => {
     const [user, setUser] = useState({ id: "", name: "", email: "", isAuthenticated: false })
     const navigate = useNavigate()
     const login = async (/*email: string, password: string, setErrorFunction: Dispatch<SetStateAction<{ message: string; visibility: boolean; }>>*/) => {
          /*const responseData = await sendFetchRequest(urls.backend.auth.login, "POST", setErrorFunction, "Błąd podczas logowania.", {
               email: email,
               password: password
          });

          if (
               'status' in responseData && responseData.status === "OK"
               && 'admin' in responseData && responseData.admin !== undefined
          ) {
               setUser({
                    id: responseData.admin._id,
                    name: responseData.admin.name,
                    email: responseData.admin.email,
                    isAuthenticated: true
               })
               return responseData.admin;
          } else {
               let data = {
                    status: responseData.status,
                    error: responseData.error
               }
               return data;
          }
          */
     }

     const logout = async () => {
          setUser({ id: "", name: "", email: "", isAuthenticated: false })
          navigate("/eszut")
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