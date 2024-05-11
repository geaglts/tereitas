import React, { useRef, useContext } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

import AppContext from '@contexts/AppContext';
import '@styles/SearchForm.scss';

const SearchForm = ({ onSearch = () => {}, onChange = () => {}, value = '', reset = () => {} }) => {
    const { state } = useContext(AppContext);
    const form = useRef(null);

    const darkThemeClass = state.darkTheme ? ' dark' : ' light';

    const onSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(form.current);
        const data = { searchedValue: formData.get('searchedValue') };
        onSearch(data);
    };

    return (
        <form ref={form} onSubmit={onSubmit} className={`SearchForm${darkThemeClass}`}>
            <input
                type="text"
                name="searchedValue"
                placeholder="Que tablita buscas?"
                onChange={onChange}
                value={value}
            />
            {value.length > 0 && <AiOutlineClose className="ResetSearchedValue" onClick={reset} />}
            <button type="submit">
                <BiSearchAlt /> Buscar
            </button>
        </form>
    );
};

export default SearchForm;
