import { SET_POI, SET_POI_RADIUS } from "../../../Redux/Types/poi-types";
import apiRequests from "../../../Utils/api-requests";
const poisLabelData = require("../../../Mocks/poi.json");
const poisRadiusLabeLabelData = require("../../../Mocks/radius.json");
const { REACT_APP_POI_LIMIT_COUNT,
    REACT_APP_GET_COUNTRY,
    REACT_APP_MAPBOX_ACCESS_TOKEN,
    REACT_APP_GET_POIS_MABBOX_API,
    REACT_APP_GET_RADIUS_MABBOX_API
} = process.env;

const poiService = {
    getpoiLabelList: (t) => {
        let translatedPoiLabelList = poisLabelData;
        translatedPoiLabelList.map(item => item.label = t(item.label));
        return translatedPoiLabelList
    },
    getNearestPois: (inputParams) => {
        const { truck, poiTypes, dispatch } = inputParams;
        dispatch({ type: SET_POI, selectedPOI: poiTypes });

        let nearestPoisURL = [
            `${poiTypes.value}.json?`,
            `types=poi&limit=${REACT_APP_POI_LIMIT_COUNT}&`,
            `country=${REACT_APP_GET_COUNTRY}&`,
            `proximity=${truck.source_lng},`,
            `${truck.source_lat}&`,
            `access_token=${REACT_APP_MAPBOX_ACCESS_TOKEN}`
        ].join('');
        return apiRequests.get(
            REACT_APP_GET_POIS_MABBOX_API,
            nearestPoisURL);
    },
    getpoiByRadiusLabelList: () => {
        return poisRadiusLabeLabelData
    },
    getNearestPoisByRadius: (inputParams) => {
        const { truck, radius, dispatch } = inputParams;
        dispatch({ type: SET_POI_RADIUS, selectedPOIRadius: radius });

        let nearestPoisByRadiusURL = [
            `${truck.source_lng},${truck.source_lat}.json?`,
            `radius=${radius.value}&`,
            `limit=${REACT_APP_POI_LIMIT_COUNT}&dedupe&`,
            `geometry=point&`,
            `layers=poi_label&`,
            `access_token=${REACT_APP_MAPBOX_ACCESS_TOKEN}`
        ].join('');
        return apiRequests.get(
            REACT_APP_GET_RADIUS_MABBOX_API,
            nearestPoisByRadiusURL);
    }
};
export default poiService;
