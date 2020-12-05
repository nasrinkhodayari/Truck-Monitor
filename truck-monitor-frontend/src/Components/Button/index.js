import React from "react";
import "./style.scss";

const AppButton = props => {
    const { handleClick, label } = props;
    return (<button className="app-btn btn btn-default" onClick={handleClick}>{label}</button>);
};
export default AppButton;