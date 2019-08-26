import React from "react";
import Config from "../../_config";
const NavTemplate = require("../templates/" + Config.template + "/nav").default;


class Nav extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <NavTemplate />
    }
}



  export default Nav;
