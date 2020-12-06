import { GET_TRUCK } from '../Types';

export const getTruckByPlateId = truck => {  
    return {
        type: GET_TRUCK,
        truck
    }
}