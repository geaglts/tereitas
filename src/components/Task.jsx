import React, { useContext, useState } from 'react';
import * as clipboard from 'clipboard-polyfill';
import Editor from '@monaco-editor/react';
import { BsTrash } from 'react-icons/bs';
import { MdUpdate, MdTimer, MdTimerOff } from 'react-icons/md';
import '@styles/Task.scss';

import FormError from '@components/FormError';
import Modal from '@components/Modal';

import AppContext from '@contexts/AppContext';

import parseHtml from '@utils/parseHtml';
import validate from '@utils/validate';
import useError from '@hooks/useError';
import { createTaskSchema } from '@schemas/task.schema';

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

    const handleCopyCode = async (e) => {
        if (e.target.classList[0] === 'CopyButton') {
            await clipboard.writeText(e.nativeEvent.path[1].children[1].textContent);
            e.nativeEvent.path[1].children[1].classList.remove('hiden');
            e.nativeEvent.path[1].children[1].classList.add('showed');
            setTimeout(() => {
                e.nativeEvent.path[1].children[1].classList.remove('showed');
                e.nativeEvent.path[1].children[1].classList.add('hiden');
            }, 2000);
        }
    };

    const onChangeTaskValue = (e) => {
        setTaskValue(e);
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
                            <div className="UpdateTaskForm__input">
                                <Editor
                                    style={{ gridColumn: 1 / 3 }}
                                    height="350px"
                                    theme="vs-dark"
                                    defaultLanguage="markdown"
                                    value={taskValue}
                                    onChange={onChangeTaskValue}
                                />
                            </div>
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
                        <div
                            dangerouslySetInnerHTML={{ __html: parseHtml(task) }}
                            className={`Task__Description${statusClass} ${inProgressClass}`}
                            onClick={handleCopyCode}
                        />
                        <button className="Task__Button--update" onClick={handleUpdateTask}>
                            <MdUpdate />
                        </button>
                        <button className="Task__Button--delete" onClick={handleConfirmRemoveTask}>
                            <BsTrash />
                        </button>
                        <button className="Task__Button--start" onClick={handleInProgressTask}>
                            {inProgress ? <MdTimer /> : <MdTimerOff />}
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
