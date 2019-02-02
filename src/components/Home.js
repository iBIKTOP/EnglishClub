import React, { Component } from "react";
import { getWords, getUsers } from "../services/requests"
import DictionaryCatalog from "./DictionaryCatalog";
import Nav from "./Nav";
import { getCookie, deleteCookie } from '../services/cookie';

import '../styles/App.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { catalog: null, users: null, user: '' };

        this.onLogOut = this.onLogOut.bind(this);
    }

    componentDidMount() {
        getWords(({ catalog }) => {
            this.setState({ catalog });
        });
        getUsers(({ users }) => {
            this.setState({ users });
        });
        getCookie('name', (name) => {
            this.setState({ user: name });
        });
    }

    onLogOut() {
        deleteCookie();
        this.setState({ user: '' });
    }

    renderDictionaryCatalog() {
        if (this.state.user != '') {
            return this.state.catalog !== null ? <DictionaryCatalog catalog={this.state.catalog} /> : <p>К сожалению сервер не доступен.</p>;
        } else {
            return <p>Необходима авторизация!!!</p>
        }
    }

    render() {
        return (
            <div>
                <Nav user={this.state.user} onLogOut={this.onLogOut} />
                <div className="container">
                    {this.renderDictionaryCatalog()}
                </div>
            </div>
        );
    }
}