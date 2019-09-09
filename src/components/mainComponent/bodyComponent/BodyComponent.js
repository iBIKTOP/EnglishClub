import React, { Component } from "react";

import { getUser } from "../../../services/requests"
// import GroupsListComponent from "../headerComponent/groupsListComponent/GroupsListComponent";
import HeaderComponent from "../headerComponent/HeaderComponent";
import { getCookie, deleteCookie } from '../../../services/cookie';
import welcom from "../../../img/welcom.jpg";
import '../../../styles/App.css';
import RegistrationComponent from "./registrationComponent/RegistrationComponent";
import LoginComponent from "./loginComponent/LoginComponent";
import Irregular_verbs from "./irregularVerbsPage/Irregular_verbs";
import WordsListComponent from "./wordsListComponent/WordsListComponent";

export default class BodyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { toggle: true, groupID: '' };

        this.toggleChange = this.toggleChange.bind(this);
    }
    toggleChange(toggle, groupID, groupName) {
        this.setState({ toggle: toggle, groupID: groupID, groupName: groupName });
    }
    renderContent() {
        return (
            // this.state.toggle == true ? <Irregular_verbs userID={this.props.userID} /> : <WordsListComponent wordsList={this.props.wordsList} wordsListName={this.props.wordsListName} />
            <WordsListComponent wordsList={this.props.wordsList} />
        )
    }
    render() {
        if (this.props.wordsListName != '') {
            return (
                <div>
                    <div className="container">
                        <h1>{this.props.wordsListName}</h1>
                        {this.renderContent()}
                    </div>
                </div>
            );
        } else {
            return (
                <p>Странно, нет имени группы?</p>
            )
        }
    }
}