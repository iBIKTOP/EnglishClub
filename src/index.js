import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Registration from "./components/registrationPage/Registration";
import Login from "./components/loginPage/Login";
import NotFound from "./components/notFound/NotFound";
import Home from "./components/homePage/Home";
import Irregular_verbs from "./components/irregularVerbsPage/Irregular_verbs"

ReactDOM.render(
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/registration" component={Registration} />
                <Route path="/login" component={Login} />
                <Route path="/irregular_verbs" component={Irregular_verbs} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
    , document.getElementById("root"));