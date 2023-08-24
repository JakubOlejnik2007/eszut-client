import axios from "axios";
import { config } from "../utils/config";
import urls from "../utils/urls";

const insertNewCategory = async (AuthToken: string, name: string) => {
    const response = await axios.post(
        `${config.backend}${urls.backend.forms.insertNewCategory}`,
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

export default insertNewCategory;
