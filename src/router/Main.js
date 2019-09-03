import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from 'react-router-dom';
import Posts from '../pages/Posts';
import Post from '../pages/Post';
import Config from "../../_config";
import Nav from "../pages/Nav";
import CustomPage from "../pages/CustomPage";
import ScriptsTemplate from "../../templates/current/scripts";





class Main extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    render() {
        return (
            <Router>
                <Nav />
                <Switch>
                    <Route exact path="/" component={Posts} />
                    <Route exact path="/posts/:path" component={Post} />
                    <Route exact path="/pages/:page" component={CustomPage} />
                </Switch>
                <ScriptsTemplate />
            </Router>
        );
    }
}


export default Main;