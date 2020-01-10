import React from 'react';
import { getWordsList, deleteWord, addNewGroup, updateGroupName } from "../../../../services/requests";
import WordListRowComponent from './WordListRowComponent';

export default function WordsListComponent({ userID, group, onUserPlacePageChange, groupWordsChange }) {
    const [wordsList, setWordsList] = React.useState(null);
    const [groupName, setGroupName] = React.useState('');
    const [editGroupName, setEditGroupName] = React.useState(false);
    React.useEffect(() => {
        if (wordsList == null) {
            (async () => {
                setWordsList(await getWordsList(group.id));
            })();
            setGroupName(group.group_name);
        }
    });
    let wordsCount = () => {
        if(wordsList == null) return '0';
        if(wordsList != null) return wordsList.length;
    }
    let onDelete = async (rowID) => {
        //function removes necessary word and sends answer with new word's list
        let newWordsList = await deleteWord(group.id, rowID);
        setWordsList(newWordsList);
    }
    let editGroupTitleToggle = () => {
        console.log(editGroupName);
        editGroupName == false ? setEditGroupName(true) : setEditGroupName(false);
    }
    let saveGroupName = () => {
        updateGroupName(group.id, userID, groupName);
        editGroupTitleToggle();
    }
    let changeGroupTitle = (e) => setGroupName(e.target.value);
    let renderGroupTitle = () => {
        if (editGroupName) {
            return (
                <div className="flex-container">
                    <div className='flex-block-9'>
                        <input className='myInput' placeholder='Укажите название группы...' onChange={changeGroupTitle} value={groupName}></input>
                    </div>
                    <div className='flex-block-1' style={{ textAlign: 'center' }}>
                        <button className='mybutton' type='submit' onClick={saveGroupName}>Save</button>
                    </div>
                </div>
            )
        }
        else 
            return (
                <div className='logo' onClick={editGroupTitleToggle}>{groupName} (Слов: {wordsCount()})</div>
            )
    }

    let renderContent = () => {
        if (wordsList && wordsList.length == 0) {
            return (
                <div className="container">
                    <h3>Ваш список пуст!</h3>
                </div>
            )
        }
        else if (wordsList && wordsList.length > 0) {
            return (
                <div className="container">
                    {
                        wordsList.map(function (row, i) {
                            return (
                                <WordListRowComponent key={i} row={row} onDel={onDelete}></WordListRowComponent>
                            )
                        })
                    }
                </div>
            )
        } else {
            <p>Что-то пошло не так :((</p>
        }
    }
    return (
        <div>
            <div className="header">
                <div className="container">
                    <div className="flex-container">
                        <div className="flex-block-1" style={{ textAlign: 'left' }}>
                            <button className='mybutton' onClick={() => onUserPlacePageChange('userGroups')}>
                                <i className="material-icons">arrow_back</i>
                            </button>
                        </div>
                        <div className="flex-block-9" style={{ textAlign: 'center' }}>
                            {renderGroupTitle()}
                        </div>
                        <div className="flex-block-1" style={{ textAlign: 'right' }}>
                            <button className='mybutton' onClick={() => onUserPlacePageChange('search')}>
                                <i className="material-icons">add_circle</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {renderContent()}
            <div style={{ textAlign: 'center' }}><small>Для удаления группы, необходимо чтобы она была пустая.</small></div>
        </div>
    )
}