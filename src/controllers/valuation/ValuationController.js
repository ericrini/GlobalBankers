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

            // BRIEF EDITORIAL:
            // In V8, all the user code runs on a single thread, so even though lines 13 and 20 are technically a
            // critical section, it works anyway. While this is a strength that makes it possible to write performant
            // IO parallelism in record time, it's also a liability that makes it impossible to solve CPU bound
            // problems. For this reason it's hard for me to respect V8 as a "general purpose" platform. :)
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