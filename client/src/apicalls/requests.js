const { axiosInstance } = require(".");

//get all requests for a user
export const GetAllRequestsByUser = async () => {
    try {
        const { data } = await axiosInstance.post("/api/requests/get-all-requests-by-user");
        return data;
    } catch (error) {
        return error.response.data;
    }
}

//send request to another user
export const SendRequest = async (request) => {
    try {
        const { data } = await axiosInstance.post("/api/requests/send-request");
        return data;
    } catch (error) {
        return error.response.data;
    }
}