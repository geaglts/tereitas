import React, { useContext, useState, useRef, useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';
import { MdUpdate } from 'react-icons/md';
import 'styles/Task.scss';

import capitalize from 'utils/capitalize';

import FormError from 'components/FormError';
import Modal from 'components/Modal';

import AppContext from 'contexts/AppContext';

import useError from 'hooks/useError';
import validate from 'utils/validate';
import { createTaskSchema } from 'schemas/task.schema';

const Task = ({ id: taskId, task, completed, inProgress, boardId }) => {
    const { changeTaskStatus, removeTask, state, changeTaskProgress, updateTask } = useContext(AppContext);
    const [confirmRemoveTask, setConfirmRemoveTask] = useState(false);
    const [taskValue, setTaskValue] = useState(task);
    const [update, setUpdate] = useState(false);
    const { error, newError } = useError();

    const statusClass = completed ? ' completed' : ' waiting';
    const inProgressClass = inProgress ? ' inProgress' : '';

    const themeClass = state.darkTheme ? ' Dark' : '';

    const handleConfirmRemoveTask = () => {
        setConfirmRemoveTask(!confirmRemoveTask);
    };

    const handleUpdateTask = () => {
        setUpdate(!update);
    };

    const handleCompleteTask = () => {
        changeTaskStatus({ taskId, boardId });
    };

    const handleInProgressTask = () => {
        changeTaskProgress({ taskId, boardId });
    };

    const handleRemoveTask = () => {
        removeTask({ taskId, boardId });
    };

    const onChangeTaskValue = (event) => {
        setTaskValue(event.target.value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const validatedData = await validate({ schema: createTaskSchema, data: { task: taskValue } });
        if (validatedData.approved) {
            updateTask({ taskId, boardId, task: taskValue });
            handleUpdateTask();
        } else {
            newError(validatedData.message);
        }
    };

    return (
        <>
            <div className={`Task${themeClass}`}>
                {update ? (
                    <>
                        <form onSubmit={onSubmit} className="UpdateTaskForm">
                            {error.status && <FormError error={error.message} />}
                            <input
                                className="UpdateTaskForm__input"
                                type="text"
                                name="task"
                                placeholder="La tarea ahora es..."
                                value={taskValue}
                                onChange={onChangeTaskValue}
                            />
                            <button className="UpdateTaskForm__button--update" type="submit">
                                Cambiar tarea
                            </button>
                            <button className="UpdateTaskForm__button--cancel" type="button" onClick={handleUpdateTask}>
                                Cancelar
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <button className={`Task__Button--complete${statusClass}`} onClick={handleCompleteTask} />
                        <p
                            className={`Task__Description${statusClass} ${inProgressClass}`}
                            onClick={handleInProgressTask}
                        >
                            {capitalize(task)}
                        </p>
                        <button className="Task__Button--update" onClick={handleUpdateTask}>
                            <MdUpdate />
                        </button>
                        <button className="Task__Button--delete" onClick={handleConfirmRemoveTask}>
                            <BsTrash />
                        </button>
                    </>
                )}
            </div>
            <Modal isActive={confirmRemoveTask} changeStatus={handleConfirmRemoveTask}>
                <div className="Confirm">
                    <BsTrash className="Confirm__Icon" />
                    <p className="Confirm__Label">Esta acción eliminará la nota</p>
                    <button onClick={handleRemoveTask} className="Confirm__Button--confirm">
                        sí, elimínala
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default Task;
