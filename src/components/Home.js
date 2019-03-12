import React, { Component } from "react";
import { getUserGroups, getUsers } from "../services/requests"
import DictionaryCatalog from "./DictionaryCatalog";
import Nav from "./Nav";
import { getCookie, deleteCookie } from '../services/cookie';
import welcom from "../img/welcom.jpg";
import '../styles/App.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { userGroups: null, users: null, id: '' };

        this.onLogOut = this.onLogOut.bind(this);
    }
    //перед стартом страницы проверяем Cookie
    componentDidMount() {
        getCookie('ID',
            //если Cookie хранит ID пользователя то сохраняем его в state,
            //если Cookie не сущестует, то устанавливаем пустое значение
            (id) => {
                this.setState({ id: id });
            },
            //если Cookie хранит ID пользователя то запускаем функцию получения групп пользователя
            (id) => {
                getUserGroups(id, ({ userGroups }) => {
                    this.setState({ userGroups });
                });
            });
    }

    onLogOut() {
        deleteCookie();
        this.setState({ id: '' });
    }

    renderDictionaryCatalog() {
        if (this.state.id != '') {
            return this.state.userGroups !== null ? <DictionaryCatalog catalog={this.state.userGroups} /> : <p>К сожалению сервер не доступен.</p>;
        } else {
            return <div className="text-center"><img src={welcom}></img></div>
        }
    }

    render() {
        return (
            <div>
                <Nav user={this.state.id} onLogOut={this.onLogOut} />
                <div className="container">
                    {this.renderDictionaryCatalog()}
                </div>
            </div>
        );
    }
}