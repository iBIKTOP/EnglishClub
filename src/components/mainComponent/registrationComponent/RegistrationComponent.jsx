import React from 'react';
import validate from "../../../services/validate";
import { getLogin, addUser, addUserIrregularVerbs } from "../../../services/requests"
import newMessage from "../../../services/newMessage";

export default function RegistrationComponent({ onUserChange, setWelcomePage }) {
    const [login, setLogin] = React.useState('');
    const [pass1, setPass1] = React.useState('');
    const [pass2, setPass2] = React.useState('');

    let onLoginChange = (e) => {
        let login = e.target.value;
        setLogin(validate(login));
    }
    let onPass1Change = (e) => {
        let pass1 = e.target.value;
        setPass1(validate(pass1));
    }
    let onPass2Change = (e) => {
        let pass2 = e.target.value;
        setPass2(validate(pass2));
    }
    let onSubmit = async (e) => {
        e.preventDefault();
        if (login.length > 0 && pass1.length > 0 && pass2.length > 0 && pass1 == pass2) {
            let user = await getLogin(login);
            if (user) {
                newMessage('login занят');
            } else {
                let user = await addUser(login, pass1);
                // addUserIrregularVerbs(user[0].id);!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                onUserChange(user);
                setWelcomePage('userPlace');
            }
        } else {
            newMessage('Данные введены некоректно');
        }
    }
    return (
        <div className='logInLogUpPlace'>
            <div className="mycard">
                <div className="mycard-header">
                    <div className="flex-container">
                        <div className="flex-block-3" style={{ textAlign: 'left' }}>
                            Регистрация
                        </div>
                        <div className="flex-block-3" style={{ textAlign: 'right' }}>
                            <button className="mybutton" onClick={() => setWelcomePage('welcome')} style={{ float: 'right' }}>X</button>
                        </div>
                    </div>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="mycard-body">
                        <label>Логин:</label>
                        <input type="text" className="myInput" value={login || ''} onChange={onLoginChange}></input>
                        <label>Пароль:</label>
                        <input type="password" className="myInput" value={pass1 || ''} onChange={onPass1Change}></input>
                        <label>Пароль, еще раз:</label>
                        <input type="password" className="myInput" value={pass2 || ''} onChange={onPass2Change}></input>
                        <div style={{ textAlign: 'right' }}><button type="submit" className="mybutton" style={{ marginTop: '5px' }}>Зарегестрироваться</button></div>
                    </div>
                </form>
            </div>
        </div>
    )
}