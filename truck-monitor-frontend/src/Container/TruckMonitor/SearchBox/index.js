import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AppInputField from "../../../Components/Input";
import "./style.scss";
import truckService from "../Services/truck-service";
import poiService from "../Services/poi-service";
import { useTranslation } from 'react-i18next';
import { flyMapCenter, markerIconDetector, removeMarker, errorHandler, addMarker } from "../../../Utils/util";
import { icn_current_location, icn_path, icn_first_location } from "../../../Constance/map-icons";
import { GET_TRUCK } from '../../../Redux/Types/truck-types';

const SearchBox = props => {
    const { map, mapboxgl } = props;
    const { t, Trans } = useTranslation();
    const dispatch = useDispatch();
    const storeData = useSelector(state => state);
    const { TruckReducer: { truck } } = storeData;
    const [selectedPOI, setSelectedPOI] = useState('');
    const [selectedPOIRadius, setSelectedPOIRadius] = useState('');
    const [searchBoxClass, setSearchBoxClass] = useState('show-search-box-row');
    const defaultSearchBoxClass = 'search-box-row';
    const [showSearchBox, setShowSearchBox] = useState(true);
    const [poiLabelList] = useState(poiService.getpoiLabelList());
    const [allPoiOption] = useState({
        label: t('View all'),
        value: poiLabelList.map(item => item.value)
    });
    const [poiByRadiusLabelList] = useState(poiService.getpoiByRadiusLabelList());
    const [disabledSearchPOI, setDisabledSearchPOI] = useState(true);
    const { REACT_APP_LICENSE_PLATE_LENGTH,
        REACT_APP_MAPBOX_ZOOM
    } = process.env;
    const licensePlateLen = parseInt(REACT_APP_LICENSE_PLATE_LENGTH);

    const searchTruck = evt => {

        if (evt.target.value.length < licensePlateLen) {
            removeMarker('truck');
            removeMarker('path');
            removeMarker('poi');
            removeMarker('poiRadius');
            setDisabledSearchPOI(true);
        }

        if (evt.target.value.length === licensePlateLen) {
            const licensePlate = evt.target.value;
            truckService.getTruckByLicensePlate({
                licensePlate: licensePlate,
                dispatch: dispatch
            }).then(resultData => {
                setDisabledSearchPOI(false);
                const truckData = resultData.data;
                const { current_lng, current_lat, source_lng, source_lat, truckRoute } = truckData;
                dispatch({ type: GET_TRUCK, truck: truckData });

                flyMapCenter({
                    map: map,
                    center: [current_lng, current_lat],
                    zoom: REACT_APP_MAPBOX_ZOOM
                });

                addMarker({
                    mapboxgl: mapboxgl,
                    map: map,
                    center: [source_lng, source_lat],
                    icon: icn_first_location,
                    markerType: 'path',
                    title: t('Truck first location')
                });

                addMarker({
                    mapboxgl: mapboxgl,
                    map: map,
                    center: [current_lng, current_lat],
                    icon: icn_current_location,
                    markerType: 'truck',
                    title: `${t('Truck License Plate')} : ${licensePlate.toUpperCase()}`
                });

                truckRoute.map(routeItem => {
                    return addMarker({
                        mapboxgl: mapboxgl,
                        map: map,
                        center: routeItem,
                        icon: icn_path,
                        markerType: 'path',
                        title: routeItem
                    });
                });
            })
                .catch(error => {
                    errorHandler({
                        errorData: error,
                        dispatch: dispatch,
                        translator: t
                    });
                });
        }
    };
    const findPOI = poi => {
        setSelectedPOI(poi);
        setSelectedPOIRadius('');
        removeMarker('poi');
        removeMarker('poiRadius');
        poiService.getNearestPois({
            poiTypes: poi,
            truck: truck,
            dispatch: dispatch
        }).then(poisList => {
            const { data, features } = poisList;
            let poiDataList = data.features || features;
            poiDataList.map(poiVal => {
                const { properties: { address, category }, center } = poiVal;
                let markerIcon = markerIconDetector(category.split(', '));

                return addMarker({
                    mapboxgl: mapboxgl,
                    map: map,
                    center: center,
                    icon: markerIcon,
                    markerType: 'poi',
                    title: `${t('Address')}: ${address || category}`
                })
            });
        })
            .catch(error => {
                errorHandler({
                    errorData: error,
                    dispatch: dispatch,
                    translator: t
                });
            });
    };
    const findPOIByRadius = radius => {
        setSelectedPOIRadius(radius);
        removeMarker('poiRadius');
        removeMarker('poi');
        poiService.getNearestPoisByRadius({
            dispatch: dispatch,
            radius: radius,
            truck: truck
        }).then(poisByRadiusList => {
            const { data, features } = poisByRadiusList;
            let poiDataList = data.features || features;

            poiDataList.map(poiRadiusVal => {
                const { properties: { name, type, tilequery: { distance }, category_en },
                    geometry: { coordinates }
                } = poiRadiusVal;

                let markerIcon = [];
                markerIcon.push(type.toLocaleLowerCase());
                return addMarker({
                    mapboxgl: mapboxgl,
                    map: map,
                    center: coordinates,
                    icon: markerIconDetector(markerIcon),
                    markerType: 'poiRadius',
                    title: `${t('Name')}: ${name || category_en} -
                    ${t('Distance')}:${parseInt(distance)} M`
                })
            });
        })
            .catch(error => {
                errorHandler({
                    errorData: error,
                    dispatch: dispatch,
                    translator: t
                });
            });
    };
    return (
        <div className={`${defaultSearchBoxClass} ${searchBoxClass}`}>
            <Row id="main">
                <Col lg={4} xs={12}><AppInputField type="text"
                    maxLength={6}
                    placeholder={t('Search by license plate')}
                    changeHandler={searchTruck} /></Col>
                <Col lg={4} xs={12}>
                    <Select isDisabled={disabledSearchPOI} placeholder={t('Select POI type')}
                        value={selectedPOI} onChange={findPOI} options={[allPoiOption, ...poiLabelList]} />
                </Col>
                <Col lg={4} xs={12}>
                    <Select isDisabled={disabledSearchPOI} placeholder={t('Select radius')}
                        value={selectedPOIRadius} onChange={findPOIByRadius} options={poiByRadiusLabelList} />


                </Col>
            </Row>
            <div className="arrow-icon" onClick={() => {
                setShowSearchBox(!showSearchBox);
                setSearchBoxClass(searchBoxClass === 'hide-search-box-row' ? 'show-search-box-row' : 'hide-search-box-row');
            }}>
                {showSearchBox
                    ? <i className="fa fa-chevron-left" aria-hidden="true"></i>
                    : <i className="fa fa-chevron-right" aria-hidden="true"></i>
                }
            </div>
        </div>
    );
}
export default SearchBox;