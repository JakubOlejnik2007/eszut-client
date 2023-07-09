import axios from "axios";
import { config } from "../utils/config";
import urls from "../utils/urls";
const fetchPlaces = async () => {
  const response = await axios.get(
    `http://${config.backend}${urls.backend.forms.getPlaces}`
  );
  return response.data;
};
export default fetchPlaces;
