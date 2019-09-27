import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import * as PostActions from "../actions/PostAction";
import PostsTemplate from "../../template/posts";
import * as PostHelper from "../helpers/postHelper";


class Posts extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            "pinnedPosts":
            {
                "items": [
                    {
                        "title": "",
                        "metas": {
                            "categories": [],
                            "tags": [],
                            "title": "",
                            "date": "",
                            "coverimage": ""
                        },
                        "link": "",
                        "content": "",
                        "excerpt": "",
                        "path": ""
                    }
                ],
                "categories": [],
                "tags": [],
                "invalidPage": false,
                hash: "",
            }
            ,
            "posts":
            {
                "items": [
                    {
                        "title": "",
                        "metas": {
                            "categories": [],
                            "tags": [],
                            "title": "",
                            "date": "",
                            "coverimage": ""
                        },
                        "link": "",
                        "content": "",
                        "excerpt": "",
                        "path": ""
                    }
                ],
                "categories": [],
                "tags": [],
                "invalidPage": false,
                hash: ""
            }
        };
        const categoriesString = this.props.match.params.categories;
        const tagsString = queryString.parse(this.props.location.search).tags;
        this.page = queryString.parse(this.props.location.search).page || 1;
        this.categories = categoriesString ? categoriesString.split(",") : [];
        this.tags = tagsString ? tagsString.split(",") : [];
        this.searchString = queryString.parse(this.props.location.search).search || "";

    }

    componentDidMount() {
        document.title = document.title.split(" - ")[0] + " - " + "Posts";
    }


    toPage = (page) => {
        window.location.href = window.location.pathname + "?page=" + page;
    }

    render() {
        console.log("props posts");
        const pinnedPosts = PostHelper.getPinnedPosts(this.props.posts);
        const posts = PostHelper.getPostsByPage(this.props.posts, this.page, true, this.searchString, this.categories, this.tags);
        if ((posts.length <= 0 && this.props.posts.length > 0) || posts.invalidPage) {
            window.location.href = "/";
            return null;
        }

        var prev;
        var next;
        if (posts.hasPrevPage) {
            prev = () => {
                this.toPage(parseInt(posts.page) - 1);
            }
        }
        if (posts.hasNextPage) {
            next = () => {
                this.toPage(parseInt(posts.page) + 1);
            }
        }
        return <PostsTemplate posts={posts} categories={this.categories} tags={this.tags} prev={prev} next={next} pinned={pinnedPosts} />
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
