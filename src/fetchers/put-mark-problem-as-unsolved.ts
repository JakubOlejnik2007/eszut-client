import axios from "axios";
import { config } from "../utils/config";
import urls from "../utils/urls";

const putMarkProblemAsUnsolved = async (AuthToken: string, ProblemID: string, AdministratorID: string) => {
    const response = await axios.put(
        `${config.backend}${urls.backend.problem.markProblemAsUnsolved}`,
        {
            ProblemID: ProblemID,
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

export default putMarkProblemAsUnsolved;
