import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import * as PostActions from "../actions/PostAction";
import Config from "../../_config";
const PostsTemplate = require("../templates/" + Config.template + "/posts").default;


class Posts extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const page = queryString.parse(this.props.location.search).page || 1;
        this.props.actions.loadPosts(page);
    }

    toPage = (page) => {
        window.location.href = window.location.pathname + "?page=" + page;
    }

    render() {

        if (this.props.posts.invalidPage) {
            this.toPage(1);
            return null;
        }

        var prev;
        var next;
        if (this.props.posts.hasPrevPage) {
            prev = () => {
                this.toPage(parseInt(this.props.posts.page) - 1);
            }
        }
        if (this.props.posts.hasNextPage) {
            next = () => {
                this.toPage(parseInt(this.props.posts.page) + 1);
            }
        }
        return <PostsTemplate posts={this.props.posts} prev={prev} next={next} />
    }
}


function mapStateToProps(state) {
    return {
        posts: state.posts,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(PostActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
