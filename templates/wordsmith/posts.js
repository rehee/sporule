import React from "react";
import TemplateConfig from "./_templateConfig";


const PostsTemplate = (props) => {
    var prev;
    var next;
    if (props.prev) {
        prev = <li>
            <a href="#" className="pgn__prev" onClick={props.prev}>
                Previous
        </a>
        </li>;
    }
    if (props.next) {
        next = <li>
            <a href="#" className="pgn__next" onClick={props.next}>
                Next
        </a>
        </li>;
    }

    return (
        <React.Fragment>
            <section className="s-featured">
                <div className="row">
                    <div className="col-full">
                        <div className="featured-slider featured" data-aos="flip-left">
                            {
                                props.pinned.items.slice(0, TemplateConfig.maximumPinnedPosts).map((post, index) => {
                                    return (
                                        <div key={index} className="featured__slide">
                                            <div className="entry" data-aos="zoom-in">
                                                <div className="entry__background" style={{ "backgroundImage": "url(" + post.metas.thumbnail + ")" }}><a href={post.link}></a></div>
                                                <div className="entry__content">
                                                    {post.metas.categories.map((category, index) => {
                                                        return (
                                                            <span className="entry__category" key={index}>
                                                                <a href={"/categories/" + category}>{category}</a>
                                                            </span>
                                                        );
                                                    })}
                                                    <h1><a href={post.link} title="">{post.title}</a></h1>
                                                    <div className="entry__info">
                                                        <ul className="entry__meta">
                                                            <li>{post.metas.date}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>

            <section className="s-content">
                <div className="row entries-wrap wide">
                    <div className="entries">
                        {
                            props.posts.items.map((post, index) => {
                                return (
                                    <article key={index} className="col-block">
                                        <div className="item-entry" data-aos="zoom-out">
                                            <div className="item-entry__thumb">
                                                <a href={post.link} className="item-entry__thumb-link">
                                                    <img src={post.metas.thumbnail} alt={post.title} />
                                                </a>
                                            </div>
                                            <div className="item-entry__text">
                                                <div className="item-entry__cat">
                                                    {post.metas.categories.map((category, index) => {
                                                        return (
                                                            <a href={"/categories/" + category} key={index}> {category}</a>
                                                        );
                                                    })}
                                                </div>
                                                <h1 className="item-entry__title"><a href={post.link}>{post.title}</a></h1>
                                                <div className="item-entry__date">
                                                    {post.metas.date}
                                                </div>
                                            </div>
                                        </div>

                                    </article>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="row pagination-wrap">
                    <div className="col-full">
                        <nav className="pgn">
                            <ul>
                                {prev}
                                {next}
                            </ul>
                        </nav>
                    </div>
                </div>

            </section>
        </React.Fragment>
    );
}


export default PostsTemplate