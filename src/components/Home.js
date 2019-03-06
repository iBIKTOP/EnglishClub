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
        this.state = { catalog: null, users: null, id: '' };

        this.onLogOut = this.onLogOut.bind(this);
    }

    componentDidMount() {
        getCookie('ID',
            (id) => {
                this.setState({ id: id });
            },
            (id) => {
                getWords(id, ({ catalog }) => {
                    this.setState({ catalog });
                });
            });
    }

    onLogOut() {
        deleteCookie();
        this.setState({ id: '' });
    }

    renderDictionaryCatalog() {
        if (this.state.id != '') {
            return this.state.catalog !== null ? <DictionaryCatalog catalog={this.state.catalog} /> : <p>К сожалению сервер не доступен.</p>;
        } else {
            return <div className="text-center"><img src={welcom}></img></div>
        }
    }

    render() {
        return (
            <div>
                <Nav user={this.state.id} onLogOut={this.onLogOut} />
                <div className="container">
                    {this.renderDictionaryCatalog()}
                </div>
            </div>
        );
    }
}