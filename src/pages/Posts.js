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
        const categoriesString = queryString.parse(this.props.location.search).categories;
        const tagsString = queryString.parse(this.props.location.search).tags;
        this.categories = categoriesString ? categoriesString.split(",") : [];
        this.tags = tagsString ? tagsString.split(",") : [];
    }

    componentDidMount() {
        const page = queryString.parse(this.props.location.search).page || 1;
        this.props.actions.loadPosts(page, [], this.categories, this.tags);
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
        return <PostsTemplate posts={this.props.posts} categories={this.categories} tags={this.tags} prev={prev} next={next} />
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