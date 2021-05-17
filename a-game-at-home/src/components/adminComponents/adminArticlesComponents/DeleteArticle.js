import React from "react";
import axiosInstance from "../../../axiosApi";

class DeleteArticle extends React.Component{
  state = {
    article: this.props.article,
    triggerModal: this.props.triggerModal,
    error: ''
  }

  /**
   * Triggers the modal using parent function (in this component to close it only)
   */
  closeModal = () => {
    this.state.triggerModal();
  }

  deleteArticle = async () => {
    axiosInstance.delete(`/articles/${this.state.article.id}/`).then(() => {
      this.props.refreshArticles()
      this.closeModal()
    }).catch(() => this.setState({error: "Erreur lors de la suppression de l'article"}))
  }

  render() {
    const {article, error} = this.state;
    return (
      <div>
        <div className="modal is-active">
          <div className="modal-background"/>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title"><strong>Supprimer un article</strong></p>
            </header>
            <section className="modal-card-body content mb-0">
              <p className="mb-2">Supprimer l'article:  {article.title} ? </p>
              <p>(Cette action est irréversible)</p>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-danger" onClick={this.deleteArticle}>Supprimer</button>
              <button className="button" onClick={this.closeModal}>Fermer</button>
            </footer>
          </div>
          <button className="modal-close is-large" aria-label="close" type="button" onClick={this.closeModal}/>
          {error ? <p className='has-text-weight-bold has-text-danger'>{error}</p> : undefined}
        </div>
      </div>
    );
  }
}

export default DeleteArticle;
