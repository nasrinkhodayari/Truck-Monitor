import { combineReducers } from 'redux';
import truckReducer from './truck-reducer';
import poiReducer from './poi-reducer';

export default combineReducers({
    truckReducer, poiReducer
});