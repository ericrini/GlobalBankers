const assert = require("assert");
const VehicleService = require("../../src/services/VehicleService");
const nock = require("nock");

describe("The VehicleService", function() {
    beforeEach(() => {
        const goodResponse = JSON.stringify({
            Results: [
                {Make_Name: "Bmw", Model_Name: "M3"}
            ]
        });

        const badResponse = JSON.stringify({
            Results: []
        });

        nock("https://vpic.nhtsa.dot.gov")
            .get('/api/vehicles/GetModelsForMake/bmw?format=json').reply(200, goodResponse)
            .get('/api/vehicles/GetModelsForMake/invalid?format=json').reply(200, badResponse)
            .get('/api/vehicles/GetModelsForMake/null?format=json').reply(200, badResponse)
            .get('/api/vehicles/GetModelsForMake/undefined?format=json').reply(200, badResponse);
    });

    it("can validate the make and model of a vehicle.", async function() {
        assert(await VehicleService.validateMakeAndModel("Bmw", "M3"));
        assert(await VehicleService.validateMakeAndModel("bmw", "m3"));
        assert.equal(await VehicleService.validateMakeAndModel("invalid", "invalid"), false);
        assert.equal(await VehicleService.validateMakeAndModel("", ""), false);
        assert.equal(await VehicleService.validateMakeAndModel(null, null), false);
        assert.equal(await VehicleService.validateMakeAndModel(undefined, undefined), false);
    });
});