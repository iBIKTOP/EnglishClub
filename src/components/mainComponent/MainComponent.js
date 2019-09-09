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
        this.state = { user: '', userGroups: '', wordsList: '', wordsListName: '', toggle: false };

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
    setWordsList(group) {
        getWordsList(group.id, (data) => {
            this.setState({ wordsList: data, wordsListName: group.name });
        });
    }
    renderBody(){
        if (this.state.user != '' && this.state.userGroups != '') {
            return (
                <div>
                    <BodyComponent wordsList={this.state.wordsList} wordsListName={this.state.wordsListName} />
                </div>
            );
        } else {
            return (
                <div>
                    {/* <div className="text-center"><img src={welcom}></img></div> */}
                    <LoginComponent onUserIDChange={this.onUserIDChange} />
                    {/* <RegistrationComponent onUserIDChange={this.onUserIDChange} /> */}
                </div>
            )
        }
    }
    render() {
        return (
            <div>
                <HeaderComponent user={this.state.user} userGroups={this.state.userGroups} onLogOut={this.onLogOut} setWordsList={this.setWordsList}/>
                {this.renderBody()}
            </div>
            ) 
    }
}