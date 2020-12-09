import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { GET_TRUCK } from '../Types/truck-types';

import { getTruckByPlateId } from './truck-actions';

const truck = require("../../Mocks/truck.json");
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Truck actions test', () => {
  let store;
  beforeEach(() => {
    store = mockStore(truck);
  });
  it('getTruckByPlateId test', () => {
    const expectedActions = [{
      type: GET_TRUCK,
      truck
    }]
    store.dispatch(getTruckByPlateId(truck))
    expect(store.getActions()).toEqual(expectedActions)
  });
  
})