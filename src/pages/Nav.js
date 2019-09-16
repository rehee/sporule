import React from "react";
import NavTemplate from "../../templates/current/nav";
import { connect } from "react-redux";



class Nav extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
    }

    render() {
        return <NavTemplate categories={this.props.posts.categories} />
    }
}


function mapStateToProps(state) {
    return {
        posts: state.posts,
    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);