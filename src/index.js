import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from "./components/Navigation";
import Registration from "./components/Registration";
import Autorithation from "./components/Autorithation";
import NotFound from "./components/NotFound";
import App from "./components/App.js";

ReactDOM.render(
    <Router>
        <div>
           <Navigation />
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/registration" component={Registration} />
                <Route path="/autorithation" component={Autorithation} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
    , document.getElementById("root"));