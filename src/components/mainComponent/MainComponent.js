import React, { Component } from "react";

import HeaderComponent from "./headerComponent/HeaderComponent";
import { getCookie, deleteCookie } from '../../services/cookie';
import welcom from "../../img/welcom.jpg";
import '../../styles/App.css';
import RegistrationComponent from "./bodyComponent/registrationComponent/RegistrationComponent";
import LoginComponent from "./bodyComponent/loginComponent/LoginComponent";
import BodyComponent from "./bodyComponent/BodyComponent";
import { getUser, getUserGroups, getWordsList } from "../../services/requests"


export default class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { user: '', userGroups: '', wordsList: '', toggle: false };

        this.onLogOut = this.onLogOut.bind(this);
        this.onUserIDChange = this.onUserIDChange.bind(this);
        this.setWordsList = this.setWordsList.bind(this);
    }
    componentDidMount() {
        getCookie('ID', (id) => {
            getUser(id, (user) => {
                getUserGroups(user.id, ({ userGroups }) => {
                    this.setState({ user: user, userGroups: userGroups });
                });
            });
        });

    }
    onLogOut() {
        deleteCookie();
        this.setState({ user: '' });
    }
    onUserIDChange(user) {
        this.setState({ user: user });
    }
    setWordsList(groupID) {
        getWordsList(groupID, (data) => {
            this.setState({ wordsList: data });
        });
    }
    render() {
        console.log(this.state.wordList);
        if (this.state.user != '' && this.state.userGroups != '') {
            return (
                <div>
                    <HeaderComponent user={this.state.user} userGroups={this.state.userGroups} onLogOut={this.onLogOut} />
                    <BodyComponent userID={this.state.user.id} />
                </div>
            );
        } else {
            return (
                <div>
                    <HeaderComponent user={this.state.user} userGroups={this.state.userGroups} onLogOut={this.onLogOut} setWordsList={this.setWordsList} />
                    {/* <div className="text-center"><img src={welcom}></img></div> */}
                    <LoginComponent onUserIDChange={this.onUserIDChange} />
                    {/* <RegistrationComponent onUserIDChange={this.onUserIDChange} /> */}
                </div>
            )
        }
    }
}