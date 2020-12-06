module.exports = function (app) {
    let truckItem = require('../controllers/truckController');
    app.route('/getAllTruck').get(truckItem.list_all_trucks);
    app.route('/addTruck').post(truckItem.create_one_or_bunch_truck);
    app.route('/getTruck/:license_plate').get(truckItem.read_a_truck);
};