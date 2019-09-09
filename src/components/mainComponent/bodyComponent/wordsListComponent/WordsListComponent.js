import React, { Component } from 'react';
import { getWordsList, deleteWord } from "../../../../services/requests";
import WordListRowComponent from './WordListRowComponent';
import SearchComponent from './SearchComponent';

export default class WordsListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { wordList: [], newEng: '', newRus: '', class: 'off' };

        this.onDelete = this.onDelete.bind(this);
        this.onToggleAddForm = this.onToggleAddForm.bind(this);
        this.refresh = this.refresh.bind(this);
    }
    refresh(data) {
        this.setState({ wordList: data });
    }
    onDelete(rowID) {
        console.log('Delete ID = ' + rowID)
        deleteWord(this.props.groupID, rowID, (data) => {
            this.setState({ wordList: data });
        })
    }
    onToggleAddForm() {
        let className = this.state.class === 'off' ? 'on' : 'off';
        this.setState({ class: className });
        // console.log(this.state.class);
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

    addFormRender() {
        return (
            <SearchComponent className={this.state.class} groupID={this.props.groupID} refresh={this.refresh} />
        )
    }

    render() {
        return (
            <div className='wordList'>
                <input type="text" className="flex-block-3 myInput" placeholder="Filter"></input>
                {this.renderContent()}
                <button id="add" onClick={this.onToggleAddForm}>+</button>
                {/* {this.addFormRender()} */}
            </div>
        )
    }
}