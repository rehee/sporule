import React from "react";
import Config from "../../_config";
import FooterTemplate from "./footer";
import TemplateConfig from "./_templateConfig";

const NavTemplate = () => {

    return (
        <div className="wrapper-sidebar">
            <header className="sidebar clearfix">
                <div className="site-info">
                    <a href="/" className="site-avatar"><img src={Config.avatar} /></a>
                    <h1 className="site-name"><a href="/">{Config.site}</a></h1>
                    <p className="site-description">{Config.description}</p>
                </div>
            </header>

            <div className="navlist">
                <nav>
                    {
                        Object.keys(TemplateConfig.navs).map((index,key) => {
                            return (
                                <a key={index} href={TemplateConfig.navs[index]}>{index}</a>
                            );
                        })
                    }
                </nav>
            </div>
            <FooterTemplate />
        </div>
    );
}


export default NavTemplate