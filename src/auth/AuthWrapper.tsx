import { createContext, useContext, useEffect, useState } from "react"
import { RenderMenu, RenderRoutes } from "../components/structure/render-navigation";
import { useNavigate } from "react-router-dom/dist";
import { IUser } from "../types/user";
import axios from "axios";
import { config } from "../utils/config";
import urls from "../utils/urls";
import { callLoadingWithPromise } from "../utils/toast-notifications/toast";
import { register } from "../utils/push-notifications/push";

const AuthContext = createContext<{
  user: IUser,
  login: ((email: string, password: string) => Promise<boolean>) | (() => void),
  logout: () => void
}>({
  user: { id: "", name: "", email: "", AuthToken: "" },
  login: () => { },
  logout: () => { }
});
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const [user, setUser] = useState({ id: "", name: "", email: "", AuthToken: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const userDataFromSession = sessionStorage.getItem("user");
    if (userDataFromSession) {
      const parsedUserData = JSON.parse(userDataFromSession);
      setUser(parsedUserData);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const loadingPromise = callLoadingWithPromise(
        "Trwa logowanie...",
        axios.post(`${config.backend}${urls.backend.auth.login}`, {
          email: email,
          password: password,
        }),
        "Zalogowano pomyślnie!",
        "Błąd logowania. Sprawdź poprawność danych."
      );

      const response = await loadingPromise;

      if (response && response.status === 200) {
        register();
        setUser({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          AuthToken: response.data.AuthToken,
        });
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            AuthToken: response.data.AuthToken,
          })
        );
        navigate(urls.client.problems)
        return true;
      }
      
      return false;
    
    } catch {
      return false;
    }
  };

  const logout = async () => {
    sessionStorage.removeItem("user");
    setUser({ id: "", name: "", email: "", AuthToken: "" });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <>
        <RenderMenu />
        <main className="container bg-light p-4">
          <RenderRoutes />
        </main>
      </>
    </AuthContext.Provider>
  );
};


