import React, { useState, useContext, useRef } from 'react';
import AppContext from 'contexts/AppContext';
import { BsTrash, BsFillPlusCircleFill } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import 'styles/Board.scss';

import Task from 'components/Task';
import Modal from 'components/Modal';

const Board = ({ id, name = 'name', description = 'description', tasks = [] }) => {
    const form = useRef(null);
    const { removeBoard, addTask, state } = useContext(AppContext);
    const [newTaskForm, setNewTaskForm] = useState(null);
    const [confirmRemoveBoard, setConfirmRemoveBoard] = useState(false);

    const themeClass = state.darkTheme ? ' dark' : '';

    const handleNewTaskForm = () => {
        setNewTaskForm(!newTaskForm);
    };

    const handleConfirmRemoveBoard = () => {
        setConfirmRemoveBoard(!confirmRemoveBoard);
    };

    const onClickRemoveBoard = () => {
        removeBoard({ id });
    };

    const onClickAddTask = (event) => {
        event.preventDefault();
        const formData = new FormData(form.current);
        const data = { task: formData.get('task') };
        if (data.task.length > 0) {
            addTask(id, data);
            form.current.reset();
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
