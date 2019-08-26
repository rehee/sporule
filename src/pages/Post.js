import React from "react";
import Config from "../../_config";
const PostTemplate = require("../templates/" + Config.template + "/post").default;
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
            "content": "",
            "meta": { "title": "", "content": "", "tags": [], "category": "", "date": "", "excerpt": "", thumbnail: "", "link": "" }
        };
    }

    componentDidMount() {
        this.loadPage();
    }

    loadPage = () => {
        var path = "/posts/" + this.props.match.params.path + ".md";
        let resources = new PostResources();
        resources.getAll(1, [path]).then(posts => {
            if (posts != null && posts !== undefined) {
                this.setState(() => {
                    return { "meta": posts.items[0] };
                });
                const mdConfig = {
                    html: true,
                    linkify: true,
                    typography: true
                }
                const tocConfig = {
                    "anchorClassName":"md-anchor",
                    "tocClassName":"md-toc",
                    "tocCallback": function (tocMarkdown, tocArray, tocHtml) {
                        this.setState(() => {
                            return { "toc": tocHtml };
                        });
                    }.bind(this)
                }
                const content = new MarkdownIt(mdConfig).use(markdownItTocAndAnchor, tocConfig).render(posts.items[0].content);
                this.setState(() => {
                    return { "content": content };
                });
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
            <PostTemplate toc={renderHTML(this.state.toc)} md={this.state.meta} content={renderHTML(this.state.content)} disqus={<Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />} />
        );
    }
}



export default Post;

