import React from "react";

class ShowArticle extends React.Component{
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

  render() {
    const {article} = this.state;
    return (
      <div className="modal is-active">
        <div className="modal-background"/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title"><strong>Article:</strong> {article.title}</p>
          </header>
          <section className="modal-card-body content mb-0">
            <p className="mb-2"><strong>Auteur:</strong> {article.author}</p>
            <p className="mb-2"><strong>Description:</strong> {article.text_content}</p>
          </section>
          <footer className="modal-card-foot">
            <button className="button" onClick={this.closeModal}>Fermer</button>
          </footer>
        </div>
        <button className="modal-close is-large" aria-label="close" type="button" onClick={this.closeModal}/>
      </div>
    );
  }
}

export default ShowArticle;
