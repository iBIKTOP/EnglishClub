import React, { Component } from "react";

import { getUser } from "../../../services/requests"
import GroupsListComponent from "./groupsListComponent/GroupsListComponent";
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
        this.state = { toggle: true, groupID: '', groupName: '' };

        this.toggleChange = this.toggleChange.bind(this);
    }
    toggleChange(toggle, groupID, groupName) {
        this.setState({ toggle: toggle, groupID: groupID, groupName: groupName });
    }
    renderGroupsList() {
        return (
            <GroupsListComponent userID={this.props.userID} onToggleChange={this.toggleChange} />
        )
    }
    renderContent() {
        return (
            this.state.toggle == true ? <Irregular_verbs userID={this.props.userID} /> : <WordsListComponent groupID={this.state.groupID} groupName={this.state.groupName} />
        )
    }
    render() {
        if (this.props.userID != '') {
            return (
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                {this.renderGroupsList()}
                            </div>
                            <div className="col-9">
                                {this.renderContent()}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <p>Error: No userID</p>
            )
        }
    }
}