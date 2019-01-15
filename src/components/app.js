import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import DictionaryCatalog from "./DictionaryCatalog";


import '../styles/App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { catalog: null };
    }

    componentDidMount() {
        this.getWords();
    }

    getWords() {
        fetch("http://192.168.4.129:5000")
            .then(function (response) {
                return response.text();
            })
            .then(function (data) {
                data = JSON.parse(data);//парсим JSON, создаем объект
                console.log(data);
                this.setState({ catalog: data });
                console.log(this.state.catalog);
            }.bind(this))
            .catch(function (error) {
                log('Request failed', error)
            });
    };

    render() {
        if(this.state.catalog!==null){
            return (
                <div className="container">
                    <h1>My English dictionary!</h1>
                    <DictionaryCatalog catalog={this.state.catalog}/>
                </div>
            );
        }else{
            return (
                <p>Подгружаем...</p>
            )
        }
    }
}

export default App;