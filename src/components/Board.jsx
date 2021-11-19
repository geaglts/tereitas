import React, { useState, useContext, useRef } from 'react';
import AppContext from 'contexts/AppContext';
import { BsTrash, BsFillPlusCircleFill } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import 'styles/Board.scss';

import Task from 'components/Task';

const Board = ({ id, name = 'name', description = 'description', tasks = [] }) => {
    const form = useRef(null);
    const { removeBoard, addTask, removeTask } = useContext(AppContext);
    const [newTaskForm, setNewTaskForm] = useState(null);

    const handleNewTaskForm = () => {
        setNewTaskForm(!newTaskForm);
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
        }
    };

    return (
        <section className="Board">
            <div className="Board__Header">
                <h2>{name}</h2>
                <p>{description}</p>
                <span onClick={onClickRemoveBoard} className="RemoveBoard__Button">
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
    );
};

export default Board;
