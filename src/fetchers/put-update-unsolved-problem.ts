import axios from "axios";
import { config } from "../utils/config";
import urls from "../utils/urls";

const putUpdateUnsolvedProblem = async (AuthToken: string, priority: string, CategoryID: string, ProblemID: string) => {
    console.log(AuthToken);
    const response = await axios.put(
        `http://${config.backend}${urls.backend.problem.updateProblem}`,
        {
            ProblemID: ProblemID,
            priority: priority,
            CategoryID: CategoryID,
        },
        {
            headers: {
                Authorization: `Bearer ${AuthToken}`,
            },
        }
    );
    return response.data;
};

export default putUpdateUnsolvedProblem;
