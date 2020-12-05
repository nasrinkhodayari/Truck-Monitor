import { GET_TRUCK, TRUCK_ERROR } from '../Types';

export const getTruckByPlateId = (truck) => {  
    return {
        type: GET_TRUCK,
        truck
    }
}
export const getTruckLicensePlate = (licensePlate) => {    
    return {
        type: GET_TRUCK,
        licensePlate
    }
}