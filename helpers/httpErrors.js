const message= {
    400: "Bad request",
    401:  "Unauthorized",
    403:   "Forbidden",
    404:    "Not Found",
    409:    "Conflict",
};

const httpError = (status ,message = message[status])=>{
    const error = new Error(message);
    error.status = status;
    return error;
};

export{httpError};