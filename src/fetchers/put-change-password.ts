import axios from "axios";
import { config } from "../utils/config";
import urls from "../utils/urls";

const putMarkProblemAsSolved = async (AuthToken: string, oldPassword: string, newPassword: string, AdministratorID: string) => {
    const response = await axios.put(
        `http://${config.backend}${urls.backend.user.changePassword}`,
        {
            newPassword: newPassword,
            oldPassword: oldPassword,
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

export default putMarkProblemAsSolved;
