import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { APP_ERROR, APP_LOADING } from '../../Redux/Types/main-types';
import "./style.scss";
import SearchBox from "./SearchBox";
import mapboxgl from 'mapbox-gl';
import AppLoading from "../../Components/Loading";
import AppToast from "../../Components/Toast";
import Welcome from '../../Components/Welcome';
import { Container, Button } from 'react-floating-action-button';

const {
    REACT_APP_MAPBOX_ACCESS_TOKEN,
    REACT_APP_MAPBOX_CENTER_LNG,
    REACT_APP_MAPBOX_CENTER_LAT,
    REACT_APP_MAPBOX_ZOOM,
    REACT_APP_MAPBOX_STYLE }
    = process.env;

const TruckMonitor = () => {
    const dispatch = useDispatch();
    const storeData = useSelector(state => state);
    const { MainReducer: { loading, errorMessage } } = storeData;
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const [showWelcomeHelp, setShowWelcomeHelp] = useState(true);

    useEffect(() => {
        mapboxgl.accessToken = REACT_APP_MAPBOX_ACCESS_TOKEN;
        const initializeMap = () => {
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
        if (!map) initializeMap();
    }, [map, dispatch]);
    return (
        <div>
            <div className="truck-monitor-root">
                {loading && <AppLoading />}
                {errorMessage && <AppToast delay={4000}
                    onClose={() => dispatch({ type: APP_ERROR, errorMessage: null })}
                    bodyContent={errorMessage} />}
                {map && <SearchBox map={map} mapboxgl={mapboxgl} />}
                <div className='map-container' ref={el => (mapContainer.current = el)} />
            </div>
            {showWelcomeHelp && <Welcome showWelcomeHelp={showWelcomeHelp}
                setShowWelcomeHelp={setShowWelcomeHelp} />}
            <Container>
                <Button icon="fa fa-question-circle"
                    className="help-button"
                    rotate={true}
                    onClick={() => setShowWelcomeHelp(true)}
                />
            </Container>
        </div>
    );
}
export default TruckMonitor;