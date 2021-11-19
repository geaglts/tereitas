import React, { useContext } from 'react';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import 'styles/Layout.scss';
import AppContext from 'contexts/AppContext';

const Layout = ({ children }) => {
    const { state, handleTheme } = useContext(AppContext);
    const darkThemeClass = state.darkTheme ? ' dark' : ' light';
    return (
        <div className={`Layout${darkThemeClass}`}>
            <button className="Layout__ChangeTheme" onClick={handleTheme}>
                {state.darkTheme ? <BsFillMoonFill /> : <BsFillSunFill />}
            </button>
            {children}
        </div>
    );
};

export default Layout;
