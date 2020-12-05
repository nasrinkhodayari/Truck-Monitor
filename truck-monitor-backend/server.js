const { port, mongoURI } = config = require("./config");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser');

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).
then(() => console.log("connection established")).
catch(error => console.log(`connection failed because =>${error}`));

require("./api/models/truckModel");
const app = express();
app.use(bodyParser.urlencoded({extended : true}));

var truckRoute = require('./api/routes/truckRoute'); //importing route
truckRoute(app); //register the route
app.listen(port, function () {
    console.log("Server is running on Port: " + port);
});