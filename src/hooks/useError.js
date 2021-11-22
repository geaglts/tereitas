import { useState } from 'react';

function useError() {
    const [error, setError] = useState({ status: false, message: '' });

    const newError = (error = '') => {
        setError({ status: true, message: error });
        setTimeout(() => {
            setError({ status: false, message: '' });
        }, 3000);
    };

    return { error, newError };
}

export default useError;
