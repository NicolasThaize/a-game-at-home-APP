import React from "react";
import axiosApi from "../../axiosApi";
import "../../assets/css/articlepages.min.css";

class ArticlePages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            currentPage: 1,
            articlesPerPage: 5,
            active: 1,
            error: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    componentDidMount() {
        axiosApi.get('/articles/').then(response => {
            this.setState({articles: response.data})
        }).catch(() => this.setState({error: 'Error while getting articles.'}))
    }

    toggleClass(number) {
        this.setState({active: number});
    };

    onClick(event, number) {
        this.handleClick(event);
        this.toggleClass(number);
    }

    render() {

        const {articles, currentPage, articlesPerPage} = this.state;

        // Logic for displaying articles
        const indexOfLastArticle = currentPage * articlesPerPage;
        const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
        const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

        let renderArticles = [];
        for (let article of currentArticles) {
            renderArticles.push(
                <article key={article.id} className="media">
                    <figure className="media-left">
                        <p className="image is-64x64">
                            <img src="https://bulma.io/images/placeholders/128x128.png" alt="placeholder"/>
                        </p>
                    </figure>
                    <div className="media-content">
                        <div className="content">
                            <strong>{article.author}</strong> <small className="nametag">@{article.author}</small>
                            <small className="timecode">31m</small>
                            <br/>
                            <p className="title is-4"><i>{article.title}</i></p>
                            {article.textContent}
                            <br/>
                            <a href="https://bulma.io/">Like</a> - <a href="https://bulma.io/">Share</a>
                        </div>
                    </div>
                </article>
            );
        }
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(articles.length / articlesPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <button key={number}
                        className={this.state.active === number ? 'pageSwitcherButton has-background-primary' : 'pageSwitcherButton'}
                        id={number}
                        onClick={(event) => this.onClick(event, number)}>
                    {number}
                </button>
            );
        });

        let display = renderArticles.length;

        return (
            <div className="ArticlePages">
                <h1> Articles </h1>
                {display === 0 ? <p>Aucun article encore disponible</p> : renderArticles}

                {display === 0 ? undefined :
                  <div className="pageSwitcher">
                    {renderPageNumbers}
                </div>
                }
                {this.state.error ? <p className='has-text-weight-bold has-text-danger'>{this.state.error}</p> : undefined}
            </div>
        )
    }
}

export default ArticlePages;
