import React from "react";
import ArticlePages from "./ArticlePages";
import "../../assets/css/articles.min.css";

class Articles extends React.Component {
    render() {
        return (
            <div className="Articles section">
                <ArticlePages/>
            </div>
        )
    }
}

export default Articles;
