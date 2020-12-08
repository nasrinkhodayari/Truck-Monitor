import React from 'react';
import { render } from 'enzyme';
import AppToast from './index';

describe('App Toast component', () => {
    it('App Toast renders correctlly', () => {
        const onClose = jest.fn(),
            delay = 4000,
            bodyContent = 'some thing happen';

        const wrapper = render(<AppToast
            delay={delay}
            onClose={onClose}
            bodyContent={bodyContent} />);
        expect(wrapper).toMatchSnapshot();
    });
});
