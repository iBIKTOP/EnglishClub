import React from 'react';
import validate from "../../../../services/validate";
import { getLogin, addUser, addUserIrregularVerbs } from "../../../../services/requests"
import Message from '../../../public/Message';

export default class RegistrationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { login: '', pass1: '', pass2: '', message: '' }

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
                    addUser(this.state.login, this.state.pass1, (user) => {
                        addUserIrregularVerbs(user[0].id);
                        this.props.onUserIDChange(user[0].id);
                    });
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
            <div className='logInLogUpPlace'>
                <div className="mycard">
                    <div className="mycard-header">Регистрация <Message message={this.state.message} /></div>

                    <form onSubmit={this.onSubmit}>
                        <div className="mycard-body">
                            <label>Логин:</label>
                            <input type="text" className="myInput" value={this.state.login || ''} onChange={this.onLoginChange}></input>
                            <label>Пароль:</label>
                            <input type="password" className="myInput" value={this.state.pass1 || ''} onChange={this.onPass1Change}></input>
                            <label>Пароль, еще раз:</label>
                            <input type="password" className="myInput" value={this.state.pass2 || ''} onChange={this.onPass2Change}></input>
                            <div style={{ textAlign: 'right' }}><button type="submit" className="mybutton" style={{ marginTop: '5px' }}>Зарегестрироваться</button></div>

                        </div>
                    </form>

                </div>
            </div>
        )
    }
}