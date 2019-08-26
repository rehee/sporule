import React from "react";


const PostsTemplate = (props) => {
    var prev;
    var next;
    if (props.prev) {
        prev = <span className="prev">
            <a href="#" className="prev" onClick={props.prev}>
                ← Previous Page
        </a>
        </span>;
    }
    if (props.next) {
        next = <span className="next">
            <a className="next" onClick={props.next}>
                Next Page →
        </a>
        </span>;
    }
    return (
        <div id="main" role="main" className="wrapper-content">
            <div className="container">
                <div className="posts">
                    {props.posts.items.map((md, index) => {
                        return (
                            <article key={index} className="post">
                                <h1>
                                    <a href={md.link}>{md.title}</a>
                                </h1>

                                <div className="meta">
                                    <span className="date">
                                        {md.date}
                                    </span>
                                    <ul className="tag">
                                        {md.tags.map((tag, index) => {
                                            return (
                                                <li key={index}>
                                                    <a href="/">
                                                        {tag}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>

                                <div className="entry">
                                    <p>{md.excerpt}</p>
                                </div>

                                <a href={md.link} className="read-more">Read More</a>
                            </article>
                        );
                    })}
                </div>
                <div className="pagination">
                    {prev}
                    {next}
                </div>
            </div>
        </div>
    );
}


export default PostsTemplate