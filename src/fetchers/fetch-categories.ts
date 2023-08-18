import axios from "axios";
import { config } from "../utils/config";
import urls from "../utils/urls";
const fetchCategories = async () => {
  const response = await axios.get(
    `${config.backend}${urls.backend.forms.getCategories}`
  );
  return response.data;
};
export default fetchCategories;
