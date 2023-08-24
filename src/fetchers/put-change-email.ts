import axios from "axios";
import { config } from "../utils/config";
import urls from "../utils/urls";

const putChangeEmail = async (AuthToken: string, newEmail: string, AdministratorID: string) => {
    const response = await axios.put(
        `${config.backend}${urls.backend.user.changeEmail}`,
        {
            newEmail: newEmail,
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

export default putChangeEmail;
