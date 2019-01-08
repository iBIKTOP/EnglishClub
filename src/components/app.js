import React, { Component } from "react";

import '../styles/App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { words: "" };
    }

    componentDidMount() {
        let data = this.getWords();
        this.setState = { words: data };
    }

    getWords() {
        fetch("http://localhost:3000/words")
            .then(function (response) {
                return response.text();
            })
            .then(function (data) {
                data = JSON.parse(data);//парсим JSON, создаем объект
                console.log(data);
            })
            .catch(function (error) {
                log('Request failed', error)
            });
    };

    render() {
        return (
            <div>
                <h1>My React App!</h1>
            </div>
        );
    }
}

export default App;