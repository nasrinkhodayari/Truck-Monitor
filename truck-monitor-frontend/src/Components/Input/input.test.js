import React from "react";
import { render, shallow } from "enzyme";
import AppInputField from "./index";

describe("App TextInput component", () => {
  const maxLength = 6,
    value = 'AALL44',
    type = 'text',
    placeholder = 'license plate',
    changeHandler = jest.fn();
  let InputFieldComponent;
  beforeEach(() => {
    InputFieldComponent = (
      <AppInputField
        value={value}
        maxLength={maxLength}
        type={type}
        placeholder={placeholder}
        changeHandler={changeHandler}
      />);
  });
  it("TextInput render correctly (Match Snapshot)", () => {
    const wrapper = render(InputFieldComponent);
    expect(wrapper).toMatchSnapshot();
  });

  it("TextInput OnChange calles correctly", () => {
    const wrapper = shallow(InputFieldComponent);
    wrapper.simulate('change', { target: { value } });
    expect(changeHandler).toBeCalledWith({ target: { value } });
  });

});