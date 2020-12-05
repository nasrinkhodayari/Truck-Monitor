import { icn_gas_station, icn_hotel, icn_restaurant } from "../Constance/map-icons";
export const removeMarker = markerType => {
    document.querySelectorAll(`.${markerType}`).forEach(function (marker) {
        marker.remove()
    });
};

export const markerIconDetector = iconCategories => {
    let categoryIcon = '';
    if (iconCategories.indexOf('gas station') !== -1 ||
        iconCategories.indexOf('fuel') !== -1)
        categoryIcon = icn_gas_station;
    if (iconCategories.indexOf('hotel') !== -1 ||
        iconCategories.indexOf('motel') !== -1)
        categoryIcon = icn_hotel;
    if (iconCategories.indexOf('restaurant') !== -1)
        categoryIcon = icn_restaurant;
    return categoryIcon;
};

export const flyMapCenter = mapInfo => {
    const { map, center, zoom } = mapInfo;
    map.flyTo({
        center: center, zoom: zoom
    });

};