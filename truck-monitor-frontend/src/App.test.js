import React from 'react';
import Store from './Redux/store'
import { Provider } from "react-redux";
import { shallow } from 'enzyme';
import TruckMonitor from './Container/TruckMonitor';

describe('App Component', () => {
    it('Renders App without crashing', () => {
        const wrapper = shallow(
            <Provider store={Store}>
                 <TruckMonitor/>
            </Provider>
        );
        expect(wrapper).not.toBeNull();
    });
})