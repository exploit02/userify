import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Auth from "./views/auth";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/auth" component={Auth} />
                <Redirect to="/auth" />
            </Switch>
        </Router>
    );
}

export default App;
