import React, { Component } from "react";

import HeaderComponent from "./headerComponent/HeaderComponent";
import { getCookie, deleteCookie } from '../../services/cookie';
import welcom from "../../img/welcom.jpg";
import '../../styles/App.css';
import RegistrationComponent from "./bodyComponent/registrationComponent/RegistrationComponent";
import LoginComponent from "./bodyComponent/loginComponent/LoginComponent";
import BodyComponent from "./bodyComponent/BodyComponent";

export default class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { id: '', userName: '', toggle: false };

        this.onLogOut = this.onLogOut.bind(this);
        this.onUserIDChange = this.onUserIDChange.bind(this);
    }
    componentDidMount() {
        getCookie('ID', (id) => {
            this.setState({ id: id });
        });
    }
    onLogOut() {
        deleteCookie();
        this.setState({ id: '' });
    }
    onUserIDChange(id) {
        this.setState({ id: id });
    }
    render() {
        if (this.state.id != '') {
            return (
                <div>
                    <HeaderComponent userID={this.state.id} onLogOut={this.onLogOut} />
                    <BodyComponent userID={this.state.id} />
                </div>
            );
        } else {
            return (
                <div>
                    <HeaderComponent userID={this.state.id} onLogOut={this.onLogOut} />
                    {/* <div className="text-center"><img src={welcom}></img></div> */}
                    <LoginComponent onUserIDChange={this.onUserIDChange} />
                    <RegistrationComponent onUserIDChange={this.onUserIDChange} />
                </div>
            )
        }
    }
}