import React from "react";
import Config from "../_config";
import TemplateConfig from "./_templateConfig";

const NavTemplate = (props) => {
    return (
        <header className="s-header header">
            <div className="header__logo">
                <a className="logo" href="/">
                    <h1>{Config.site}</h1>
                </a>
            </div>

            <a className="header__search-trigger" href="#0"></a>
            <div className="header__search">
                <form role="search" method="get" className="header__search-form" action="/">
                    <label>
                        <span className="hide-content">Search for:</span>
                        <input type="search" className="search-field" placeholder="Type Keywords" onChange={o => { }} name="search" title="Search for:" autoComplete="off" />
                    </label>
                    <input type="submit" className="search-submit" value="Search" readOnly />
                </form>
                <a href="#0" title="Close Search" className="header__overlay-close">Close</a>
            </div>

            <a className="header__toggle-menu" href="#0" title="Menu"><span>Menu</span></a>
            <nav className="header__nav-wrap">
                <h2 className="header__nav-heading h6">Navigate to</h2>
                <ul className="header__nav">
                    {
                        Object.keys(TemplateConfig.navs).map((index, key) => {
                            return (
                                <li key={key}><a href={TemplateConfig.navs[index]}>{index}</a></li>
                            );
                        })
                    }
                    <li className="has-children">
                        <a href="#0" title="">Categories</a>
                        <ul className="sub-menu">
                            {
                                props.categories.map((category, index) => {
                                    return (
                                        <li key={index}><a href={"/categories/" + category}>{category.toLowerCase()}</a></li>
                                    );
                                })
                            }
                        </ul>
                    </li>

                </ul>

                <a href="#0" title="Close Menu" className="header__overlay-close close-mobile-menu">Close</a>
            </nav>
        </header>
    );
}


export default NavTemplate