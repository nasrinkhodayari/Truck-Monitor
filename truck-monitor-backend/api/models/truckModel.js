const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let TruckModel = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    license_plate:
    {
        type: String,
        required: 'Please enter a valid License Plate'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    source_lat: Number,
    source_lng: Number,
    current_lng: Number,
    current_lat: Number,
    truckRoute: [{ type: Array, "default": [] }]
});

module.exports = mongoose.model('Truck', TruckModel);