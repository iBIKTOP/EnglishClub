import React from 'react';
import { getWordsList, deleteWord } from "../../../../services/requests";
import WordListRowComponent from './WordListRowComponent';

export default function WordsListComponent({ group, onUserPlacePageChange }) {
    const [wordsList, setWordsList] = React.useState(null);
    React.useEffect(() => {
        if (wordsList == null) {
            (async () => {
                setWordsList(await getWordsList(group.id));
            })();
        }
    });
    let onDelete = async (rowID) => {
        //function removes necessary word and sends answer with new word's list
        let newWordsList = await deleteWord(group.id, rowID);
        setWordsList(newWordsList);
    }
    let onClickOnLogOut = () => {
        // onLogOut();
        setWordsList([]);
    }
    // let onClickBack = () => clickBack('userGroups');

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
                        <div className="flex-block-9" style={{ textAlign: 'right' }}>
                            <div className='logo'>{group.group_name}</div>
                        </div>
                        <div className="flex-block-1" style={{ textAlign: 'right' }}>
                            {/* <button className='mybutton' onClick={onClickOnLogOut}>
                                <i className="material-icons">exit_to_app</i>
                            </button> */}
                            <button className='mybutton' onClick={() => onUserPlacePageChange('search')}>
                                <i className="material-icons">add_circle</i>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            {renderContent()}
        </div>
    )
}