import React from "react";
import { Link } from "gatsby";
import { MarkdownParser, Icon } from "@breathecode/ui-components";
import "../styles/home.css";
import withLocation from "../components/withLocation";
import LanguageSwitcher from "../components/language";
import Iframe from "../components/iframe";
import Layout from "../components/layout";
import usSvg from "../assets/us.svg";
import esSvg from "../assets/es.svg";

const langSvg = {
    'us': usSvg,
    'es': esSvg,
}


class Single extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showVideo: false,
            markdown: props.pageContext.markdown,
            lang: null
        }
    }

    getReadme(_lang=null){
        const { pageContext } = this.props;

        _lang = _lang || this.state.lang || this.props.search.lang || "us";
        const readmeURL = pageContext.readme.indexOf("../") === 0 ?
        "https://projects.breatheco.de/json/?slug="+pageContext.slug+"&lang="+_lang+"&readme&size=big"
        :
        pageContext["readme"+(["us","en"].includes(_lang) ? "" : "-"+_lang)];

        fetch(readmeURL)
            .then(resp => resp.text())
            .then(data => this.setState({ markdown: data, lang: _lang }))
            .catch(err => {
                alert("Error loading the markdon file");
                console.error(err);
            });
    }

    componentDidMount(){
        const { pageContext } = this.props;
        console.log("Context: ", pageContext);

        if(typeof(markdown) !== 'string'){
            this.getReadme();
        }
    }

    render(){
        const { pageContext, search } = this.props;
        console.log(pageContext, 'pageContext');
        const fromIframe = (search.iframe === 'true');
        return(
            <React.Fragment>
            <LanguageSwitcher 
                current={this.state.lang ? this.state.lang : "us"} translations={pageContext.translations} 
                onClick={(lang) => this.getReadme(lang)}
            />
            <div className="fontFamily">
                { this.state.showVideo && <Iframe
                        onLoad={() => window.scrollTo(0,0)}
                        title={`Video tutorial for ${pageContext.title}`}
                        src={`https://assets.breatheco.de/apps/video/?slug=${pageContext.slug}`}
                        height="60vh"
                    />
                }
                <Layout meta={pageContext}>
                    <div className="container fontFamily single-project">
                        <div className="row">
                            <article className="col-12 col-md-6 col-lg-6 col-xl-7 order-2 order-md-1">
                                <MarkdownParser source={this.state.markdown} />
                            </article>
                            <div className="col-12 col-md-6 col-lg- col-xl-5 order-1 order-md-2 mb-3">
                            { !fromIframe &&
                                <div className="row p-1 sticky-top mt-2">
                                    <div className="col text-right">
                                        <Link  className="btn btn-outline-secondary btn-lg d-none d-lg-block " to="/">
                                                Browse all projects
                                        </Link>
                                    </div>
                                </div>
                            }
                                <div className="row p-1 sticky-top mt-2">
                                    <div className="col">
                                        <div className="card w-100">
                                            <div className="card-body text-left">
                                                <h5 className="card-title font-weight-bold lead h4">Goal</h5>
                                                <p className="card-subtitle mb-2 text-muted font-italic mb-3">
                                                {pageContext.description}
                                                </p>
                                                <div className="row border-bottom p-1 m-0 no-gutters small">
                                                    <div className="col-5 ">Difficulty</div>
                                                    <div className="col-7 d-flex justify-content-end">{pageContext.difficulty}</div>
                                                </div>
                                                <div className="row border-bottom p-1 m-0 no-gutters small">
                                                    <div className="col-6 "><span className="colorRed"><Icon type="github"/></span><span className="ml-1">Repository:</span></div>
                                                    <div className="col-6 d-flex justify-content-end ">{pageContext["repository"]? <a target="_blank" href={pageContext["repository"]} rel="noopener noreferrer">Click to open</a>:"Not available"}</div>
                                                </div>
                                                <div className="row border-bottom p-1 m-0 no-gutters small">
                                                    <div className="col-6 "><span className="colorRed"><Icon type="youtube" className="text-danger"/></span><span className="ml-1">Video available:</span></div>
                                                    <div className="col-6 d-flex justify-content-end ">{pageContext["video-id"]?"Available":"Not available"}</div>
                                                </div>
                                                <div className="row border-bottom p-1 m-0 no-gutters small">
                                                    <div className="col-7 "><span ><Icon type="play" className="text-danger font-size" /></span><span className="ml-2">Live demo available:</span></div>
                                                    <div className="col-5 d-flex justify-content-end ">{pageContext["live-url"]?"Available":"Not available"}</div>
                                                </div>
                                                <div className="row border-bottom p-1 m-0 no-gutters small">
                                                    <div className="col-8 "><span><Icon type="clock" /></span><span className="ml-1">Project average duration:</span></div>
                                                    <div className="col-4 d-flex justify-content-end">{pageContext.duration} hr</div>
                                                </div>
                                                <div className="row border-bottom p-1 m-0 no-gutters small">
                                                    <div className="col-5"><span><Icon type="code" /></span><span className="ml-1">Technologies:</span></div>
                                                    <div className="col-7 d-flex justify-content-end ">{pageContext.technology}</div>
                                                </div>
                                                <div className="row p-1 m-0 no-gutters small">
                                                    <div className="col-5"><span>🌎</span><span className="ml-1">Translations:</span></div>
                                                    <div className="col-7 d-flex justify-content-end ">
                                                        <ul className="d-inline">
                                                        {pageContext.translations.map(l => <li><img style={{ height: "15px"}} className="rounded" src={langSvg[l]} /></li>)}
                                                        </ul>
                                                    </div>
                                                </div>
                                                {/* <div className="row p-1 m-0 no-gutters small">
                                                    <div className="col-12 mb-2">Skills: </div>
                                                    <div className="col-12">
                                                        <ul className="list list-unstyled row ml-0">
                                                        {pageContext.talents?pageContext.talents.map((t,i)=>{
                                                                return(
                                                                <li key={i} className="list-item col-6 mb-0">{t.badge}</li>
                                                                );
                                                        }):""}
                                                        </ul>
                                                    </div>
                                                </div> */}

                                                <div className="row text-center">
                                                    {pageContext.demo && 
                                                        <div className="col">
                                                            <a
                                                                href={pageContext.demo}
                                                                className="btn btn-outline-primary btn-md px-4 w-100 ">
                                                                Live Demo
                                                            </a>
                                                        </div>
                                                    }
                                                    {pageContext["video-id"] &&
                                                        <div className="col">
                                                            <button
                                                                onClick={() => {
                                                                    if (pageContext["video-id"].match(/http(s?):\/\/.+/)){
                                                                        window.open(pageContext["video-id"]);
                                                                    }
                                                                    else{
                                                                        this.setState({ showVideo: true });
                                                                    }
                                                                }}
                                                                className="btn btn-outline-success btn-md px-4 w-100 ">
                                                                Watch Video Tutorial
                                                            </button>
                                                        </div>
                                                    }
                                                    {pageContext["repository"] &&
                                                        <div className="col">
                                                            <button
                                                                onClick={() => window.open(pageContext["repository"])}
                                                                className="btn btn-light btn-md px-4 w-100 ">
                                                                <Icon type="github"/> Contribute
                                                            </button>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </Layout>
                </div>
            </React.Fragment>
        );
    }
}
export default withLocation(Single);