import React, { Component } from "react";
import HeaderComponent from "./headerComponent/HeaderComponent";
import { getCookie, deleteCookie } from '../../services/cookie';
import '../../styles/App.css';
import RegistrationComponent from "./registrationComponent/RegistrationComponent";
import LoginComponent from "./loginComponent/LoginComponent";
import { getUser } from "../../services/requests"
import WelcomeComponent from "./welcomeComponent/WelcomeComponent";
import UserPlaceComponent from "./userPlaceComponent/UserPlaceComponent";

export default function MainComponent() {
    const [user, setUser] = React.useState(null);
    const [page, setPage] = React.useState('welcome');

    React.useEffect( () => {
        if (user == null) {
            (async () => {
                let cookieId = await getCookie('ID');
                if (cookieId != '') {
                    let user = await getUser(cookieId);
                    setUser(user);
                    setPage('userPlace');
            }
            })();
        }
    });

    let setWelcomePage = (page) => setPage(page);
    let onUserChange = (user) => {
        setUser(user);
    }
    let onLogOut = () => {
        deleteCookie();
        setUser(null);
        setPage('welcome');
    }
    let renderBody = () => {
        if (user == null) {
            switch (page) {
                case 'welcome':
                    return (
                        <div>
                            <HeaderComponent user={user} setWelcomePage={setWelcomePage} onLogOut={onLogOut} />
                            <WelcomeComponent />
                        </div>
                    )
                case 'signIn':
                    return (
                        <div>
                            <HeaderComponent user={user} setWelcomePage={setWelcomePage} onLogOut={onLogOut} />
                            <LoginComponent onUserChange={onUserChange} setWelcomePage={setWelcomePage} />
                        </div>
                    )
                case 'signUp':
                    return (
                        <div>
                            <HeaderComponent user={user} setWelcomePage={setWelcomePage} onLogOut={onLogOut} />
                            <RegistrationComponent onUserChange={onUserChange} setWelcomePage={setWelcomePage} />
                        </div>
                    )
            }
        } else {
            switch (page) {
                case 'userPlace':
                    return (
                        <UserPlaceComponent id={user.id} onLogOut={onLogOut}/>
                    )
            }
        }
    }
    return (
        <div>
            {renderBody()}
        </div>
    )
}