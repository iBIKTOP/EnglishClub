import React from 'react';
import validate from "../services/validate";
import {addUser} from "../services/requests"

export default class Registration extends React.Component {
    constructor(props){
        super(props);
        this.state = {login: '', pass1: '', pass2: ''}

        this.onSubmit = this.onSubmit.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPass1Change = this.onPass1Change.bind(this);
        this.onPass2Change = this.onPass2Change.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        if(this.state.pass1 == this.state.pass2){
            addUser(this.state.login, this.state.pass1, (({user}) => {
                this.setState({user});
            }));
        }
        
    }

    onLoginChange(e){
        let login = e.target.value;
        this.setState({login: validate(login)});
    }
    onPass1Change(e){
        let pass1 = e.target.value;
        this.setState({pass1: validate(pass1)});
    }
    onPass2Change(e){
        let pass2 = e.target.value;
        this.setState({pass2: validate(pass2)});
    }
    render() {
        return (
            <div className="container">
                <div className="card w-50 mx-auto mt-3 border-dark">
                    <div className="card-header bg-dark text-white">Регистрация</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Логин:</label>
                                <input type="text" className="form-control" value={this.state.login} onChange={this.onLoginChange}></input>
                            </div>
                            <div className="form-group">
                                <label>Пароль:</label>
                                <input type="password" className="form-control" value={this.state.pass1} onChange={this.onPass1Change}></input>
                            </div>
                            <div className="form-group">
                                <label>Пароль, еще раз:</label>
                                <input type="password" className="form-control" value={this.state.pass2} onChange={this.onPass2Change}></input>
                            </div>
                            <button type="submit" className="btn btn-outline-dark">Зарегестрироваться</button>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}