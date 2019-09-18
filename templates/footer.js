import React from "react";
import Config from "../_config";
import TemplateConfig from "./_templateConfig";

const FooterTemplate = () => {
    return (
        <footer className="s-footer">
            <div className="s-footer__main">
                <div className="row">
                    <div className="col-twelve tab-full s-footer__about">
                        <h4>About {Config.site}</h4>
                        <p>{TemplateConfig.aboutUs}</p>
                    </div>
                </div>
            </div>
            <div className="s-footer__bottom">
                <div className="row">
                    <div className="col-six">
                        <ul className="footer-social">
                           
                        </ul>
                    </div>
                    <div className="col-six">
                        <div className="s-footer__copyright">
                            <span>
                                Copyright (c) 2019 <a href="/">{Config.site}</a>, Template By <a href="https://colorlib.com" target="_blank">Colorlib</a>. Powered By <a href="https://www.sporule.com" target="_blank" rel="nofollow">Sporule</a>.
                            </span>
                        </div>
                    </div>

                </div>
            </div>
            <div className="go-top">
                <a className="smoothscroll" title="Back to Top" href="#top"></a>
            </div>
        </footer>

    );
}


export default FooterTemplate