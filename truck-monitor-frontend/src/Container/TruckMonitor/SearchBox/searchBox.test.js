import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from "react-redux";

import { render, shallow } from 'enzyme';
import SearchBox from './index';
import AppInputField from '../../../Components/Input';

import axios from 'axios';

jest.mock('axios');

const mockStore = configureMockStore([thunk]);
const storeStateMock = {
    MainReducer: { loading: true, errorMessage: 'something happen' }
};

describe('App SearchBox component', () => {
    const minProps = {
        map: '',
        mapboxgl: '',
    };
    let wrapper, store;
    store = mockStore(storeStateMock);
    beforeEach(() => {
        wrapper = shallow(
            <Provider store={store}>
                <SearchBox {...minProps} />
            </Provider>
        );
    });
    it('App searchbox renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    const maxLength = 6,
        value = 'FN67KP',
        type = 'text',
        placeholder = 'license plate',
        changeHandler = jest.fn();
    let InputFieldComponent;
    InputFieldComponent = (
        <AppInputField
            value={value}
            maxLength={maxLength}
            type={type}
            placeholder={placeholder}
            changeHandler={changeHandler}
        />);
    it('there is AppInputField', () => {
        expect(wrapper.find(InputFieldComponent))
    });

   
});