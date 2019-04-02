import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import { getCookie, deleteCookie } from '../services/cookie';

export default class Nav extends React.Component {

    renderUser() {
        if (this.props.user == '') {
            return (
                <div className="col-6 p-0 m-0 text-right">
                    <Link className="btn btn-outline-light ml-2" to="/registration">Регистрация</Link>
                    <Link className="btn btn-outline-light ml-2" to="/login">Вход</Link>
                </div>
            )
        } else if (this.props.user != '') {
            return (
                <div className="col-6 p-0 m-0 text-right">
                    <Link className="btn btn-outline-light ml-2" to="/irregular_verbs">Irregular Verbs</Link>
                    <button className="btn btn-outline-light ml-2">{this.props.user}</button>
                    <button className="btn btn-outline-light ml-2" onClick={this.props.onLogOut}>Выход</button>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="bg-dark">
                <div className="container">
                    <div className="row p-1 m-0 justify-content-between">
                        <div className="col-4 p-0 m-0">
                            <Link className="logoName" to="/"><h4>EnglishClub</h4></Link>
                        </div>
                        {this.renderUser()}
                    </div>
                </div>
            </div>
        )
    }
}