import React from "react";
import ArticlePages from "./ArticlePages";
import "../../assets/css/articles.min.css";
import {Helmet} from "react-helmet-async";

class Articles extends React.Component {
    render() {
        return (
            <div className="Articles section">
                <Helmet>
                    <title>Articles - At Home A Game</title>
                </Helmet>
                <ArticlePages/>
            </div>
        )
    }
}

export default Articles;
