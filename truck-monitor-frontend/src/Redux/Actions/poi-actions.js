import { SET_POI, SET_POI_RADIUS } from '../Types/poi-types';

export const setPOI = (selectedPOI) => {
    return {
        type: SET_POI,
        selectedPOI
    }
}
export const setPOIRadius = (selectedPOIRadius) => {
    return {
        type: SET_POI_RADIUS,
        selectedPOIRadius
    }
}