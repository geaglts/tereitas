import React from 'react';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';
import 'styles/Modal.scss';

const Modal = ({ children, isActive, changeStatus }) => {
    if (isActive) {
        return createPortal(
            <div className="Modal">
                <div className="Modal__Content">
                    <MdClose className="Modal__Content--Close" onClick={changeStatus} />
                    {children}
                </div>
            </div>,
            document.getElementById('modal')
        );
    }
    return null;
};

export default Modal;
