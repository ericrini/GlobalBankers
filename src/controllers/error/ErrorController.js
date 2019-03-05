const ResponseUtil = require('../../utilities/ResponseUtil');

module.exports = class ErrorController {
    static async handle (error, request, response, next) {
        if (error.name === "SyntaxError") {
            return new ResponseUtil(response).sendGeneralError(400, "Please verify the request body is well formed JSON.");
        }

        let incidentId = Math.random() * 1000000;
        console.log(incidentId, error.stack);
        new ResponseUtil(response).sendGeneralError(500, `Please contact product support for incident '${incidentId}'.`);
    }
};