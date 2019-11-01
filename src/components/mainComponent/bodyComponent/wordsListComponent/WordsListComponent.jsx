import React from 'react';
import { getWordsList, deleteWord } from "../../../../services/requests";
import WordListRowComponent from './WordListRowComponent';
// import SearchComponent from '.';

export default function WordsListComponent({groupWords, onLogOut, clickBack}){
    
    const[wordsList, setWordsList] = React.useState(null);
    React.useEffect(() => {
        if(wordsList == null){
            getWordsList(groupWords.id)
            .then((data) => {
                setWordsList(data);
            })
        }
    });
    let onDelete = (rowID) => {
        deleteWord(groupWords.id, rowID)
            .then((data) => setWordsList(data))
    }
    let onClickOnLogOut = () => {
        onLogOut();
        setWordsList([]);
    }
    let onClickBack = () => clickBack('userGgroups');
        
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
        }else{
            <p>Что-то пошло не так :((</p>
        }
    }
    return (
            <div>
                <div className="header">
                    <div className="container">
                        <div className="flex-container">
                            <div className="flex-block-1" style={{ textAlign: 'left' }}>
                                <button className='mybutton' onClick={onClickBack}>
                                    <i className="material-icons">arrow_back</i>
                                </button>
                            </div>
                            <div className="flex-block-9" style={{ textAlign: 'right' }}>
                                <input type="text" className="myInput" placeholder="Filter"></input>
                            </div>
                            <div className="flex-block-1" style={{ textAlign: 'right' }}>
                                <button className='mybutton' onClick={onClickOnLogOut}>
                                    <i className="material-icons">exit_to_app</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {renderContent()}
            </div>
    )
}

// export default class WordsListComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { wordList: [], newEng: '', newRus: '' };

//         this.onDelete = this.onDelete.bind(this);
//     }
//     onDelete(rowID) {
//         deleteWord(this.props.groupID, rowID, (data) => {
//             this.props.updateWordsList(data);
//         })
//     }

//     renderContent() {
//         if (this.props.wordsList.length == 0) {
//             return (
//                 <h3>Ваш список еще пустой!</h3>
//             )
//         }
//         else if (this.props.wordsList.length > 0) {
//             return (
//                 <div>
//                     {
//                         this.props.wordsList.map(function (row, i) {
//                             return (
//                                 <WordListRowComponent key={i} row={row} onDel={this.onDelete}></WordListRowComponent>
//                             )
//                         }.bind(this))
//                     }
//                 </div>
//             )
//         }
//     }
//     render() {
//         return (
//             <div className='mycard-body'>
//                 <input type="text" className="myInput" placeholder="Filter"></input>
//                 {this.renderContent()}
//             </div>
//         )
//     }
// }