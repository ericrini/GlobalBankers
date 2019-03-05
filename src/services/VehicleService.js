const request = require('request-promise-cache'); // Hell yeah, make it fast AF.
const modelsForMakeUri = "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${make}?format=json";

async function getModelsForMake(make) {
    let uri = modelsForMakeUri.replace("${make}", make ? make.toLowerCase() : "undefined");

    let response = await request({
        method: 'GET',
        uri: uri,
        resolveWithFullResponse: true,
        cacheKey: uri,
        cacheTTL: 3600,
        cacheLimit: 12
    });

    if (!response || response.statusCode !== 200) {
        console.log(`Received an error code ${response.statusCode} from upstream at ${uri}.`);
        return [];
    }

    try {
        let parsed = JSON.parse(response.body);

        if (!parsed || !parsed.Results) {
            console.log(`Received an unexpected response from upstream at ${uri}.`);
            return [];
        }

        return parsed.Results;
    }
    catch (error) {
        console.log(error.stack);
        return [];
    }
}

module.exports = class VehicleService {
    static async validateMakeAndModel (make, model) {
        let data = await getModelsForMake(make);

        for (let i = 0; i < data.length; i++) {
            let makeMatch = data[i].Make_Name.toLowerCase() === make.toLowerCase();
            let modelMatch = data[i].Model_Name.toLowerCase() === model.toLowerCase();

            if (makeMatch && modelMatch) {
                return true;
            }
        }

        return false;
    }
};