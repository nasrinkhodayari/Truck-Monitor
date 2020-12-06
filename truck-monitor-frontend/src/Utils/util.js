import { icn_gas_station, icn_hotel, icn_restaurant } from "../Constance/map-icons";
import { APP_ERROR } from "../Redux/Types/main-types";

export const addMarker = markerInfo => {
    const { mapboxgl, center, icon, markerType, title, map } = markerInfo;
    let markerEl = document.createElement('div');
    markerEl.classList.add('marker');
    markerEl.classList.add(markerType);
    markerEl.style.backgroundImage = `url(${icon})`;

    let popupEl = document.createElement('span');
    popupEl.className = markerType;
    popupEl.innerHTML = title;
    const addPopup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(popupEl.outerHTML);

    new mapboxgl.Marker(markerEl)
        .setLngLat(center)
        .setPopup(addPopup)
        .addTo(map);
};

export const removeMarker = markerType => {
    document.querySelectorAll(`.${markerType}`).forEach(marker => {
        marker.remove();
    });
    document.querySelectorAll('.mapboxgl-popup-tip').forEach(tip => {
        tip.remove();
    });
    document.querySelectorAll('.mapboxgl-popup-content').forEach(popup => {
        popup.remove();
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
    if (map)
        map.flyTo({
            center: center, zoom: zoom
        });

};

export const errorHandler = error => {
    const { errorData, dispatch } = error;
    dispatch({ type: APP_ERROR, errorMessage: errorData.data.message || 'something went wrong' });
}