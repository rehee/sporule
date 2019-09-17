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
                        <h1>{props.post.title}</h1>
                        <div clsss="meta">
                            <span className="date">
                                {props.post.metas.date}
                            </span>
                            {props.post.metas.categories.map((category, index) => {
                                return (
                                    <span className="category" key={index}>
                                        <a href={"/categories/" + category}>{category}</a>
                                    </span>
                                );
                            })}
                            <ul className="tag">
                                {props.post.metas.tags.map((tag, index) => {
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