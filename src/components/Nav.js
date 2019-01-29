import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';

export default class Nav extends React.Component {
    constructor(props){
        super(props);
        this.state = {user: ''}
    }

    getCookie(name) {
        var matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : '';
    }
    deleteCookie(){
        document.cookie = `name=''; path=/; expires=${(new Date(Date.now()-1000)).toUTCString()}`;             
    }

    componentDidMount() {
        this.setState({user: this.getCookie('name')});
    }

    renderUser(){
        if(this.state.user==''){
            return (
                <div className="col-3 p-0 m-0 text-right">
                    <Link className="btn btn-outline-light ml-2" to="/registration">Регистрация</Link>
                    <Link className="btn btn-outline-light ml-2" to="/autorithation">Вход</Link>
                </div>
            )
        }else{
            return (
                <div className="col-3 p-0 m-0 text-right">
                    <Link className="btn btn-outline-light ml-2" to="/">{this.state.user}</Link>
                    <button className="btn btn-outline-light ml-2" onClick={this.deleteCookie()}>Выход</button>
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