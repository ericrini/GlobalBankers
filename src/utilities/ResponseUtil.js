module.exports = class ResponseUtil {
    constructor(response) {
        this._response = response;
    }

    sendSuccess(data) {
        this._response.status(200);
        this._response.send({
            status: "success",
            data: data
        });
    }

    sendAjvError(data) {
        if (!data || data.length < 1) {
            throw new Error("ResponseUtil.sendAjvError() was called without any errors?");
        }

        this._response.status(400);
        this._response.send({
            status: "error",
            message: `Invalid request at ${data[0].schemaPath}. ${data[0].message[0].toUpperCase()}${data[0].message.substring(1)}.`
        });
    }

    sendGeneralError(code, message) {
        this._response.status(code);
        this._response.send({
            status: "error",
            message: message
        });
    }
};