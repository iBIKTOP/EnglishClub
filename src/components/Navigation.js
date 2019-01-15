import React from 'react';
import {Link, BrowserRouter}  from 'react-router-dom';
 
export default class Navigation extends React.Component{
    render(){
        return (
            <div className="navbar navbar-dark bg-dark justify-content-end">
                <div className="nav-item pr-2">
                    <Link className="nav-link btn btn-outline-light" to="/">Главная</Link>
                </div>
                <div className="nav-item pr-2">
                    <Link className="nav-link btn btn-outline-light" to="/registration">Регистрация</Link>
                </div>
                <div className="nav-item pr-2">
                    <Link className="nav-link btn btn-outline-light" to="/Autorithation">Вход</Link>
                </div>
            </div>
        )
    }
}