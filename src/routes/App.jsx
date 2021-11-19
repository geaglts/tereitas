import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from 'pages/Home';

import AppContext from 'contexts/AppContext';
import useInitialState from 'hooks/useInitialState';

const App = () => {
    const initialState = useInitialState();

    return (
        <AppContext.Provider value={initialState}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    );
};

export default App;
