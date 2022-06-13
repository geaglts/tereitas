import React, { useRef, useContext } from 'react';
import '@styles/NewBoardForm.scss';

import validate from '@utils/validate';
import { createBoardSchema } from '@schemas/board.schema';

import AppContext from '@contexts/AppContext';

import FormError from '@components/FormError';

import useError from '@hooks/useError';

const NewBoardForm = () => {
    const form = useRef(null);
    const { addBoard } = useContext(AppContext);
    const { error, newError } = useError();

    const onSubmitForm = async (event) => {
        event.preventDefault();
        const formData = new FormData(form.current);
        const data = { name: formData.get('name'), description: formData.get('description') };
        const validatedData = await validate({ data, schema: createBoardSchema });
        if (validatedData.approved) {
            addBoard(validatedData.data);
            form.current.reset();
        } else {
            newError(validatedData.message);
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
