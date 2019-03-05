const express = require('express');
const bodyParser = require('body-parser');
const ValuationController = require('./controllers/valuation/ValuationController');
const ErrorController = require('./controllers/error/ErrorController');

const app = express();
app.use(bodyParser());
app.post('/value', ValuationController.get);
app.use(ErrorController.handle);
app.listen(8080, () => console.log("Server is listening on port 8080."));