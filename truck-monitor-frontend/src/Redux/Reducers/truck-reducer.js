import { GET_TRUCK } from '../Types/truck-types';

const initialState = {
    truck: {}
}

const TruckReducer = (state = initialState, action) => {
    const { truck } = action;
    switch (action.type) {
        case GET_TRUCK:
            return {
                ...state,
                truck: truck

            }
        default: return state
    }

}
export default TruckReducer;