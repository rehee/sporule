import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from 'react-router-dom';
import Posts from '../pages/Posts';
import Post from '../pages/Post';
import Config from "../../_config";
import Nav from "../pages/Nav";
const ScriptsTemplate = require("../templates/" + Config.template + "/scripts").default;



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
                </Switch>
                <ScriptsTemplate />
            </Router>
        );
    }
}


export default Main;