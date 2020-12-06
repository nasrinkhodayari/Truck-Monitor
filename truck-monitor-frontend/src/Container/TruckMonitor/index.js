import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { APP_LOADING } from '../../Redux/Types/main-types';
import "./style.scss";
import SearchBox from "./SearchBox";
import mapboxgl from 'mapbox-gl';
import AppLoading from "../../Components/Loading";
const {
    REACT_APP_MAPBOX_ACCESS_TOKEN,
    REACT_APP_MAPBOX_CENTER_LNG,
    REACT_APP_MAPBOX_CENTER_LAT,
    REACT_APP_MAPBOX_ZOOM,
    REACT_APP_MAPBOX_STYLE }
    = process.env;

const TruckMonitor = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const storeData = useSelector(state => state);
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const { MainReducer } = storeData;

    const addMarker = markerItem => {

        let markerEl = document.createElement('div');
        markerEl.classList.add('marker');
        markerEl.classList.add(markerItem.markerType);
        markerEl.style.backgroundImage = `url(${markerItem.icon})`;

        let popupEl = document.createElement('span');
        popupEl.className = markerItem.markerType;
        popupEl.innerHTML = markerItem.title;
        const addPopup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(popupEl.outerHTML);

        new mapboxgl.Marker(markerEl)
            .setLngLat(markerItem.center)
            .setPopup(addPopup)
            .addTo(markerItem.map);
    };
    useEffect(() => {
        mapboxgl.accessToken = REACT_APP_MAPBOX_ACCESS_TOKEN;
        const initializeMap = ({ setMap, mapContainer }) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: REACT_APP_MAPBOX_STYLE, // stylesheet location
                center: [REACT_APP_MAPBOX_CENTER_LNG, REACT_APP_MAPBOX_CENTER_LAT], // starting position [lng, lat]
                zoom: REACT_APP_MAPBOX_ZOOM // starting zoom
            });
            map.on("load", () => {
                setMap(map);
                dispatch({ type: APP_LOADING, loading: false });
                map.addControl(new mapboxgl.NavigationControl());
                map.resize();
            });
        };

        if (!map) initializeMap({ setMap, mapContainer });
    }, [map]);
    return (
        <div className="truck-monitor-root">
            {MainReducer.loading && <AppLoading />}
            {map && <SearchBox map={map}
                mapboxgl={mapboxgl}
                storeData={storeData}
                dispatch={dispatch}
                t={t}
                addMarker={addMarker} />}
            <div className='map-container' ref={el => (mapContainer.current = el)} />
        </div>
    );
}

export default TruckMonitor;