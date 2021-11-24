import React, { useContext, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import 'styles/Task.scss';

import capitalize from 'utils/capitalize';

import AppContext from 'contexts/AppContext';

import Modal from 'components/Modal';

const Task = ({ id: taskId, task, completed, boardId }) => {
    const { changeTaskStatus, removeTask, state } = useContext(AppContext);
    const [confirmRemoveTask, setConfirmRemoveTask] = useState(false);
    const statusClass = completed ? ' completed' : ' waiting';

    const themeClass = state.darkTheme ? ' Dark' : '';

    const handleConfirmRemoveTask = () => {
        setConfirmRemoveTask(!confirmRemoveTask);
    };

    const handleCompleteTask = () => {
        changeTaskStatus({ taskId, boardId });
    };

    const handleRemoveTask = () => {
        removeTask({ taskId, boardId });
    };

    return (
        <>
            <div className={`Task${themeClass}`}>
                <button className={`Task__Button--complete${statusClass}`} onClick={handleCompleteTask}></button>
                <p className={`Task__Description${statusClass}`}>{capitalize(task)}</p>
                <button className="Task__Button--delete" onClick={handleConfirmRemoveTask}>
                    <BsTrash />
                </button>
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
