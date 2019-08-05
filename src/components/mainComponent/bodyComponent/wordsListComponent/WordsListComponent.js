import React, { Component } from 'react';
import { getWordsList, addNewWord } from "../../../../services/requests"

export default class WordsListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { wordList: '', newEng: '', newRus: '' };
        this.changeEng = this.changeEng.bind(this);
        this.changeRus = this.changeRus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        getWordsList(this.props.groupID, (wordList) => {
            this.setState({ wordList: wordList });
        });
    }
    changeEng(e){
        let newEng = e.target.value;
        this.setState({newEng: newEng});
    }
    changeRus(e){
        let newRus = e.target.value;
        this.setState({newRus: newRus});
    }
    onSubmit(e){
        e.preventDefault();
        if (this.state.newEng != '' && this.state.newRus != '') {
            addNewWord(this.props.groupID, this.state.newEng, this.state.newRus, (data) => {
            this.setState({wordList: data, newEng: '', newRus: ''});
            });
        } else {
            alert('поля пустые');
        }
    }
    render() {
        if (this.state.wordList != '') {
            return (
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div className="flex-container">
                            <div className="flex-block" style={{flexGrow: '3'}}>
                                <span>Eng:</span><input type="text" className="" value={this.state.newEng || ''} onChange={this.changeEng}></input>
                            </div>
                            <div className="flex-block" style={{flexGrow: '3'}}>
                                <span>Rus:</span><input type="text" className="" value={this.state.newRus || ''} onChange={this.changeRus}></input>
                            </div>
                            <div className="flex-block" style={{flexGrow: '1'}}><button type="submit" className="btn btn-outline-dark">Добавить</button></div>
                        </div>
                    </form>
                    {
                        this.state.wordList.map(function (row, i) {
                            return (
                                <p key={i}>{row.eng} - {row.rus}</p>
                            )
                        })
                    }
                </div>
            )
        } else {
            return (
                <p>Weit</p>
            )
        }
    }
}