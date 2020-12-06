import React, { useState } from "react";
import Select from 'react-select';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AppInputField from "../../../Components/Input";
import "./style.scss";
import truckService from "../Services/truck-service";
import poiService from "../Services/poi-service";
import { flyMapCenter, markerIconDetector, removeMarker } from "../../../Utils/util";

const SearchBox = props => {
    const { storeData, dispatch, t, addMarker, map } = props;
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
    const { REACT_APP_LICENSE_PLATE_LENGTH, REACT_APP_MAPBOX_ZOOM } = process.env;


    const searchTruck = (evt) => {

        let licensePlateLen = parseInt(REACT_APP_LICENSE_PLATE_LENGTH);

        if (evt.target.value.length < licensePlateLen) {
            removeMarker('truck');
            removeMarker('poi');
            removeMarker('poiRadius');
            setDisabledSearchPOI(true);
        }

        if (evt.target.value.length === licensePlateLen) {

            truckService.getTruckByID({
                dispatch: dispatch,
                licensePlate: evt.target.value,
                addMarker: addMarker,
                map: map,
                markerType: 'truck'
            });
            setDisabledSearchPOI(false);
        }
    };
    const findPOI = (poi) => {
        removeMarker('poi');
        removeMarker('poiRadius');
        poiService.getNearestPois({
            dispatch: dispatch,
            poiTypes: poi,
            truck: storeData.truckReducer.truck
        }).then((poisList) => {
            const { data, features } = poisList;
            let poiDataList = data.features || features;

            if (poiDataList.length) {
                const { center } = poiDataList[0];
                flyMapCenter({
                    map: map,
                    center: center,
                    zoom: REACT_APP_MAPBOX_ZOOM - 1
                });
            }
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
    const findPOIByRadius = (radius) => {
        removeMarker('poiRadius');
        removeMarker('poi');
        poiService.getNearestPoisByRadius({
            dispatch: dispatch,
            radius: radius,
            truck: storeData.truckReducer.truck
        }).then((poisByRadiusList) => {
            const { data, features } = poisByRadiusList;
            let poiDataList = data.features || features;
            if (poiDataList.length) {
                const { geometry } = poiDataList[0];
                flyMapCenter({
                    map: map,
                    center: geometry.coordinates,
                    zoom: REACT_APP_MAPBOX_ZOOM 
                });
            }
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
                        placeholder={t('Select POI type')} value={storeData.selectedPOI} onChange={findPOI} options={[allPoiOption, ...poiLabelList]} />
                </Col>
                <Col lg={4} xs={12}>
                    <Select
                        isDisabled={disabledSearchPOI}
                        placeholder={t('Select radius')} value={storeData.selectedPOIRadius} onChange={findPOIByRadius} options={poiByRadiusLabelList} />
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