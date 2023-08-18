import axios from "axios";
import { config } from "../utils/config";
import urls from "../utils/urls";

const fetchUnsolvedProblems = async (AuthToken: string) => {
  const response = await axios.get(
    `${config.backend}${urls.backend.problem.getUnsolvedProblems}`, {
        headers: {
            Authorization: `Bearer ${AuthToken}`
        }
    }
  );
  return response.data;
};

export default fetchUnsolvedProblems;
