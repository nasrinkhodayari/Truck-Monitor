import React from 'react';
import { shallow } from 'enzyme';
import SearchBox from './index';

describe('App SearchBox component', () => {
    it('App searchbox renders correctly', () => {
        const wrapper = shallow(<SearchBox />);
        expect(wrapper).toMatchSnapshot();
        });
});