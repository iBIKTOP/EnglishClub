import React, { Component } from "react";

import HeaderComponent from "./headerComponent/HeaderComponent";
import { getCookie, deleteCookie } from '../../services/cookie';
import welcom from "../../img/welcom.jpg";
import '../../styles/App.css';
import RegistrationComponent from "./bodyComponent/registrationComponent/RegistrationComponent";
import LoginComponent from "./bodyComponent/loginComponent/LoginComponent";
import BodyComponent from "./bodyComponent/BodyComponent";
import { getUser, getUserGroups, getWordsList, getIrregularVerbs } from "../../services/requests"
import Irregular_verbs from "./bodyComponent/irregularVerbsPage/Irregular_verbs";


export default class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { user: '', userGroups: '', wordsList: '', wordsListName: '', iv: '', page: 1 };

        this.onLogOut = this.onLogOut.bind(this);
        this.onUserChange = this.onUserChange.bind(this);
        this.setWordsList = this.setWordsList.bind(this);
        this.setIV = this.setIV.bind(this);
    }
    componentDidMount() { //нужно добавить проверку на вымышленного пользователя.
        getCookie('ID', (id) => {
            getUser(id, (user) => {
                getUserGroups(user.id, ({ userGroups }) => {
                    getIrregularVerbs(user.id, (iv) => {
                        this.setState({ user: user, userGroups: userGroups, iv: iv });
                    });

                });
            });
        });

    }
    onLogOut() {
        deleteCookie();
        this.setState({ user: '' });
    }
    onUserChange(user) {
        this.setState({ user: user });
    }
    setWordsList(group) {
        getWordsList(group.id, (data) => {
            this.setState({ wordsList: data, wordsListName: group.group_name, page: 2 });
        });
    }
    setIV() {
        this.setState({ page: 1 });
    }
    renderBody() {
        if (this.state.user == '') {
            return (
                <div>
                    {/* <div className="text-center"><img src={welcom}></img></div> */}
                    <LoginComponent onUserChange={this.onUserChange} />
                    {/* <RegistrationComponent onUserIDChange={this.onUserIDChange} /> */}
                </div>
            )
        } else {
            switch (this.state.page) {
                case 1:
                    return (
                        <Irregular_verbs irregular_verbs={this.state.iv} />
                    )
                    break;
                case 2:
                    if (this.state.wordsListName != '') {
                        return (
                            <div>
                                <BodyComponent wordsList={this.state.wordsList} wordsListName={this.state.wordsListName} />
                            </div>
                        );
                    } else {
                        return (
                            <div>Статистика</div>
                        )
                    }
                    break;
            }




        }

    }
    render() {
        return (
            <div>
                <HeaderComponent user={this.state.user} userGroups={this.state.userGroups} onLogOut={this.onLogOut} setWordsList={this.setWordsList} setIV={this.setIV} />
                {this.renderBody()}
            </div>
        )
    }
}