import React, { Component } from "react";
import { getWords, getUsers } from "../services/requests"
import DictionaryCatalog from "./DictionaryCatalog";
import Nav from "./Nav";
import { getCookie } from '../services/cookie';

import '../styles/App.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { catalog: null, users: null, user: '' };
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

    renderDictionaryCatalog() {
        if(this.state.user!=''){
            return this.state.catalog !== null ? <DictionaryCatalog catalog={this.state.catalog} /> : <p>К сожалению сервер не доступен.</p>;
        }else{
            return <p>Необходима авторизация!!!</p>
        }
    }

    render() {
        return (
            <div>
                <Nav />
                <div className="container">
                    {this.renderDictionaryCatalog()}
                </div>
            </div>
        );
    }
}