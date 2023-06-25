class HttpError extends Error {
    constructor(message, errorCode) {
        super(message);
        this.errorStatusCode = errorCode;
    }
};

module.exports = HttpError;