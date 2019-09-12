import React, { Component } from "react";

import '../../../styles/App.css';
import WordsListComponent from "./wordsListComponent/WordsListComponent";

export default class BodyComponent extends Component {
    constructor(props) {
        super(props);
    }
    renderContent() {
        return (
            <WordsListComponent groupID={this.props.group.id} wordsList={this.props.wordsList} updateWordsList={this.props.updateWordsList} />
        )
    }
    render() {
        if (this.props.group.group_name != '') {
            return (
                <div>
                    <div className='mycard-header'>{this.props.group.group_name}</div>
                    {this.renderContent()}
                </div>
            );
        } else {
            return (
                <p>Странно, нет имени группы?</p>
            )
        }
    }
}