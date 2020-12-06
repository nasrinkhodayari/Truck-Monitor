const { port, mongoURI } = config = require("./config");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser');

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).
    then(() => console.log("connection established")).
    catch(error => console.log(`connection failed because =>${error}`));

require("./api/models/truckModel");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var truckRoute = require('./api/routes/truckRoute'); //importing route
truckRoute(app); //register the route
app.listen(port, function () {
    console.log("Server is running on Port: " + port);
});