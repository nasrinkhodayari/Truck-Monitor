import TruckReducer from "./truck-reducer";
import { GET_TRUCK } from "../Types/truck-types";
const truck = require("../../Mocks/truck.json");

describe('TruckReducer test', () => {

    const initialState = {
        truck: {}
    }
    it('returns the initial state', () => {
        expect(TruckReducer(undefined, {})).toEqual(initialState);
    });
    const getTruckAction = {
        type: GET_TRUCK,
        truck
    }
    it('handles get Truck', () => {
        expect(TruckReducer({}, getTruckAction)).toEqual(
            expect.objectContaining({ truck }));
    });
});

