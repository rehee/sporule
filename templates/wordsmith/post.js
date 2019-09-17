import React from "react"

const PostTemplate = (props) => {
    return (
        <React.Fragment>
            <section className="s-content s-content--top-padding s-content--narrow">
                <article className="row entry format-standard">
                    <div className="entry__media col-full">
                        <div className="entry__post-thumb">
                            <img src={props.post.metas.coverimage} sizes="(max-width: 2000px) 100vw, 2000px" alt="" />
                        </div>
                    </div>
                    <div className="entry__header col-full">
                        <h1 className="entry__header-title display-1">
                            {props.post.title}
                        </h1>
                        <ul className="entry__header-meta">
                            <li className="date">{props.post.metas.date}</li>
                        </ul>
                    </div>

                    <div className="col-full entry__main">
                        {props.content}
                        <div className="entry__taxonomies">
                            <div className="entry__cat">
                                <h5>Posted In: </h5>
                                {props.post.metas.categories.map((category, index) => {
                                    return (
                                        <span className="entry__tax-list" key={index}>
                                            <a href={"/categories/" + category}>{category.toUpperCase()}</a>
                                        </span>
                                    );
                                })}

                            </div>

                            <div className="entry__tags">
                                <h5>Tags: </h5>
                                <span className="entry__tax-list entry__tax-list--pill">
                                    {props.post.metas.tags.map((tag, index) => {
                                        return (
                                            <a key={index} href={"/?tags=" + tag}>
                                                {tag}
                                            </a>
                                        );
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                </article>

                <div class="comments-wrap">

                    <div id="comments" class="row">
                        <div class="col-full">
                            {props.disqus}
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}


export default PostTemplate;