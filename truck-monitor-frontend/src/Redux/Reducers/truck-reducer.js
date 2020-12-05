import { GET_TRUCK, TRUCK_ERROR, TRUCK_LICENSE_PLATE } from '../Types/truck-types';

const initialState = {
    truck: {}
}

const TruckReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRUCK:
            return {
                ...state,
                truck: action.truck

            }
        case TRUCK_ERROR:
            return {
                ...state,
                error: action.error

            }
        case TRUCK_LICENSE_PLATE:
            return {
                ...state,
                truckLicensePlate: action.truckLicensePlate

            }
        default: return state
    }

}
export default TruckReducer;