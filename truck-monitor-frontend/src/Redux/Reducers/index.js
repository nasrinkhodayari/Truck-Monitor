import { combineReducers } from 'redux';
import MainReducer from './main-reducers';
import TruckReducer from './truck-reducer';
export default combineReducers({
    TruckReducer, MainReducer
});