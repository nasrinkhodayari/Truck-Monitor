import React, { useState } from "react";
import Select from 'react-select';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AppInputField from "../../../Components/Input";
import "./style.scss";
import truckService from "../Services/truck-service";
import poiService from "../Services/poi-service";
import { flyMapCenter, markerIconDetector, removeMarker } from "../../../Utils/util";
import { icn_current_location, icn_path, icn_first_location } from "../../../Constance/map-icons";
import { GET_TRUCK } from '../../../Redux/Types/truck-types';

const SearchBox = props => {
    const { storeData, dispatch, t, addMarker, map } = props;
    const [selectedPOI, setSelectedPOI] = useState('');
    const [selectedPOIRadius, setSelectedPOIRadius] = useState('');
    const [searchBoxClass, setSearchBoxClass] = useState('show-search-box-row');
    const defaultSearchBoxClass = 'search-box-row';
    const [showSearchBox, setShowSearchBox] = useState(true);
    const [poiLabelList] = useState(poiService.getpoiLabelList(t));
    const [allPoiOption] = useState({
        label: t('View all'),
        value: poiLabelList.map(item => item.value)
    });
    const [poiByRadiusLabelList] = useState(poiService.getpoiByRadiusLabelList(t));
    const [disabledSearchPOI, setDisabledSearchPOI] = useState(true);
    const { REACT_APP_LICENSE_PLATE_LENGTH,
        REACT_APP_MAPBOX_ZOOM
    } = process.env;

    const zoomInAfterSearch = zoomLevel => {
        flyMapCenter({
            map: map,
            center: [
                storeData.TruckReducer.truck.current_lng,
                storeData.TruckReducer.truck.current_lat
            ],
            zoom: REACT_APP_MAPBOX_ZOOM - zoomLevel
        });
    };
    const searchTruck = evt => {

        let licensePlateLen = parseInt(REACT_APP_LICENSE_PLATE_LENGTH);

        if (evt.target.value.length < licensePlateLen) {
            removeMarker('truck');
            removeMarker('poi');
            removeMarker('poiRadius');
            setDisabledSearchPOI(true);
        }

        if (evt.target.value.length === licensePlateLen) {
            let licensePlate = evt.target.value;
            truckService.getTruckByLicensePlate({
                licensePlate: licensePlate,
                dispatch: dispatch
            })
                .then((resultData) => {
                    const truckData = resultData.data;
                    dispatch({ type: GET_TRUCK, truck: truckData });
                    flyMapCenter({
                        map: map,
                        center: [
                            truckData.current_lng,
                            truckData.current_lat
                        ],
                        zoom: REACT_APP_MAPBOX_ZOOM
                    });

                    addMarker({
                        map: map,
                        center: [truckData.source_lng, truckData.source_lat],
                        icon: icn_first_location,
                        markerType: 'path',
                        title: `Truck first location`
                    });

                    addMarker({
                        map: map,
                        center: [truckData.current_lng, truckData.current_lat],
                        icon: icn_current_location,
                        markerType: 'truck',
                        title: `Truck License Plate : ${licensePlate.toUpperCase()}`
                    });

                    truckData.truckRoute.map((routeItem) => {
                        return addMarker({
                            map: map,
                            center: routeItem,
                            icon: icn_path,
                            markerType: 'path',
                            title: routeItem
                        });
                    });
                })
                .catch((exeption) => {
                    console.log(exeption);
                });
            setDisabledSearchPOI(false);
        }
    };
    const findPOI = poi => {
        setSelectedPOI(poi);
        removeMarker('poi');
        removeMarker('poiRadius');
        poiService.getNearestPois({
            poiTypes: poi,
            truck: storeData.TruckReducer.truck,
            dispatch: dispatch
        }).then((poisList) => {
            const { data, features } = poisList;
            let poiDataList = data.features || features;

            zoomInAfterSearch(2);

            poiDataList.map(poiVal => {
                const { properties, center } = poiVal;
                let markerIcon = markerIconDetector(properties.category.split(', '));
                return addMarker({
                    map: map,
                    center: center,
                    icon: markerIcon,
                    markerType: 'poi',
                    title: `Address: ${properties.address}`
                })
            });
        }).catch((exeption) => {
            console.log(exeption);
        });
    };
    const findPOIByRadius = radius => {
        setSelectedPOIRadius(radius);
        removeMarker('poiRadius');
        removeMarker('poi');
        poiService.getNearestPoisByRadius({
            dispatch: dispatch,
            radius: radius,
            truck: storeData.TruckReducer.truck
        }).then((poisByRadiusList) => {
            const { data, features } = poisByRadiusList;
            let poiDataList = data.features || features;
            zoomInAfterSearch(1);
            poiDataList.map(poiRadiusVal => {
                const { properties, geometry } = poiRadiusVal;
                let markerIcon = [];
                markerIcon.push((properties.type).toLocaleLowerCase());
                return addMarker({
                    map: map,
                    center: geometry.coordinates,
                    icon: markerIconDetector(markerIcon),
                    markerType: 'poiRadius',
                    title: `Name: ${properties.name || properties.category_en} -
                    Distance:${parseInt(properties.tilequery.distance)} M`
                })
            });
        }).catch((exeption) => {
            console.log(exeption);
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
                    <Select
                        isDisabled={disabledSearchPOI}
                        placeholder={t('Select POI type')} value={selectedPOI} onChange={findPOI} options={[allPoiOption, ...poiLabelList]} />
                </Col>
                <Col lg={4} xs={12}>
                    <Select
                        isDisabled={disabledSearchPOI}
                        placeholder={t('Select radius')} value={selectedPOIRadius} onChange={findPOIByRadius} options={poiByRadiusLabelList} />
                </Col>
                {/* <Col lg={2} xs={12}><AppButton label={t('Apply')}></AppButton></Col> */}
            </Row>
            <div className="arrow-icon"
                onClick={() => {
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