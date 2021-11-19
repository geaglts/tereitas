import React, { useContext, useState } from 'react';
import { MdOutlinePostAdd } from 'react-icons/md';
import 'styles/Home.scss';

import Layout from 'containers/Layout';
import NewBoardForm from 'containers/NewBoardForm';

import Modal from 'components/Modal';
import Board from 'components/Board';
import SearchForm from 'components/SearchForm';

import AppContext from 'contexts/AppContext';

const Home = () => {
    const [addBoardFormStatus, setAddFormStatus] = useState(false);
    const { state } = useContext(AppContext);

    const handleAddBoardForm = () => {
        setAddFormStatus(!addBoardFormStatus);
    };

    const onSearch = (data) => {
        console.log(data);
    };

    return (
        <>
            <Layout>
                <header className="Header">
                    <h1>Tareitas</h1>
                    <p>Administra tus tareitas pendientes</p>
                </header>
                <div className="Actions">
                    <SearchForm onSearch={onSearch} />
                    <button className="Actions__NewBoard" onClick={handleAddBoardForm}>
                        <MdOutlinePostAdd /> Nueva tablita
                    </button>
                </div>
                <div className="BoardContainer">
                    {state.boards.map((board) => (
                        <Board key={board.id} {...board} />
                    ))}
                </div>
            </Layout>
            <Modal isActive={addBoardFormStatus} changeStatus={handleAddBoardForm}>
                <NewBoardForm />
            </Modal>
        </>
    );
};

export default Home;
