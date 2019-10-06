import React from 'react';
import md5 from "md5";

import validate from "../../../../services/validate";
import Message from '../../../public/Message';
import { getLogin } from "../../../../services/requests"
import { setCookie } from '../../../../services/cookie';


export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { login: '', pass1: '', message: '' }

        this.onSubmit = this.onSubmit.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPass1Change = this.onPass1Change.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.login.length > 0 && this.state.pass1.length > 0) {
            getLogin(this.state.login)
                .then(
                    (user) => {
                        if (user) {
                            if (md5(this.state.pass1) == user.pass) {
                                setCookie(user.id); //устанавливаю куки ID
                                // console.log(document.cookie || "cookie is empty");
                                // this.renderRedirect();
                                this.props.onUserChange(user);
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
            <div className='logInLogUpPlace'>
                <div className="mycard">
                    <div className="mycard-header">Авторизация <Message message={this.state.message} /></div>
                    <form onSubmit={this.onSubmit}>
                        <div className='mycard-body'>
                            <label>Логин:</label>
                            <input type="text" className="myInput" value={this.state.login || ''} onChange={this.onLoginChange}></input>
                            <label>Пароль:</label>
                            <input type="password" className="myInput" value={this.state.pass1 || ''} onChange={this.onPass1Change}></input>
                            <div style={{ textAlign: 'right' }}><button type="submit" className="mybutton" style={{ marginTop: '5px' }}>Вход</button></div>

                        </div>
                    </form>
                </div>
            </div>
        )
    }
}