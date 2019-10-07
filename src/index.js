import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainComponent from "./components/mainComponent/MainComponent";
import RegistrationComponent from "./components/mainComponent/bodyComponent/registrationComponent/RegistrationComponent";
import LoginComponent from "./components/mainComponent/bodyComponent/loginComponent/LoginComponent";

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={MainComponent} />
            <Route path="/autorization" component={LoginComponent} />
            <Route path="/registration" component={RegistrationComponent} />
            {/* <Route component={NotFound} /> */}
        </Switch>
    </Router>, 
    document.getElementById("root"));