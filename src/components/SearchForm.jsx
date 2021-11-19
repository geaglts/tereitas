import React, { useRef, useContext } from 'react';
import 'styles/SearchForm.scss';
import { BiSearchAlt } from 'react-icons/bi';

import AppContext from 'contexts/AppContext';

const SearchForm = ({ onSearch }) => {
    const { state } = useContext(AppContext);
    const form = useRef(null);

    const darkThemeClass = state.darkTheme ? ' dark' : ' light';

    const onSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(form.current);
        const data = { searchValue: formData.get('searchValue') };
        onSearch(data);
    };

    return (
        <form ref={form} onSubmit={onSubmit} className={`SearchForm${darkThemeClass}`}>
            <input type="text" name="searchValue" placeholder="Que tablita buscas?" />
            <button type="submit">
                <BiSearchAlt />
            </button>
        </form>
    );
};

export default SearchForm;
