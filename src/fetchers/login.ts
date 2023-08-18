import axios from "axios";
import { config } from "../utils/config";
import urls from "../utils/urls";

const login = async (email: string, password: string) => {
    return await axios.post(`${config.backend}${urls.backend.auth.login}`, {
        email: email,
        password: password,
    });
};

export default login;
