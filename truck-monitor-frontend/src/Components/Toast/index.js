import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';

import './style.scss';

const AppToast = props => {
    const { bodyContent, onClose } = props;
    return (
        <Toast className="toast-place"
            onClose={onClose} delay={5000} autohide>
            <ToastHeader>
                <span>{bodyContent}</span>
            </ToastHeader>
        </Toast>
    )
};
export default AppToast;