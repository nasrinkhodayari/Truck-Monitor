import React from 'react';
import { render } from 'enzyme';
import AppLoading from './index';

describe("App Loading component", () => {
    it('Loading render correctly', () => {
        const wrapper = render(<AppLoading />);
        expect(wrapper).toMatchSnapshot();
    });
});