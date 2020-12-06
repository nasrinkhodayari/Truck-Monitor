import { GET_TRUCK } from '../Types/truck-types';

export const getTruckByPlateId = truck => {  
    return {
        type: GET_TRUCK,
        truck
    }
}