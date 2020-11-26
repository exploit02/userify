import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./components/hoc/privateRoute";
import { Notifier } from "./components/notifier/notifier";
import Auth from "./views/auth";
import Profile from "./views/profile";
import "./App.css";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/auth" component={Auth} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <Redirect to="/profile" />
            </Switch>
            <Notifier />
        </Router>
    );
}

export default App;
