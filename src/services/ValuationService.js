class ValuationService {
    static getAdjustedValue(value, previousOwners, ageInMonths, mileage, numberOfCollisions) {

        // If the car has had more than 2 previous owners, reduce its initial value by twenty-five (25) percent before
        // applying other value alterations.
        if (previousOwners > 2) {
            value -= value * 0.25;
        }

        // Given the number of months of how old the car is, reduce its value one-half (0.5) percent.
        // After 10 years, it's value cannot be reduced further by age.
        let ageAdjustment = Math.min(120, ageInMonths) * 0.005;
        value -= value * ageAdjustment;

        // Given the vehicle’s mileage, reduce its value by one-fifth of a percent (0.2) for every 1,000 miles.
        // After 150,000 miles, it's value cannot be reduced further by miles.  Do not consider any remaining miles.
        if (mileage) {
            let mileageAdjustment = Math.min(150000, mileage) / 1000 * 0.002;
            value -= value * mileageAdjustment;
        }

        // For every reported collision the car has been in, remove two (2) percent of its value, up to five (5)
        // collisions.
        if (numberOfCollisions) {
            let collisionAdjustment = Math.min(0.05, numberOfCollisions * 0.02);
            value -= value * collisionAdjustment;
        }

        // If the car has had no previous owners, add ten (10) percent to the final value, after all other value
        // alterations.
        if (previousOwners === 0)
        {
            value += value * 0.10;
        }

        return value;
    }
}

module.exports = ValuationService;