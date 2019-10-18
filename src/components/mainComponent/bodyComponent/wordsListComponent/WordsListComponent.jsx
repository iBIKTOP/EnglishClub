import React from 'react';
import { getWordsList, deleteWord } from "../../../../services/requests";
import WordListRowComponent from './WordListRowComponent';
// import SearchComponent from '.';

export default function WordsListComponent({groupWords, onLogOut}){
    
    const[wordsList, setWordsList] = React.useState(null);
    React.useEffect(() => {
        console.log("ooo");
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
    let renderContent = () => {
        if (wordsList && wordsList.length == 0) {
            return (
                <h3>Ваш список еще пустой!</h3>
            )
        }
        else if (wordsList && wordsList.length > 0) {
            return (
                <div>
                    <div className="header">
                        <div className="container">
                            <div className="flex-container">
                                <div className="flex-block-3" style={{ textAlign: 'left' }}>
                                    <button className='mybutton'>Назад</button>
                                </div>
                                <div className="flex-block-3" style={{ textAlign: 'right' }}>
                                    <button className='mybutton' onClick={onClickOnLogOut}>Exit</button>
                                </div>
                            </div>
                        </div>
                    </div>
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
                {/* <input type="text" className="myInput" placeholder="Filter"></input> */}
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