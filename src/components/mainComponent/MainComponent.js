import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { getUser } from "../../services/requests"
import GroupsListComponent from "../groupsListComponent/GroupsListComponent";
import HeaderComponent from "../headerComponent/HeaderComponent";
import { getCookie, deleteCookie } from '../../services/cookie';
import welcom from "../../img/welcom.jpg";
import '../../styles/App.css';
import RegistrationComponent from "../registrationComponent/RegistrationComponent";
import LoginComponent from "../loginComponent/LoginComponent";

export default class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { id: '', userName: '' };

        this.onLogOut = this.onLogOut.bind(this);
        this.onUserNameChange = this.onUserNameChange.bind(this);
    }
    componentDidMount() {
        getCookie('ID',
            (id) => {
                this.setState({ id: id });
                getUser(id, (login) => {
                    this.setState({ userName: login });
                });
            });
    }
    onLogOut() {
        deleteCookie();
        this.setState({ id: '', userName: '' });
    }
    onUserNameChange(user) {
        this.setState({ id: user.id, userName: user.login });
    }
    renderDictionaryCatalog() {
        if (this.state.id != '') {
            return this.state.id != '' ? <GroupsListComponent userID={this.state.id} /> : <p>К сожалению сервер не доступен.</p>;
        } else {
            return (
                <div>
                    <div className="text-center"><img src={welcom}></img></div>
                    <LoginComponent onUserNameChange={this.onUserNameChange} />
                    <RegistrationComponent onUserNameChange={this.onUserNameChange} />
                </div>
            )
        }
    }
    render() {
        return (
            <div>
                <HeaderComponent user={this.state.userName} onLogOut={this.onLogOut} />
                <div className="container">
                    {this.renderDictionaryCatalog()}
                </div>
            </div>
        );
    }
}