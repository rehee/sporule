import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Config from "../../_config";
import * as PostActions from "../actions/PostAction";
import PostTemplate from "../../templates/current/post";
import renderHTML from 'react-render-html';
import MarkdownIt from 'markdown-it';
import Disqus from 'disqus-react';
import markdownItTocAndAnchor from "markdown-it-toc-and-anchor-with-slugid";
import PostResources from "../resources/PostResources";

class Post extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            "toc": "",
            "post": {
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
                "path": "",
                "html": ""
            }
        };
    }

    componentDidMount() {
        let path = "/posts/" + this.props.match.params.path + ".md";
        this.loadSinglePost(path);
    }

    loadSinglePost = (path) => {
        let resources = new PostResources();
        resources.getAll([path], true).then(posts => {
            if (posts != null && posts !== undefined && posts.items.length > 0) {
                const mdConfig = {
                    html: true,
                    linkify: true,
                    typography: true
                }
                const tocConfig = {
                    "anchorClassName": "md-anchor",
                    "tocClassName": "md-toc",
                    "tocCallback": function (tocMarkdown, tocArray, tocHtml) {
                        this.setState(() => {
                            return { "toc": tocHtml };
                        });
                    }.bind(this)
                }
                posts.items[0].html = new MarkdownIt(mdConfig).use(markdownItTocAndAnchor, tocConfig).render(posts.items[0].content);
                this.setState(() => {
                    return { "post": posts.items[0] };
                });
            }
            else {
                window.location.href = "/";
            }
        })
    }

    render() {
        const disqusShortname = Config.disqusShortname;
        const disqusConfig = {
            url: window.location.href,
            identifier: window.location.href,
            title: this.props.match.params.path,
        };
        return (
            <PostTemplate toc={renderHTML(this.state.toc)} post={this.state.post} content={renderHTML(this.state.post.html)} disqus={<Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />} />
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Post);

