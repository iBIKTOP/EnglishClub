import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from "./components/Nav";
import Registration from "./components/Registration";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Home from "./components/Home.js";
import Irregular_verbs from "./components/Irregular_verbs.js"

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