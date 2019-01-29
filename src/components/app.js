import React, { Component } from "react";
import { getWords, getUsers } from "../services/requests"
import DictionaryCatalog from "./DictionaryCatalog";


import '../styles/App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { catalog: null, users: null };
    }

    componentDidMount() {
        getWords(({ catalog }) => {
            this.setState({ catalog });
        });
        getUsers(({ users }) => {
            this.setState({ users });
        });
        // console.log( document.cookie || "Cookie пустой" );
    }

    render() {
        if (this.state.catalog !== null) {
            return (
                <div className="container">
                    <DictionaryCatalog catalog={this.state.catalog} />
                </div>
            );
        } else {
            return (
                <p>Сервер не доступен. Проверте настройки запроса к серверу.</p>
            )
        }
    }
}

export default App;