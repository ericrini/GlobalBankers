# Running
Run these commands in the project root.

```shell
npm install
npm test
npm start
```

You can send a test request with curl if you want.

```shell
curl -i -X POST \
   -H "Content-Type:application/json; charset=utf-8" \
   -d \
'{
  "make": "Mazda",
  "model": "Mazda3",
  "ageInMonths": 60,
  "previousOwners": 1,
  "mileage": 200000,
  "collisions": 0,
  "value": 23000
}' \
 'http://localhost:8080/value'
```

# Requirements

I am reaching out to you today as part of our pre-screening process at Global Bankers. We use a code test to assess a candidate’s technical skills in a consistent and objective manner. Please see below and let me know if you have any questions.

You are tasked with writing a nodejs REST server which exposes an endpoint for /value
This endpoint takes in data about a vehicle, then returns the value of a used car.

Given the following data:

VALUE:
The initial value of the vehicle.

MAKE & MODEL:
Verify that the make and model are known to the U.S. DEPARTMENT OF TRANSPORTATION.
If the vehicle make is not listed, return an HTTP error.

We recommend that you check against this free API:  
https://vpic.nhtsa.dot.gov/api/
Hint: /getmodelsformake/{make} looks like a useful endpoint

AGE:
Given the number of months of how old the car is, reduce its value one-half (0.5) percent.  
After 10 years, it's value cannot be reduced further by age. This is not cumulative.

MILEAGE:
Given the vehicle’s mileage, reduce its value by one-fifth of a percent (0.2) for every 1,000 miles.
After 150,000 miles, it's value cannot be reduced further by miles.  Do not consider any remaining miles.


OWNERS:
If the car has had more than 2 previous owners, reduce its initial value by twenty-five (25) percent before applying other value alterations.  If the car has had no previous owners, add ten (10) percent to the final value, after all other value alterations.

COLLISIONS:
For every reported collision the car has been in, remove two (2) percent of its value, up to five (5) collisions.

Caveats:

VALUE, MAKE, MODEL, AGE, and OWNERS are mandatory fields.  MILEAGE and COLLISIONS are optional.  The service should calculate a value based on present data; omitted data should not affect the calculation.
As stated above, the order of value adjustments should be applied differently if the OWNERS had a positive effect.
Each value affecting factor should apply to the initial VALUE.
No authentication or authorization is required.
No data persistence is required.
Demonstrate an understanding of best practices for REST, service development, code organization, testing, and formatting.


