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
        res.json(truck);
    });
};
