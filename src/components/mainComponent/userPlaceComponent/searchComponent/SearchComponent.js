import React, { Component } from "react";
import SearchRowComponent from './SearchRowComponent'
import { getAllWords, addNewWord, addWordToGroup } from "../../../../services/requests";


export default function SearchComponent({ group, onUserPlacePageChange }) {
    const [allWords, setAllWords] = React.useState(null);
    const [temp, setTemp] = React.useState([]);
    const [newEng, setNewEng] = React.useState('');
    const [newRus, setNewRus] = React.useState('');

    React.useEffect(() => {
        if (allWords == null) {
            (async () => {
                let data = await getAllWords();
                setAllWords(data);
                setTemp(data);
            })();
        }
    });
    let searchWords = (e) => {
        changeEng(e);
        if (e.target.value) {
            let newList = allWords.filter((row) => {
                return row.eng.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
            });
            setTemp(newList)
        }
        else {
            setTemp(allWords);
        }
    }
    let renderContent = () => {
        if (allWords != null) {
            if (temp.length > 0) {
                return (
                    temp.map(function (row, i) {
                        return (
                            <SearchRowComponent key={i} row={row} onSave={onSave}></SearchRowComponent>
                        )
                    })
                )
            }
            else if (temp.length == 0) {
                return (
                    <div className="flex-container">
                        <div className='flex-block-1'></div>
                        <div className='flex-block-9'>
                            <input className='myInput' placeholder='Введите перевод...' onChange={changeRus} value={newRus}></input>
                        </div>
                        <div className='flex-block-1' style={{ textAlign: 'center' }}>
                            <button className='mybutton' type='submit' onClick={onSubmit}>Save</button>
                        </div>
                    </div>
                )
            }
        }
        else {
            return (
                <div className="spinner"></div>
            )
        }
    }
    let changeEng = (e) => setNewEng(e.target.value);
    let changeRus = (e) => setNewRus(e.target.value);
    let onSubmit = async (e) => {
        e.preventDefault();
        if (newEng != '' && newRus != '') {
            await addNewWord(group.id, newEng, newRus);
            setTemp([]);
            setNewEng('');
            setNewRus('');
            onUserPlacePageChange('wordsList');
        } else {
            alert('поля пустые');
        }
    }
    let onSave = async (row) => {
        await addWordToGroup(group.id, row.id);
        setTemp([]);
        setNewEng('');
        setNewRus('');
        onUserPlacePageChange('wordsList');
    }
    return (
        <div>
            <div className="header">
                <div className="container">
                    <div className="flex-container">
                        <div className="flex-block-1" style={{ textAlign: 'left' }}>
                            <button className='mybutton' onClick={() => onUserPlacePageChange('wordsList')}>
                                <i className="material-icons">arrow_back</i>
                            </button>
                        </div>
                        <div className="flex-block-9" style={{ textAlign: 'right' }}>
                            <input type="text" autoFocus className="myInput" placeholder="Search" value={newEng} onChange={searchWords} ></input>
                        </div>
                        {/* <div className="flex-block-1" style={{ textAlign: 'right' }}>
                            <button className='mybutton' onClick={onLogOut}>
                                <i className="material-icons">exit_to_app</i>
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="container">
                {renderContent()}
            </div>
        </div>
    );
}

