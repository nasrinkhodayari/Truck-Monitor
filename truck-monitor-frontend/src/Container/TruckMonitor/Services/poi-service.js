import apiRequests from "../../../Utils/api-requests";
const poisLabelData = require("../../../Mocks/poi.json");

const { REACT_APP_POI_LIMIT_COUNT,
    REACT_APP_GET_COUNTRY,
    REACT_APP_MAPBOX_ACCESS_TOKEN,
    REACT_APP_GET_POIS_MABBOX_API,
    REACT_APP_GET_RADIUS_MABBOX_API
} = process.env;

const poiService = {
    getpoiLabelList: () => {
        return poisLabelData
    },
    getNearestPois: inputParams => {
        const { truck: { source_lat, source_lng }, poiTypes, dispatch } = inputParams;

        let nearestPoisURL = [
            `${poiTypes.value}.json?`,
            `types=poi&limit=${REACT_APP_POI_LIMIT_COUNT}&`,
            `country=${REACT_APP_GET_COUNTRY}&`,
            `proximity=${source_lng},`,
            `${source_lat}&`,
            `access_token=${REACT_APP_MAPBOX_ACCESS_TOKEN}`
        ].join('');
        return apiRequests.get({
            path: REACT_APP_GET_POIS_MABBOX_API,
            apiURL: nearestPoisURL,
            dispatch: dispatch
        });
    },
    getpoiByRadiusLabelList: () => {
        const poisRadiusLabeLabelData = require("../../../Mocks/radius.json");
        return poisRadiusLabeLabelData
    },
    getNearestPoisByRadius: inputParams => {
        const { truck, radius, dispatch } = inputParams;
        let nearestPoisByRadiusURL = [
            `${truck.source_lng},${truck.source_lat}.json?`,
            `radius=${radius.value}&`,
            `limit=${REACT_APP_POI_LIMIT_COUNT}&dedupe&`,
            `geometry=point&`,
            `layers=poi_label&`,
            `access_token=${REACT_APP_MAPBOX_ACCESS_TOKEN}`
        ].join('');
        return apiRequests.get({
            path: REACT_APP_GET_RADIUS_MABBOX_API,
            apiURL: nearestPoisByRadiusURL,
            dispatch: dispatch
        });
    }
};
export default poiService;
