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
        this.state = { toggle: false };

        this.toggleChange = this.toggleChange.bind(this);
    }
    componentDidMount() {
        console.log(this.props.userID);
    }
    toggleChange(data) {
        this.setState({ toggle: data });
    }
    renderGroupsList() {
        return (
            <GroupsListComponent userID={this.props.userID} onToggleChange={this.toggleChange} />
        )
    }
    renderContent() {
        return (
            this.state.toggle == true ? <Irregular_verbs userID={this.props.userID} /> : <WordsListComponent />
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