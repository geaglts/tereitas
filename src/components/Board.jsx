import React, { useState, useContext, useRef, useEffect } from 'react';
import AppContext from 'contexts/AppContext';
import { BsTrash, BsFillPlusCircleFill } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import 'styles/Board.scss';

import validate from 'utils/validate';
import { createTaskSchema } from 'schemas/task.schema.js';
import useError from 'hooks/useError';
import FormError from 'components/FormError';

import Task from 'components/Task';
import Modal from 'components/Modal';

const Board = ({ id, name = 'name', description = 'description', tasks = [] }) => {
    const form = useRef(null);
    const { removeBoard, addTask, state } = useContext(AppContext);
    const [newTaskForm, setNewTaskForm] = useState(false);
    const [confirmRemoveBoard, setConfirmRemoveBoard] = useState(false);
    const { error, newError } = useError();

    const themeClass = state.darkTheme ? ' dark' : '';

    useEffect(() => {
        const onEscPress = (event) => {
            if (event.code === 'Escape' && newTaskForm) {
                setNewTaskForm(false);
            }
        };
        window.addEventListener('keyup', onEscPress);
        return () => {
            window.removeEventListener('keyup', onEscPress);
        };
    }, [newTaskForm]);

    const handleNewTaskForm = () => {
        setNewTaskForm(!newTaskForm);
    };

    const handleConfirmRemoveBoard = () => {
        setConfirmRemoveBoard(!confirmRemoveBoard);
    };

    const onClickRemoveBoard = () => {
        removeBoard({ id });
    };

    const onClickAddTask = async (event) => {
        event.preventDefault();
        const formData = new FormData(form.current);
        const data = { task: formData.get('task') };
        const validatedData = await validate({ schema: createTaskSchema, data });
        if (validatedData.approved) {
            addTask(id, data);
            form.current.reset();
        } else {
            newError(validatedData.message);
        }
    };

    return (
        <>
            <section className={`Board${themeClass}`}>
                <div className="Board__Header">
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <span onClick={handleConfirmRemoveBoard} className="RemoveBoard__Button">
                        <BsTrash />
                    </span>
                    <button onClick={handleNewTaskForm} className="AddTask__Button">
                        <BsFillPlusCircleFill />
                        <span className="RemoveBoard__Button--Title">Nueva tarea</span>
                    </button>
                </div>
                {newTaskForm && (
                    <div className="NewTask">
                        <button className="NewTask__Button" onClick={handleNewTaskForm}>
                            <MdClose />
                        </button>
                        {error.status && <FormError error={error.message} />}
                        <form onSubmit={onClickAddTask} className="NewTask__Form" ref={form}>
                            <input type="text" name="task" placeholder="Los que necesito hacer es..." />
                            <input type="submit" value="Agregar a la lista" />
                        </form>
                    </div>
                )}
                <div className="Board__Task">
                    {tasks.map((task) => (
                        <Task key={task.id} {...task} boardId={id} />
                    ))}
                </div>
            </section>
            <Modal isActive={confirmRemoveBoard} changeStatus={handleConfirmRemoveBoard}>
                <div className="Board__Confirm--Remove">
                    <BsTrash className="Icon" />
                    <p className="Label">Esta acción eliminará la tabla completa con todas sus tareas</p>
                    <button className="Button" onClick={onClickRemoveBoard}>
                        Entiendo, elimínala
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default Board;
