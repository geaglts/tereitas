import React, { useRef, useContext } from 'react';
import 'styles/NewBoardForm.scss';

import AppContext from 'contexts/AppContext';

const NewBoardForm = () => {
    const { addBoard } = useContext(AppContext);
    const form = useRef(null);

    const onSubmitForm = (event) => {
        event.preventDefault();
        const formData = new FormData(form.current);
        const data = { name: formData.get('name'), description: formData.get('description') };
        addBoard(data);
    };

    return (
        <form className="NewBoardForm" ref={form} onSubmit={onSubmitForm}>
            <input name="name" type="text" placeholder="Nombre de la tablita" />
            <input name="description" type="text" placeholder="Descripcion de la tablita" />
            <input type="submit" value="Crear tablita" />
        </form>
    );
};

export default NewBoardForm;
