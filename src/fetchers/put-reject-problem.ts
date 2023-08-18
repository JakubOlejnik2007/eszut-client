import axios from "axios";
import { config } from "../utils/config";
import urls from "../utils/urls";

const putRejectProblem = async (AuthToken: string, ProblemID: string) => {
    const response = await axios.put(
        `${config.backend}${urls.backend.problem.rejectProblem}`,
        {
            ProblemID: ProblemID
        },
        {
            headers: {
                Authorization: `Bearer ${AuthToken}`,
            },
        }
    );
    return response.data;
};

export default putRejectProblem;
