import { GET_TRUCK, TRUCK_ERROR } from '../Types/truck-types';

const initialState = {
    truck: {},
    error: {}
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
        default: return state
    }

}
export default TruckReducer;