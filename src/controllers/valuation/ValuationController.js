const Ajv = require('ajv');
const VehicleService = require('../../services/VehicleService');
const ValuationService = require('../../services/ValuationService');
const ResponseUtil = require('../../utilities/ResponseUtil');

const ajv = new Ajv();
const validatePostRequestSchema = ajv.compile(require('./post-schema.json'));

module.exports = class ValuationController {
    static async get (request, response) {
        let responseUtil = new ResponseUtil(response);

        if (!validatePostRequestSchema(request.body)) {
            return responseUtil.sendAjvError(validatePostRequestSchema.errors);
        }

        if (!await VehicleService.validateMakeAndModel(request.body.make, request.body.model)) {
            return responseUtil.sendGeneralError(400, "Invalid make or model.");
        }

        return responseUtil.sendSuccess({
            adjustedValue: ValuationService.getAdjustedValue(
                request.body.value,
                request.body.previousOwners,
                request.body.ageInMonths,
                request.body.mileage,
                request.body.numberOfCollisions
            )
        });
    }
};