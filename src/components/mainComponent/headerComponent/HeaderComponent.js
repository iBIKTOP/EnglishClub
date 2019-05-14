import React from 'react';

import { getUser } from "../../../services/requests"

export default class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userName: '' }
    }
    componentDidMount() {
        if (this.props.userID) {
            getUser(this.props.userID, (login) => {
                this.setState({ userName: login });
            });
        }
    }
    renderUser() {
        if (this.state.userName == '') {
            return (
                <div className="col-6 p-0 m-0 text-right">Необходима регистрация
                    {/* <Link className="btn btn-outline-light ml-2" to="/registration">Регистрация</Link>
                    <Link className="btn btn-outline-light ml-2" to="/login">Вход</Link> */}
                </div>
            )
        } else if (this.props.userName != '') {
            return (
                <div className="col-8 p-0 m-0 text-right">
                    {/* <Link className="m-0 p-0" to="/irregular_verbs"><img src={ir} width='40px;'></img></Link> */}
                    <button className="btn btn-outline-light ml-2">{this.state.userName}</button>
                    <button className="btn btn-outline-light ml-2" onClick={this.props.onLogOut}>Выход</button>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="nav_panel">
                <div className="container">
                    <div className="row p-1 m-0 justify-content-between align-items-center">
                        <div className="col-4 p-0 m-0">
                            {/* <Link className="logoName" to="/">EngForYou</Link> */}
                            <a>EngForYou</a>
                        </div>
                        {this.renderUser()}
                    </div>
                </div>
            </div>
        )
    }
}