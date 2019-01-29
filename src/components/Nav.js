import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import { getCookie, deleteCookie } from '../services/cookie';

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: '' }
        this.onExit = this.onExit.bind(this);
    }

    componentDidMount() {
        getCookie('name', (name) => {
            this.setState({ user: name });
            console.log(name);
        });
    }

    onExit() {
        deleteCookie();
        this.setState({ user: '' });
    }

    renderUser() {
        if (this.state.user == '') {
            return (
                <div className="col-3 p-0 m-0 text-right">
                    <Link className="btn btn-outline-light ml-2" to="/registration">Регистрация</Link>
                    <Link className="btn btn-outline-light ml-2" to="/autorithation">Вход</Link>
                </div>
            )
        } else if (this.state.user != '') {
            return (
                <div className="col-3 p-0 m-0 text-right">
                    <button className="btn btn-outline-light ml-2">{this.state.user}</button>
                    <button className="btn btn-outline-light ml-2" onClick={this.onExit}>Выход</button>
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
                            <Link className="logoName" to="/"><h3>My English dictionary!</h3></Link>
                        </div>
                        {this.renderUser()}
                    </div>
                </div>
            </div>
        )
    }
}