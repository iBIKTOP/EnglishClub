import React, { Component } from "react";
import SearchRowComponent from './SearchRowComponent'
import { getAllWords, addNewWord, addWordToGroup, getTranslateWooodHunter } from "../../../../services/requests";
import Message from '../../../public/Message';

export default function SearchComponent({ group, onUserPlacePageChange }) {
    const [allWords, setAllWords] = React.useState(null);
    const [temp, setTemp] = React.useState([]);
    const [newEng, setNewEng] = React.useState('');
    const [newRus, setNewRus] = React.useState('');
    const [translate, setTranslate] = React.useState('');
    const [message, setMessage] = React.useState('');

    React.useEffect(() => {
        if (allWords == null) {
            (async () => {
                let data = await getAllWords();
                setAllWords(data);
                setTemp(data);
            })();
        }
    });
    let onGetTranslateWooodHunter = async () => {
        let data = await getTranslateWooodHunter(newEng);
        if(data == '') {
            setMessage("Фраза не найдена");
            let msg = document.getElementById('msg');
            msg.style.cssText = "left: calc(50% - 130px); opacity: 1;";
            setTimeout(() => {
                msg.style.opacity = 0;
            }, 1500);
            setTimeout(() => {
                msg.style.left = '-10000000px';
            }, 2000);
        }
        else setTranslate(data);
    }
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
                    <div>
                        <div className="flex-container">
                            <div className='flex-block-1'></div>
                            <div className='flex-block-9'>
                                <input className='myInput' placeholder='Введите перевод...' onChange={changeRus} value={newRus}></input>
                            </div>
                            <div className='flex-block-1' style={{ textAlign: 'center' }}>
                                <button className='mybutton' type='submit' onClick={onSubmit}>Save</button>
                            </div>
                        </div>
                        <br />
                        <div className="flex-container">
                            <div className='flex-block-9' style={{ textAlign: 'center' }}>
                                <button className='mybutton' onClick={onGetTranslateWooodHunter}>Translate by WooordHunt</button>
                                
                            </div>
                        </div>
                        <br />
                        <div className="flex-container">
                            <div className='flex-block-9' style={{ textAlign: 'center' }}>
                                <p>{translate}</p>
                            </div>
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
            <Message message={message} />
            <div className="header">
                <div className="container">
                    <div className="flex-container">
                        <div className="flex-block-1" style={{ textAlign: 'left' }}>
                            <button className='mybutton' onClick={() => onUserPlacePageChange('wordsList')}>
                                <i className="material-icons">arrow_back</i>
                            </button>
                        </div>
                        <div className="flex-block-9" style={{ textAlign: 'right' }}>
                            <input type="text" autoFocus className="myInput" placeholder="Search" value={newEng} onChange={searchWords} style={{ color: 'white' }}></input>
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

