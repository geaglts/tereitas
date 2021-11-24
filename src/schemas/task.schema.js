import * as yup from 'yup';

export const createTaskSchema = yup.object().shape({
    task: yup.string().required('Debes escribir alguna tarea.').min(3, 'La tarea debe tener al menos 3 caracteres.'),
});
