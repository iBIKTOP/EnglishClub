import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';

export default class Nav extends React.Component {
    render() {
        return (
            <div className="bg-dark">
                <div className="container">
                    <div className="row p-1 m-0 justify-content-between">
                        <div className="col-4 p-0 m-0">
                            <Link className="logoName" to="/"><h3>My English dictionary!</h3></Link>
                        </div>
                        <div className="col-3 p-0 m-0 text-right">
                            <Link className="btn btn-outline-light ml-2" to="/registration">Регистрация</Link>
                            <Link className="btn btn-outline-light ml-2" to="/autorithation">Вход</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}