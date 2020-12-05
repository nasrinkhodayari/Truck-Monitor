import { GET_TRUCK, TRUCK_LICENSE_PLATE } from '../../../Redux/Types/truck-types';

import { icn_current_location } from "../../../Constance/map-icons";
import { flyMapCenter } from '../../../Utils/util';
const { REACT_APP_MAPBOX_ZOOM } = process.env;

const truckService = {
    getTruckByID: (inputParams) => {
        const { dispatch, licensePlate, addMarker, map } = inputParams;
        dispatch({ type: TRUCK_LICENSE_PLATE, truckLicensePlate: licensePlate });
        const truckData = require("../../../Mocks/truck.json");
        dispatch({ type: GET_TRUCK, truck: truckData });
        flyMapCenter({
            map: map,
            center: [
                truckData.source_lng,
                truckData.source_lat
            ],
            zoom: REACT_APP_MAPBOX_ZOOM - 3
        });
        addMarker({
            map: map,
            center: [truckData.source_lng, truckData.source_lat],
            icon: icn_current_location,
            markerType: 'truck',
            title: `Truck License Plate : ${licensePlate.toUpperCase()}`
        });
      
        // apiRequests.getByParam(truckData,truckLicensePlat)
        //     .then((truck) => dispatch({ type: GET_TRUCK, truck: truck }))
        //     .catch(error => dispatch({ type: TRUCK_ERROR, error: error }));
    }
};
export default truckService;
