import React, { Component } from 'react';
import { getWordsList, deleteWord } from "../../../../services/requests";
import WordListRowComponent from './WordListRowComponent';
import SearchComponent from './SearchComponent';

export default class WordsListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { wordList: [], newEng: '', newRus: '' };

        this.onDelete = this.onDelete.bind(this);
    }
    onDelete(rowID) {
        deleteWord(this.props.groupID, rowID, (data) => {
            this.props.updateWordsList(data);
        })
    }

    renderContent() {
        if (this.props.wordsList.length == 0) {
            return (
                <h3>Ваш список еще пустой!</h3>
            )
        }
        else if (this.props.wordsList.length > 0) {
            return (
                <div>
                    {
                        this.props.wordsList.map(function (row, i) {
                            return (
                                <WordListRowComponent key={i} row={row} onDel={this.onDelete}></WordListRowComponent>
                            )
                        }.bind(this))
                    }
                </div>
            )
        }
    }
    render() {
        return (
            <div className='mycard-body'>
                <input type="text" className="myInput" placeholder="Filter"></input>
                {this.renderContent()}
            </div>
        )
    }
}