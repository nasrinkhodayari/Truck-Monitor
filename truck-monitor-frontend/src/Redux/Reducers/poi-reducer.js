import { SET_POI, SET_POI_RADIUS } from '../Types/poi-types';

const initialState = {
    selectedPOI: {}
}

const POIReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POI:
            return {
                ...state,
                selectedPOI: action.selectedPOI

            }
        case SET_POI_RADIUS: {
            return {
                ...state,
                selectedPOIRadius: action.selectedPOIRadius

            }
        }
        default: return state
    }

}
export default POIReducer;