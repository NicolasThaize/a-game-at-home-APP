import React from "react";

class ShowChallenge extends React.Component{
  state = {
    challenge: this.props.challenge,
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
    const {challenge} = this.state;
    return (
      <div className="modal is-active">
        <div className="modal-background"/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title"><strong>Défi:</strong> {challenge.name}</p>
          </header>
          <section className="modal-card-body content mb-0">
            <p className="mb-2"><strong>Nom:</strong> {challenge.name}</p>
            <p className="mb-2"><strong>Description:</strong> {challenge.description}</p>
            <p className="mb-2"><strong>Nombre de points:</strong> {challenge.points}</p>
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

export default ShowChallenge;
