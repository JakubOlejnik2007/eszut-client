import axios from "axios";
import { config } from "../utils/config";
import urls from "../utils/urls";

const putChangePassword = async (AuthToken: string, newPassword: string, AdministratorID: string) => {
    const response = await axios.put(
        `${config.backend}${urls.backend.user.changePassword}`,
        {
            newPassword: newPassword,
            AdministratorID: AdministratorID
        },
        {
            headers: {
                Authorization: `Bearer ${AuthToken}`,
            },
        }
    );
    return response.data;
};

export default putChangePassword;
