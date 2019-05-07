import React, { Component } from "react";
import { getUser } from "../services/requests"
import DictionaryCatalog from "./DictionaryCatalog";
import Nav from "./Nav";
import { getCookie, deleteCookie } from '../services/cookie';
import welcom from "../img/welcom.jpg";
import '../styles/App.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { id: '', login: '' };

        this.onLogOut = this.onLogOut.bind(this);
    }
    //перед стартом страницы проверяем Cookie
    componentDidMount() {
        getCookie('ID',
            (id) => {
                //если Cookie хранит ID пользователя то сохраняем его в state,
                //если Cookie не сущестует, то устанавливаем пустое значение
                this.setState({ id: id });
                //получаем данные о пользователе
                getUser(id, (login) => {
                    this.setState({ login: login });
                    console.log(this.state.login);
                });
                //если Cookie хранит ID пользователя то запускаем функцию получения групп пользователя
                // getUserGroups(id, ({ userGroups }) => {
                //     this.setState({ userGroups });
                // });
            });
    }

    onLogOut() {
        deleteCookie();
        this.setState({ id: '', login: '' });
    }

    renderDictionaryCatalog() {
        if (this.state.id != '') {
            return this.state.id != '' ? <DictionaryCatalog userID={this.state.id} /> : <p>К сожалению сервер не доступен.</p>;
        } else {
            return <div className="text-center"><img src={welcom}></img></div>
        }
    }

    render() {
        return (
            <div>
                <Nav user={this.state.login} onLogOut={this.onLogOut} />
                <div className="container">
                    {this.renderDictionaryCatalog()}
                </div>
            </div>
        );
    }
}