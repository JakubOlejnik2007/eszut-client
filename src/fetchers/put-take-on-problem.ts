import axios from "axios";
import { config } from "../utils/config";
import urls from "../utils/urls";

const putTakeOnProblem = async (AuthToken: string, AdministratorID: string, ProblemID: string) => {
    const response = await axios.put(
        `${config.backend}${urls.backend.problem.takeOnProblem}`,
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

export default putTakeOnProblem;
