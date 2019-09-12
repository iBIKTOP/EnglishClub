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
        this.state = { user: '', group: '', userGroups: '', wordsList: '', wordsListName: '', iv: '', page: 1 };

        this.onLogOut = this.onLogOut.bind(this);
        this.onUserChange = this.onUserChange.bind(this);
        this.setWordsList = this.setWordsList.bind(this);
        this.updateWordsList = this.updateWordsList.bind(this);
        this.setIV = this.setIV.bind(this);
    }
    componentDidMount() { //нужно добавить проверку на вымышленного пользователя.
        getCookie('ID', (id) => {
            this.setUserData(id);
        });
    }
    setUserData(id){
        getUser(id, (user) => {
            getUserGroups(user.id, ({ userGroups }) => {
                getIrregularVerbs(user.id, (iv) => {
                    this.setState({ user: user, userGroups: userGroups, iv: iv });
                });
            });
        });
    }
    onLogOut() {
        deleteCookie();
        this.setState({ user: '' });
    }
    onUserChange(user) {
        this.setUserData(user.id);
    }
    setWordsList(group) {
        getWordsList(group.id, (data) => {
            this.setState({ wordsList: data, group: group, page: 2 });
        });
    }
    updateWordsList(wordsList){
        this.setState({ wordsList: wordsList });
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
                case 2:
                    if (this.state.group.wordsListName != '') {
                        return (
                            <div className='mycard'>
                                <BodyComponent wordsList={this.state.wordsList} group={this.state.group} updateWordsList={this.updateWordsList}/>
                            </div>
                        );
                    } else {
                        return (
                            <div>Статистика</div>
                        )
                    }
            }
        }
    }
    render() {
        return (
            <div>
                <HeaderComponent user={this.state.user} userGroups={this.state.userGroups} onLogOut={this.onLogOut} setWordsList={this.setWordsList} setIV={this.setIV} />
                <div className='container'>
                    {this.renderBody()}
                </div>
                
            </div>
        )
    }
}