import axios from "axios";
import { config } from "../utils/config";
import urls from "../utils/urls";

const insertNewPlace = async (AuthToken: string, name: string) => {
    const response = await axios.post(
        `${config.backend}${urls.backend.forms.insertNewPlace}`,
        {
            name: name,
        },
        {
            headers: {
                Authorization: `Bearer ${AuthToken}`,
            },
        }
    );
    return response.data;
};

export default insertNewPlace;
