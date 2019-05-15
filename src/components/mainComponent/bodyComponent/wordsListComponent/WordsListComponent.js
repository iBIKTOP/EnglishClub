import React, { Component } from 'react';
import { getWordsList } from "../../../../services/requests"

export default class WordsListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { wordList: '' };
    }
    componentDidMount() {
        getWordsList(this.props.groupID, (wordList) => {
            this.setState({ wordList: wordList });
        });
    }
    render() {
        if (this.state.wordList != '') {
            return (
                <div>
                    {
                        this.state.wordList.map(function (row, i) {
                            return (
                                <p>{row.id}</p>
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