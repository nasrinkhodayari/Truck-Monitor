import React from 'react';
import { shallow } from 'enzyme';
import TruckMonitor from './index';

describe('App TruckMonitor component', () => {
    it('App TruckMonitor renders correctly', () => {
        const wrapper = shallow(<TruckMonitor />);
        expect(wrapper).toMatchSnapshot();
        });
});