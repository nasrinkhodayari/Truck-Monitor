import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import { shallow, render } from 'enzyme';
import TruckMonitor from './index';

import AppLoading from "../../Components/Loading";
import AppToast from "../../Components/Toast";
import Welcome from '../../Components/Welcome';
import SearchBox from './SearchBox/index';

const mockStore = configureMockStore([thunk]);
const storeStateMock = {
  MainReducer: { loading: true, errorMessage: 'something happen' }
};

describe('App TruckMonitor component without props', () => {

  let wrapper, store;
  store = mockStore(storeStateMock);
  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <TruckMonitor />
      </Provider>
    );
  });
  it('TruckMonitor renders correctlly (MatchSnapshot)', () => {
    const wrapperMatchSnapshot = render(
      <Provider store={store}>
        <TruckMonitor />
      </Provider>);
    expect(wrapperMatchSnapshot).toMatchSnapshot();
  });

  it('<AppLoading />', () => {
    expect(wrapper.find(<AppLoading />)).not.toBeNull();
  });
  it('<SearchBox />', () => {
    expect(wrapper.find(<SearchBox />)).not.toBeNull();
  });
  it('<Welcome />', () => {
    expect(wrapper.find(<Welcome />)).not.toBeNull();
  });
  it('<AppToast />', () => {
    expect(wrapper.find(<AppToast />)).not.toBeNull();
  });
});

