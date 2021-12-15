import React, { useState, useContext, useRef, useEffect } from 'react';
import AppContext from 'contexts/AppContext';
import Editor from '@monaco-editor/react';
import { BsTrash, BsFillPlusCircleFill } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { BiBrushAlt } from 'react-icons/bi';
import 'styles/Board.scss';

import capitalize from 'utils/capitalize';
import validate from 'utils/validate';
import { createTaskSchema } from 'schemas/task.schema.js';

import useError from 'hooks/useError';

import FormError from 'components/FormError';
import Task from 'components/Task';
import Modal from 'components/Modal';

const Board = ({ id, name = 'name', description = 'description', tasks = [] }) => {
    const { removeBoard, addTask, state, clearAllTasks } = useContext(AppContext);
    const [newTaskForm, setNewTaskForm] = useState(false);
    const [newTaskText, setnewTaskText] = useState('# Nueva tarea');
    const [confirmRemoveBoard, setConfirmRemoveBoard] = useState(false);
    const [confirmCleanTasks, setConfirmCleanTasks] = useState(false);
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

    const handleConfirmCleanTasks = () => {
        setConfirmCleanTasks(!confirmCleanTasks);
    };

    const onClickRemoveBoard = () => {
        removeBoard({ id });
    };

    const onClickAddTask = async (event) => {
        event.preventDefault();
        const data = { task: newTaskText };
        const validatedData = await validate({ schema: createTaskSchema, data });
        if (validatedData.approved) {
            addTask(id, data);
            setnewTaskText('# Nueva tarea');
        } else {
            newError(validatedData.message);
        }
    };

    const onClickCleanTask = (boardId) => () => {
        clearAllTasks({ boardId });
        handleConfirmCleanTasks();
    };

    return (
        <>
            <section className={`Board${themeClass}`}>
                <div className="Board__Header">
                    <h2>{name}</h2>
                    <div className="description">
                        <p>{capitalize(description)}</p>
                        <button className="ClearAll" onClick={handleConfirmCleanTasks}>
                            <div className="ClearAll__background"></div>
                            <div className="ClearAll__content">
                                <BiBrushAlt />
                                <p className="ClearAll__label">Borrar todo</p>
                            </div>
                        </button>
                    </div>
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
                        <div className="NewTask__Header">
                            <div>{error.status && <FormError error={error.message} />}</div>
                            <button className="NewTask__Button" onClick={handleNewTaskForm}>
                                <MdClose />
                            </button>
                        </div>
                        <form onSubmit={onClickAddTask} className="NewTask__Form">
                            <Editor
                                height="350px"
                                theme="vs-dark"
                                defaultLanguage="markdown"
                                value={newTaskText}
                                onChange={(e) => setnewTaskText(e)}
                            />
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
            <Modal isActive={confirmCleanTasks} changeStatus={handleConfirmCleanTasks}>
                <div className="CleanTask__Confirm--Remove">
                    <BsTrash className="Icon" />
                    <p className="Label">Esta acción eliminará todas las tareas de la tablita</p>
                    <button className="Button" onClick={onClickCleanTask(id)}>
                        Entiendo, elimina todo
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default Board;
