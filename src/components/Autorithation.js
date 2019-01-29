import React from 'react';
import md5 from "md5";
import { Switch, Redirect } from "react-router-dom"

import validate from "../services/validate";
import Message from './Message';
import { getUser } from "../services/requests"
import { setCookie } from '../services/cookie';
import Nav from "./Nav";


export default class Autorithation extends React.Component {
    constructor(props) {
        super(props);
        this.state = { login: '', pass1: '', user: '', message: '' }

        this.onSubmit = this.onSubmit.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPass1Change = this.onPass1Change.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.login.length > 0 && this.state.pass1.length > 0) {
            getUser(this.state.login, (user) => {
                if (user) {
                    if (md5(this.state.pass1) == user.pass) {
                        console.log('стадия запуска асинхронной функции');
                        try {
                            setCookie(user.login);
                            console.log(document.cookie || "cookie clear");
                            this.setState({ user: user.login });
                            this.renderRedirect();
                        } catch (error) {
                            console.log(error);
                        }
                    } else {
                        this.setState({ message: '(Pass не верный)' });
                    }
                } else {
                    this.setState({ message: '(Login не существует)' });
                }
            });
        } else {
            this.setState({ message: '(Ошибка: Данные введены некоректно)' });
        }
    }

    renderRedirect() {
        if (this.state.user != '') {
            return <Redirect to='/' />
        }
    }

    onLoginChange(e) {
        let login = e.target.value;
        this.setState({ login: validate(login) });
        this.setState({ message: '' });
    }
    onPass1Change(e) {
        let pass1 = e.target.value;
        this.setState({ pass1: validate(pass1) });
        this.setState({ message: '' });
    }

    render() {
        return (
            <div>
                <Nav />
                <div className="container">
                    <div className="card w-50 mx-auto mt-3 border-dark">
                        <div className="card-header bg-dark text-white">Авторизация <Message message={this.state.message} /></div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>Логин:</label>
                                    <input type="text" className="form-control" value={this.state.login || ''} onChange={this.onLoginChange}></input>
                                </div>
                                <div className="form-group">
                                    <label>Пароль:</label>
                                    <input type="password" className="form-control" value={this.state.pass1 || ''} onChange={this.onPass1Change}></input>
                                </div>
                                <button type="submit" className="btn btn-outline-dark">Вход</button>
                            </form>
                            {this.renderRedirect()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}