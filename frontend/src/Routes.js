import React from "react";
import { Route, Switch } from "react-router-dom";
import Diagrams from "./pages/Diagrams";
import Dashboard from "./pages/Dashboard";
import Statistics from "./pages/Statistics";
import Honeypots from "./pages/Honeypots";      
import HomePage from "./pages/HomePage";
import Commands from "./pages/Commands";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/statistics" component={Statistics}/>
            <Route exact path="/diagrams" component={Diagrams}/>
            <Route exact path="/honeypots" component={Honeypots}/>
            <Route exact path="/commands" component={Commands}/>
        </Switch>
    );
};

export default Routes;
