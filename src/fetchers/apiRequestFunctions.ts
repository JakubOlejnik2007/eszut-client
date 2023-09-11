import { config } from "../utils/config";
import urls from "../utils/urls";
import createApiRequest from "./apiRequest";

export const getCategories = async () =>
    await createApiRequest("GET", `${config.backend}${urls.backend.forms.getCategories}`);

export const getPlaces = async () => await createApiRequest("GET", `${config.backend}${urls.backend.forms.getPlaces}`);

export const getUnsolvedProblems = async (AuthToken: string) =>
    await createApiRequest("GET", `${config.backend}${urls.backend.problem.getUnsolvedProblems}`, {}, AuthToken);

export const getSolvedProblems = async (AuthToken: string, page: number) =>
    await createApiRequest(
        "GET",
        `${config.backend}${urls.backend.problem.getSolvedProblems}?page=${page}`,
        {},
        AuthToken
    );

export const insertNewCategory = async (AuthToken: string, name: string, priority: string) =>
    await createApiRequest("POST", `${config.backend}${urls.backend.forms.insertNewCategory}`, { name, priority }, AuthToken);

export const deleteCategory = async (AuthToken: string, CategoryID: string) =>
    await createApiRequest(
        "DELETE",
        `${config.backend}${urls.backend.forms.deleteCategory}`,
        { CategoryID },
        AuthToken
    );

export const insertNewPlace = async (AuthToken: string, name: string) =>
    await createApiRequest("POST", `${config.backend}${urls.backend.forms.insertNewPlace}`, { name }, AuthToken);

export const deletePlace = async (AuthToken: string, PlaceID: string) =>
    await createApiRequest("DELETE", `${config.backend}${urls.backend.forms.deletePlace}`, { PlaceID }, AuthToken);

export const putRejectProblem = async (AuthToken: string, ProblemID: string) =>
    await createApiRequest("PUT", `${config.backend}${urls.backend.problem.rejectProblem}`, { ProblemID }, AuthToken);

export const putUpdateUnsolvedProblem = async (
    AuthToken: string,
    priority: string,
    CategoryID: string,
    ProblemID: string
) =>
    await createApiRequest(
        "PUT",
        `${config.backend}${urls.backend.problem.updateProblem}`,
        { ProblemID, CategoryID, priority },
        AuthToken
    );

export const putTakeOnProblem = async (AuthToken: string, AdministratorID: string, ProblemID: string) =>
    await createApiRequest(
        "PUT",
        `${config.backend}${urls.backend.problem.takeOnProblem}`,
        { ProblemID, AdministratorID },
        AuthToken
    );

export const putMarkProblemAsUnsolved = async (AuthToken: string, ProblemID: string, AdministratorID: string) =>
    await createApiRequest(
        "PUT",
        `${config.backend}${urls.backend.problem.markProblemAsUnsolved}`,
        { ProblemID, AdministratorID },
        AuthToken
    );

export const putMarkProblemAsSolved = async (AuthToken: string, ProblemID: string, AdministratorID: string) =>
    await createApiRequest(
        "PUT",
        `${config.backend}${urls.backend.problem.markProblemAsSolved}`,
        { ProblemID, AdministratorID },
        AuthToken
    );

export const putChangePassword = async (
    AuthToken: string,
    oldPassword: string,
    newPassword: string,
    AdministratorID: string
) =>
    await createApiRequest(
        "PUT",
        `${config.backend}${urls.backend.user.changePassword}`,
        { newPassword, oldPassword, AdministratorID },
        AuthToken
    );

export const putChangeEmail = async (AuthToken: string, newEmail: string, AdministratorID: string) =>
    await createApiRequest(
        "PUT",
        `${config.backend}${urls.backend.user.changeEmail}`,
        { newEmail, AdministratorID },
        AuthToken
    );

export const login = async (email: string, password: string) =>
    await createApiRequest("POST", `${config.backend}${urls.backend.auth.login}`, { email, password });

export const addNewAdministrator = async (AuthToken: string, name: string, email: string, password: string) => await createApiRequest("POST", `${config.backend}${urls.backend.user.addNewAdministrator}`, {name, password, email}, AuthToken);

export const getAdmins = async (AuthToken: string) => await createApiRequest("GET", `${config.backend}${urls.backend.user.getAdmins}`, {}, AuthToken);

export const deleteAdministrator = async (AuthToken: string, AdministratorID: string) => await createApiRequest("DELETE", `${config.backend}${urls.backend.user.deleteAdministrator}`, {AdministratorID}, AuthToken);

export const getCommentsToProblem = async (AuthToken: string, ProblemID: string) => await createApiRequest("GET", `${config.backend}${urls.backend.comment.getComments}?ProblemID=${ProblemID}`, {}, AuthToken);

export const insertComment = async (AuthToken: string, ProblemID: string, content: string, AdministratorID: string) => await createApiRequest("POST", `${config.backend}${urls.backend.comment.insertComment}`, {ProblemID, content, AdministratorID}, AuthToken);

export const getLogData = async (AuthToken: string, page: number) => await createApiRequest("GET", `${config.backend}${urls.backend.logs.getLogData}?page=${page}`, {}, AuthToken)