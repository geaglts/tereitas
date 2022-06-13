import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import '@styles/FormError.scss';

const FormError = ({ error = '' }) => {
    return (
        <div className="FormError__Container">
            <BiErrorCircle className="FormError__Icon" /> <span className="FormError__Error">{error}</span>
        </div>
    );
};

export default FormError;
