import React, { useRef, useContext, useState } from 'react';
import 'styles/NewBoardForm.scss';
import validate from 'utils/validate';
import NewBoardFormSchema from 'validations/newBoardForm.validation';
import useError from 'hooks/useError';

import FormError from 'components/FormError';

import AppContext from 'contexts/AppContext';

const NewBoardForm = () => {
    const form = useRef(null);
    const { addBoard } = useContext(AppContext);
    const { error, newError } = useError();

    const onSubmitForm = (event) => {
        event.preventDefault();
        const formData = new FormData(form.current);
        const data = { name: formData.get('name'), description: formData.get('description') };
        const validData = validate({ data, schema: NewBoardFormSchema });
        if (validData.approved) {
            addBoard(data);
            form.current.reset();
        } else {
            newError(validData.message);
        }
    };

    return (
        <form className="NewBoardForm" ref={form} onSubmit={onSubmitForm}>
            {error.status && <FormError error={error.message} />}
            <input name="name" type="text" placeholder="Nombre de la tablita" />
            <input name="description" type="text" placeholder="Descripcion de la tablita" />
            <input type="submit" value="Crear tablita" />
        </form>
    );
};

export default NewBoardForm;
