import axios from "axios";
import { config } from "../utils/config";
import urls from "../utils/urls";

const fetchSolvedProblems = async (AuthToken: string, page: number) => {
  const response = await axios.get(
    `${config.backend}${urls.backend.problem.getSolvedProblems}?page=${page}`, {
        headers: {
            Authorization: `Bearer ${AuthToken}`
        }
    }
  );
  return response.data;
};

export default fetchSolvedProblems;
