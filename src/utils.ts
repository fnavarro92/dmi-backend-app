export const axiosErrorHandler = (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw { status: error.response.status, message: JSON.stringify(error.response.data) };
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        throw { status: 500, message: 'No response was received from service' };
    } else {
        // Something happened in setting up the request that triggered an Error
        throw { status: 500, message: error.message || 'An unexpected error ocurred' };
    }
};