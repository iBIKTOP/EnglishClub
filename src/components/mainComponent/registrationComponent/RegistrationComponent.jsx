import React from 'react';
import validate from "../../../services/validate";
import { getLogin, addUser, addUserIrregularVerbs } from "../../../services/requests"
import Message from '../../public/Message';

export default function RegistrationComponent({ onUserChange, setWelcomePage }) {
    const [login, setLogin] = React.useState('');
    const [pass1, setPass1] = React.useState('');
    const [pass2, setPass2] = React.useState('');
    const [message, setMessage] = React.useState('');

    let onLoginChange = (e) => {
        let login = e.target.value;
        setLogin(validate(login));
        setMessage('');
    }
    let onPass1Change = (e) => {
        let pass1 = e.target.value;
        setPass1(validate(pass1));
        setMessage('');
    }
    let onPass2Change = (e) => {
        let pass2 = e.target.value;
        setPass2(validate(pass2));
        setMessage('');
    }
    let onSubmit = async (e) => {
        e.preventDefault();
        if (login.length > 0 && pass1.length > 0 && pass2.length > 0 && pass1 == pass2) {
            let user = await getLogin(login);
            if (user) {
                setMessage('(Ошибка: login занят)');
            } else {
                let user = await addUser(login, pass1);
                // addUserIrregularVerbs(user[0].id);!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                onUserChange(user);
                setWelcomePage('userPlace');
            }
        } else {
            setMessage('(Ошибка: Данные введены некоректно)');
        }
    }
    return (
        <div className='logInLogUpPlace'>
            <div className="mycard">
                <div className="mycard-header">
                    <div className="flex-container">
                        <div className="flex-block-3" style={{ textAlign: 'left' }}>
                            Регистрация <Message message={message} />
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

// export default class RegistrationComponent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { login: '', pass1: '', pass2: '', message: '' }

//         this.onSubmit = this.onSubmit.bind(this);
//         this.onLoginChange = this.onLoginChange.bind(this);
//         this.onPass1Change = this.onPass1Change.bind(this);
//         this.onPass2Change = this.onPass2Change.bind(this);
//     }
//     onSubmit(e) {
//         e.preventDefault();
//         if (this.state.login.length > 0 && this.state.pass1.length > 0 && this.state.pass2.length > 0 && this.state.pass1 == this.state.pass2) {
//             getLogin(this.state.login, (user) => {
//                 if (user) {
//                     this.setState({ message: '(Ошибка: login занят)' });
//                 } else {
//                     addUser(this.state.login, this.state.pass1, (user) => {
//                         addUserIrregularVerbs(user[0].id);
//                         this.props.onUserIDChange(user[0].id);
//                     });
//                     this.setState({ message: '(Регистрация успешна)' });
//                 }
//             });
//         } else {
//             this.setState({ message: '(Ошибка: Данные введены некоректно)' });
//         }
//     }
//     onLoginChange(e) {
//         let login = e.target.value;
//         this.setState({ login: validate(login) });
//         this.setState({ message: '' });
//     }
//     onPass1Change(e) {
//         let pass1 = e.target.value;
//         this.setState({ pass1: validate(pass1) });
//         this.setState({ message: '' });
//     }
//     onPass2Change(e) {
//         let pass2 = e.target.value;
//         this.setState({ pass2: validate(pass2) });
//         this.setState({ message: '' });
//     }
//     render() {
//         return (
//             <div className='logInLogUpPlace'>
//                 <div className="mycard">
//                     <div className="mycard-header">Регистрация <Message message={this.state.message} /></div>

//                     <form onSubmit={this.onSubmit}>
//                         <div className="mycard-body">
//                             <label>Логин:</label>
//                             <input type="text" className="myInput" value={this.state.login || ''} onChange={this.onLoginChange}></input>
//                             <label>Пароль:</label>
//                             <input type="password" className="myInput" value={this.state.pass1 || ''} onChange={this.onPass1Change}></input>
//                             <label>Пароль, еще раз:</label>
//                             <input type="password" className="myInput" value={this.state.pass2 || ''} onChange={this.onPass2Change}></input>
//                             <div style={{ textAlign: 'right' }}><button type="submit" className="mybutton" style={{ marginTop: '5px' }}>Зарегестрироваться</button></div>

//                         </div>
//                     </form>

//                 </div>
//             </div>
//         )
//     }
// }