import React from "react"

const PostTemplate = (props) => {
    return (
        <React.Fragment>
            <aside className="toc">
                {props.toc}
            </aside>
            <div id="main" role="main" className="wrapper-content withtoc">
                <div className="container">
                    <article className="posts">
                        <h1>{props.md.title}</h1>
                        <div clsss="meta">
                            <span className="date">
                                {props.md.date}
                            </span>
                            <span className="category"><a href={"/?categories=" + props.md.category}>{props.md.category}</a></span>
                            <ul className="tag">
                                {props.md.tags.map((tag, index) => {
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
                            {props.content}
                        </div>
                        {props.disqus}
                    </article>
                </div>
            </div>
        </React.Fragment>
    );
}


export default PostTemplate