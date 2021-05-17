import React from "react";
import axiosInstance from "../../../axiosApi";
import ShowArticle from "./ShowArticle";
import ModifyArticle from "./ModifyArticle";
import DeleteArticle from "./DeleteArticle";
import CreateArticle from "./CreateArticle";

class AdminArticle extends React.Component{
  state = {
    articles: [],
    selectedArticle: '',
    isModifyActive: false,
    isShowActive: false,
    isCreateActive: false,
    isDeleteActive: false,
  }

  async componentDidMount() {
    await axiosInstance.get('/articles').then(r=> {
      this.setState({articles: r.data})
    })
  }

  refreshArticles = async () =>{
    await axiosInstance.get('/articles').then(r=> {
      this.setState({articles: r.data})
    })
  }

  showArticle = (article) => {
    this.triggerShowModal(article);
  }
  triggerShowModal = (article) => {
    this.setState({isShowActive: !this.state.isShowActive, selectedArticle: article})
  }

  modifyArticle = (article) => {
    this.triggerModifyModal(article);
  }
  triggerModifyModal = (article) => {
    this.setState({isModifyActive: !this.state.isModifyActive, selectedArticle: article})
  }

  deleteArticle = (article) => {
    this.triggerDeleteModal(article);
  }
  triggerDeleteModal = (article) => {
    this.setState({isDeleteActive: !this.state.isDeleteActive, selectedArticle: article})
  }

  createArticle = () => {
    this.triggerCreateModal();
  }
  triggerCreateModal = () => {
    this.setState({isCreateActive: !this.state.isCreateActive})
  }


  render() {
    const {articles, selectedArticle, isModifyActive, isShowActive, isDeleteActive, isCreateActive} = this.state;
    return (
      <div>
        <button className='button is-primary' onClick={this.createArticle}>Créer un article</button>
        {articles.map(article => {
          return (
            <div className="columns mb-3 mt-3 sessionsContainer is-align-items-center" key={article.id}>
              <div className="column">
                <p>#{article.id} by {article.author}</p>
              </div>
              <div className="column">
                <p>{article.title}</p>
              </div>
              <div className="column">
                <button className='button' onClick={() => this.showArticle(article)}>Voir</button>
                <button className='button is-warning' onClick={() => this.modifyArticle(article)}>Modifier</button>
                <button className='button is-danger' onClick={() => this.deleteArticle(article)}>Supprimer</button>
              </div>
            </div>
          )
        })}
        {isShowActive ?
          <ShowArticle
            article={selectedArticle}
            triggerModal={this.triggerShowModal}
          />
          : undefined}
        {isModifyActive ?
          <ModifyArticle
            article={selectedArticle}
            triggerModal={this.triggerModifyModal}
            refreshArticles={this.refreshArticles}
          />
          : undefined}
        {isDeleteActive ?
          <DeleteArticle
            article={selectedArticle}
            triggerModal={this.triggerDeleteModal}
            refreshArticles={this.refreshArticles}
          />
          : undefined}
        {isCreateActive ?
          <CreateArticle
            triggerModal={this.triggerCreateModal}
            refreshArticles={this.refreshArticles}
          />
          : undefined}
      </div>
    );
  }
}

export default AdminArticle;
