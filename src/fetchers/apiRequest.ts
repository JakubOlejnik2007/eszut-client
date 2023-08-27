import axios from "axios";

type THTTPRequestMethods = "GET" | "POST" | "PUT" | "DELETE";

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
