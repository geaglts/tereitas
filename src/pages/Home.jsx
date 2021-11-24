import React, { useContext, useState } from 'react';
import { MdOutlinePostAdd } from 'react-icons/md';
import 'styles/Home.scss';

import Layout from 'containers/Layout';
import NewBoardForm from 'containers/NewBoardForm';

import Modal from 'components/Modal';
import Board from 'components/Board';
import SearchForm from 'components/SearchForm';

import AppContext from 'contexts/AppContext';

const filterBoardsByName = (searchedValue) => (boards) => {
    const nameIncludeSearchedValue = boards.name.toLowerCase().includes(searchedValue.toLowerCase());
    return nameIncludeSearchedValue;
};

const Home = () => {
    const { state } = useContext(AppContext);
    const [searchedValue, setSearchedValue] = useState('');
    const [addBoardFormStatus, setAddFormStatus] = useState(false);

    const handleAddBoardForm = () => {
        setAddFormStatus(!addBoardFormStatus);
    };

    const onChangeSearchedValue = (event) => {
        setSearchedValue(event.target.value);
    };

    const resetSearchedValue = () => {
        setSearchedValue('');
    };

    return (
        <>
            <Layout>
                <header className="Header">
                    <h1>Tareitas</h1>
                    <p>Administra tus tareitas pendientes</p>
                </header>
                <div className="Actions">
                    <SearchForm onChange={onChangeSearchedValue} value={searchedValue} reset={resetSearchedValue} />
                    <button className="Actions__NewBoard" onClick={handleAddBoardForm}>
                        <MdOutlinePostAdd /> Nueva tablita
                    </button>
                </div>
                <div className="BoardContainer">
                    {state.boards.filter(filterBoardsByName(searchedValue)).map((board) => (
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
