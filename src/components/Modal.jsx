import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';
import AppContext from '@contexts/AppContext';
import '@styles/Modal.scss';

const Modal = ({ children, isActive, changeStatus }) => {
    const { state } = useContext(AppContext);

    const themeClass = state.darkTheme ? ' Dark' : '';

    const closeModalWithBackground = (event) => {
        const currentClass = event.target.classList.value;
        if (currentClass === 'Modal Dark') {
            changeStatus();
        }
    };

    if (isActive) {
        return createPortal(
            <div className={`Modal${themeClass}`} onMouseDown={closeModalWithBackground}>
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
