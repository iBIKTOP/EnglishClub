import React, { Component } from "react";

import HeaderComponent from "./headerComponent/HeaderComponent";
import { getCookie, deleteCookie } from '../../services/cookie';
import welcom from "../../img/welcom.jpg";
import '../../styles/App.css';
import RegistrationComponent from "./bodyComponent/registrationComponent/RegistrationComponent";
import LoginComponent from "./bodyComponent/loginComponent/LoginComponent";
import BodyComponent from "./bodyComponent/BodyComponent";
import { getUser } from "../../services/requests"

export default class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { user: '', toggle: false };

        this.onLogOut = this.onLogOut.bind(this);
        this.onUserIDChange = this.onUserIDChange.bind(this);
    }
    componentDidMount() {
        getCookie('ID', (id) => {
            getUser(id, (user) => {
                this.setState({ user: user });
            });
        });
        
    }
    onLogOut() {
        deleteCookie();
        this.setState({ user: '' });
    }
    onUserIDChange(user) {
        this.setState({ user: user });
    }
    render() {
        if (this.state.user != '') {
            return (
                <div>
                    <HeaderComponent user={this.state.user} onLogOut={this.onLogOut} />
                    <BodyComponent userID={this.state.user.id} />
                </div>
            );
        } else {
            return (
                <div>
                    <HeaderComponent user={this.state.user} onLogOut={this.onLogOut} />
                    {/* <div className="text-center"><img src={welcom}></img></div> */}
                    <LoginComponent onUserIDChange={this.onUserIDChange} />
                    {/* <RegistrationComponent onUserIDChange={this.onUserIDChange} /> */}
                </div>
            )
        }
    }
}