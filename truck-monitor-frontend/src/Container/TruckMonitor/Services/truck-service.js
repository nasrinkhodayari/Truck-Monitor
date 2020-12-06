import apiRequests from "../../../Utils/api-requests";
const {
    REACT_APP_TRUCK_MONITOR_API_URL,
    REACT_APP_TRUCK_MONITOR_API_PORT,
    REACT_APP_GET_TRUCK_BY_LICENSE_PLATE
} = process.env;

const truckService = {
    getTruckByLicensePlate: licensePlate => {
        return apiRequests.get(
            `${REACT_APP_TRUCK_MONITOR_API_URL}:${REACT_APP_TRUCK_MONITOR_API_PORT}`,
            `${REACT_APP_GET_TRUCK_BY_LICENSE_PLATE}/${licensePlate.toLocaleUpperCase()}`);
    }
};
export default truckService;
