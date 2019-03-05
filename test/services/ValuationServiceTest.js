var assert = require('assert');
var ValuationServiceTest = require('../../src/services/ValuationService');

describe('The ValuationService', function() {
    it('will reduce the initial value by 25% if the car had more than 2 previous owners.', async function() {
        assert.equal(1000, ValuationServiceTest.getAdjustedValue(1000, 1, 0, 0, 0));
        assert.equal(750, ValuationServiceTest.getAdjustedValue(1000, 3, 0, 0, 0));
    });

    it('will reduce the initial value by 0.5% per month up to 120 months.', async function() {
        assert.equal(1000, ValuationServiceTest.getAdjustedValue(1000, 1, 0, 0, 0));
        assert.equal(400, ValuationServiceTest.getAdjustedValue(1000, 1, 120, 0, 0));
        assert.equal(400, ValuationServiceTest.getAdjustedValue(1000, 1, 121, 0, 0));
    });

    it('will reduce the initial value by 0.2% for every 1,000 miles up to 150,000 miles.', async function() {
        assert.equal(1000, ValuationServiceTest.getAdjustedValue(1000, 1, 0, 0, 0));
        assert.equal(700, ValuationServiceTest.getAdjustedValue(1000, 1, 0, 150000, 0));
        assert.equal(700, ValuationServiceTest.getAdjustedValue(1000, 1, 0, 200000, 0));
    });

    it('will remove 2% of the value, up to a total of 5% for each collision.', async function() {
        assert.equal(1000, ValuationServiceTest.getAdjustedValue(1000, 1, 0, 0, 0));
        assert.equal(980, ValuationServiceTest.getAdjustedValue(1000, 1, 0, 0, 1));
        assert.equal(960, ValuationServiceTest.getAdjustedValue(1000, 1, 0, 0, 2));
        assert.equal(950, ValuationServiceTest.getAdjustedValue(1000, 1, 0, 0, 3));
        assert.equal(950, ValuationServiceTest.getAdjustedValue(1000, 1, 0, 0, 4));
    });

    it('will add ten (10) percent to the final value if there are no previous owners.', async function() {
        assert.equal(1000, ValuationServiceTest.getAdjustedValue(1000, 1, 0, 0, 0));
        assert.equal(1100, ValuationServiceTest.getAdjustedValue(1000, 0, 0, 0, 0));
    });

    it('will correctly value my car.', async function() {
        assert.equal(9746.6808, ValuationServiceTest.getAdjustedValue(15000,1, 48, 72514, 0));
        assert.equal(10721.34888, ValuationServiceTest.getAdjustedValue(15000,0, 48, 72514, 0));
        assert.equal(7310.0106, ValuationServiceTest.getAdjustedValue(15000,3, 48, 72514, 0));
    });
});