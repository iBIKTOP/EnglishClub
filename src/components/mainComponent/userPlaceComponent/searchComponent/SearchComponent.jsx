import React from "react";
import SearchRowComponent from './SearchRowComponent';
import TranslateComponent from './TranslateComponent';
import { getAllWords, addNewWord, addWordToGroup, getTranslateWooodHunter } from "../../../../services/requests";
import newMessage from "../../../../services/newMessage";
import search from "../../../../img/search.jpg";

export default function SearchComponent({ group, onUserPlacePageChange }) {
    const [allWords, setAllWords] = React.useState(null);
    const [temp, setTemp] = React.useState(null);
    const [newEng, setNewEng] = React.useState('');
    const [newRus, setNewRus] = React.useState('');
    const [answer, setAnswer] = React.useState({ phrase: '', transcription: '', translate: '' });

    React.useEffect(() => {
        if (allWords == null) {
            (async () => {
                let data = await getAllWords();
                setAllWords(data);
            })();
        }
    });
    let onSetNewRus = (str) => setNewRus(str);
    let renderTranslate = () => {
        if (answer.translate != '') {
            return (
                <div className="container">
                    <TranslateComponent data={answer} newRus={newRus} onSetNewRus={onSetNewRus} />
                </div>
            )
        }
    }

    let onGetTranslateWooodHunter = async () => {
        setTemp([]);
        let data = await getTranslateWooodHunter(newEng.toLowerCase());
        if (data == '') {
            newMessage("Фраза не найдена");
        }
        else {
            setAnswer(JSON.parse(data));
        }
    }
    let searchPhrase = (e) => {
        changeEng(e);
        if (e.target.value.length > 2) {
            let newList = allWords.filter((row) => {
                return row.eng.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
            });
            setTemp(newList)
        }
        if (e.target.value.length < 3) {
            setTemp(null);
        }
    }
    let renderContent = () => {
        if (allWords != null) {
            if (temp == null) {
                return (
                    <img src={search} className='searchImg'></img>
                )
            }
            else if (temp != null && temp.length > 0) {
                return (
                    temp.map(function (row, i) {
                        return (
                            <div className="container">
                                <SearchRowComponent key={i} row={row} onSave={onSave}></SearchRowComponent>
                            </div>
                        )
                    })
                )
            }
            else if (temp != null && temp.length == 0) {
                return (
                    <div>
                        <div className="header" style={{ marginTop: '5px' }}>
                            <div className="container">
                                <div className="flex-container">
                                    <div className='flex-block-1'>
                                        <button className='mybutton' onClick={() => { setNewEng(''); setNewRus(''); setAnswer({ phrase: '', transcription: '', translate: '' }); }}>
                                            <span className="material-icons">backspace</span>
                                        </button>
                                    </div>
                                    <div className='flex-block-8'>
                                        <input className='myInput' placeholder='Введите перевод...' onChange={changeRus} value={newRus} style={{ color: 'white' }}></input>
                                    </div>
                                    <div className='flex-block-1' style={{ textAlign: 'right' }}>
                                        <button className='mybutton' type='submit' onClick={addNewPhraseToGroup}><span className="material-icons">save</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {renderTranslate()}
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

    //функция добавления обсалютно нового слова в группу
    let addNewPhraseToGroup = async (e) => {
        e.preventDefault();
        if (newEng != '' && newRus != '') {
            await addNewWord(group.id, newEng.toLowerCase(), newRus.toLowerCase(), answer.transcription);//   <------   нужно добавить транскрипцию
            setTemp([]);
            setNewEng('');
            setNewRus('');
            onUserPlacePageChange('wordsList');
        } else {
            alert('поля пустые');
        }
    }
    //функция добавления нового слова в группу из списка БД
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
                        <div className="flex-block-8" style={{ textAlign: 'right' }}>
                            <input type="text" autoFocus className="myInput" placeholder="Search" value={newEng} onChange={searchPhrase} style={{ color: 'white' }}></input>
                        </div>
                        <div className="flex-block-1" style={{ textAlign: 'right' }}>
                            <button className='mybutton' onClick={onGetTranslateWooodHunter}><span className="material-icons">translate</span></button>
                        </div>
                    </div>
                </div>
            </div>
            {renderContent()}
        </div>
    );
}
