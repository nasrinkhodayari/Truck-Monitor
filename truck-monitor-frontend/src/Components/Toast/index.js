import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import './style.scss';

const AppToast = props => {
    const { bodyContent, onClose, delay } = props;
    return (
        <Toast className="toast-place"
            delay={delay}
            onClose={onClose} >
            <ToastHeader>
                <span>{bodyContent}</span>
            </ToastHeader>
        </Toast>
    )
};
export default AppToast;