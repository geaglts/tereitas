import * as yup from 'yup';

export const createBoardSchema = yup.object().shape({
    name: yup.string().required('El nombre es requerido.').min(3, 'El nombre debe tener al menos 3 caracteres.'),
    description: yup.string(),
});
