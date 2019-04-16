import React from 'react';
import validate from "../services/validate";
import { getLogin, addUser } from "../services/requests"
import Message from './Message';
import Nav from "./Nav";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = { login: '', pass1: '', pass2: '', user: '', message: '' }

        this.onSubmit = this.onSubmit.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPass1Change = this.onPass1Change.bind(this);
        this.onPass2Change = this.onPass2Change.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.login.length > 0 && this.state.pass1.length > 0 && this.state.pass2.length > 0 && this.state.pass1 == this.state.pass2) {
            getLogin(this.state.login, (user) => {
                if (user) {
                    this.setState({ message: '(Ошибка: login занят)' });
                } else {
                    addUser(this.state.login, this.state.pass1, (({ user }) => {
                        this.setState({ user });
                    }));
                    this.setState({ message: '(Регистрация успешна)' });
                }
            });

        } else {
            this.setState({ message: '(Ошибка: Данные введены некоректно)' });
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
    onPass2Change(e) {
        let pass2 = e.target.value;
        this.setState({ pass2: validate(pass2) });
        this.setState({ message: '' });
    }
    render() {
        return (
            <div>
                <Nav />
                <div className="container">
                    <div className="card w-50 mx-auto mt-3 border-dark">
                        <div className="card-header bg-dark text-white">Регистрация <Message message={this.state.message} /></div>
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
                                <div className="form-group">
                                    <label>Пароль, еще раз:</label>
                                    <input type="password" className="form-control" value={this.state.pass2 || ''} onChange={this.onPass2Change}></input>
                                </div>
                                <button type="submit" className="btn btn-outline-dark">Зарегестрироваться</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}