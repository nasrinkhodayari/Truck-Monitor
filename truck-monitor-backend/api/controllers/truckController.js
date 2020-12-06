Truck = require("../models/truckModel");
exports.list_all_trucks = function (req, res) {
    Truck.find({}, function (err, truck) {
        if (err)
            res.send(err);
        res.json(truck);
    });
};
exports.create_one_or_bunch_truck = function (req, res) {
    var new_trucks = (req.body);
    Truck.insertMany(new_trucks, function (err, truck) {
        if (err)
            res.status(500).send({
                message: err.message,
                detail: err.detail
            });
        res.json(truck);
    });
};
exports.read_a_truck = function (req, res) {
    Truck.find({ license_plate: req.params.license_plate }, function (err, truck) {
        
        if (err)
            res.status(500).send({
                message: err.message,
                detail: err.detail
            });
        if (truck.length !== 0) {
            let searchResult = {
                current_lat: truck[0].current_lat,
                current_lng: truck[0].current_lng,
                license_plate: truck[0].license_plate,
                source_lat: truck[0].source_lat,
                source_lng: truck[0].source_lng,
                truckRoute: truck[0].truckRoute
            };
            res.json(searchResult);
        }
        else
            res.status(404).send({
                message: 'TrucK not found,Please insert correct LicensePlate.',
                detail: 'Item not found'
            });
    });
};
