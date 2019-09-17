import React from "react";


const PostsTemplate = (props) => {
    var prev;
    var next;
    var categories;
    var tags;
    if (props.prev) {
        prev = <span className="prev">
            <a href="#" className="prev" onClick={props.prev}>
                ← Previous Page
        </a>
        </span>;
    }
    if (props.next) {
        next = <span className="next">
            <a href="#" className="next" onClick={props.next}>
                Next Page →
        </a>
        </span>;
    }
    if (props.categories.length > 0) {
        categories = <div>
            Categories: {props.categories.join(",")}
        </div>
    }
    if (props.tags.length > 0) {
        tags = <div>
            Tags: {props.tags.join(",")}
        </div>
    }
    return (
        <div id="main" role="main" className="wrapper-content">
            <div className="container">
                {categories}
                {tags}
                <div className="posts">
                    {props.posts.items.map((md, index) => {
                        return (
                            <article key={index} className="post">
                                <h1>
                                    <a href={md.link}>{md.title}</a>
                                </h1>

                                <div className="meta">
                                    <span className="date">
                                        {md.metas.date}
                                    </span>
                                    {md.metas.categories.map((category, index) => {
                                        return (
                                            <span className="category" key={index}>
                                                <a href={"/categories/" + category}>{category}</a>
                                            </span>
                                        );
                                    })}
                                    <ul className="tag">
                                        {md.metas.tags.map((tag, index) => {
                                            return (
                                                <li key={index}>
                                                    <a href={"/?tags=" + tag}>
                                                        {tag}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>

                                {
                                    md.metas.coverimage.length > 0 ?
                                        (
                                            <div className="thumbnail">
                                                <img src={md.metas.coverimage} />
                                            </div>
                                        )
                                        : (
                                            <div className="thumbnail">
                                            </div>
                                        )
                                }


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