import React, { Component } from "react";
import { getWords, getUsers } from "../services/requests"
import DictionaryCatalog from "./DictionaryCatalog";
import Nav from "./Nav";
import { getCookie, deleteCookie } from '../services/cookie';
import welcom from "../img/welcom.jpg";
import '../styles/App.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { catalog: null, users: null, user: '' };

        this.onLogOut = this.onLogOut.bind(this);
    }

    componentDidMount() {
        getCookie('name',
            (name) => {
                this.setState({ user: name });
            },
            (name) => {
                getWords(name, ({ catalog }) => {
                    this.setState({ catalog });
                });
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
            return <div className="text-center"><img src={welcom}></img></div>
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