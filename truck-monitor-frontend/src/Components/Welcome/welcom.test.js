import React from 'react';
import { shallow } from 'enzyme';
import Welcome from './index';

describe('App Welcome component', () => {
    it('Welcome component renders correctlly', () => {
        const wrapper = shallow(<Welcome />);
        expect(wrapper).toMatchSnapshot();
    });
});