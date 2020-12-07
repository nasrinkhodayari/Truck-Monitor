import React from "react";
import "./style.scss";

const AppInputField = props => {
    const { placeholder, type, changeHandler, value, maxLength } = props;
    return (<input className="app-input"
        onChange={changeHandler}
        value={value}
        maxLength={maxLength}
        type={type}
        placeholder={placeholder} />);
}

export default AppInputField;