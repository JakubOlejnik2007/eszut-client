import axios from "axios";

type THTTPRequestMethods = "GET" | "POST" | "PUT" | "DELETE";

/**
 * The function `createApiRequest` is an asynchronous function that sends an HTTP request with the
 * specified method, URL, data, and authentication token, and returns the response data.
 * @param {THTTPRequestMethods} method - The method parameter is the HTTP request method, such as GET,
 * POST, PUT, DELETE, etc. It is of type THTTPRequestMethods, which is a custom type that defines the
 * possible values for the HTTP request methods.
 * @param {string} url - The `url` parameter is a string that represents the URL of the API endpoint
 * that you want to send the request to.
 * @param {Object} data - The `data` parameter is an object that contains the data to be sent in the
 * request body. It is optional and has a default value of an empty object `{}`.
 * @param {string} [authToken] - The `authToken` parameter is a string that represents the
 * authentication token used for authorization purposes. It is optional and defaults to an empty string
 * if not provided.
 * @returns the data from the response of the API request.
 */
const createApiRequest = async (method: THTTPRequestMethods, url: string, data: Object = {}, authToken: string = "") => {
    const config = {
        method,
        url,
        headers: {
            ...(authToken && { Authorization: `Bearer ${authToken}` }),
        },
        data,
    };
    const response = await axios(config);
    return response.data;
};

export default createApiRequest;
