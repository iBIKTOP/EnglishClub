import React from 'react';
import validate from "../../../services/validate";
import newMessage from "../../../services/newMessage";
import { authentication } from "../../../services/requests"
import { setCookie } from '../../../services/cookie';

export default function LoginComponent({ onUserChange, setWelcomePage }) {
    const [login, setLogin] = React.useState('');
    const [pass1, setPass1] = React.useState('');
    let onLoginChange = (e) => {
        let login = e.target.value;
        setLogin(validate(login));
    }
    let onPass1Change = (e) => {
        let pass1 = e.target.value;
        setPass1(validate(pass1));
    }
    let onSubmit = async (e) => {
        e.preventDefault();
        if (login.length > 0 && pass1.length > 0) {
            let user = await authentication(login, pass1);
            if (user) {
                setCookie(user.id);
                onUserChange(user);
                setWelcomePage('userPlace');
            } else {
                newMessage("Неверный логин или пароль");
            }
        } else {
            newMessage("Данные введены некоректно");
        }
    }
    return (
        <div className='logInLogUpPlace'>
            <div className="mycard">
                <div className="mycard-header">
                    <div className="flex-container">
                        <div className="flex-block-3" style={{ textAlign: 'left' }}>
                            Авторизация
                        </div>
                        <div className="flex-block-3" style={{ textAlign: 'right' }}>
                            <button className="mybutton" onClick={() => setWelcomePage('welcome')} style={{ float: 'right' }}>X</button>
                        </div>
                    </div>
                </div>
                <form onSubmit={onSubmit}>
                    <div className='mycard-body'>
                        <label>Логин:</label>
                        <input type="text" className="myInput" value={login || ''} onChange={onLoginChange}></input>
                        <label>Пароль:</label>
                        <input type="password" className="myInput" value={pass1 || ''} onChange={onPass1Change}></input>
                        <div style={{ textAlign: 'right' }}><button type="submit" className="mybutton" style={{ marginTop: '5px' }}>Вход</button></div>
                    </div>
                </form>
            </div>
        </div>
    )
}