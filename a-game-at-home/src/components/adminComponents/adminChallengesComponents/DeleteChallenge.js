import React from "react";
import axiosInstance from "../../../axiosApi";

class DeleteChallenge extends React.Component{
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

  /**
   * Makes a delete request on /challenges/:id
   */
  deleteChallenge = () => {
    axiosInstance.delete(`/challenges/${this.state.challenge.id}/`).then(() => {
      this.props.refreshChallenges();
      this.closeModal();
    }).catch(() => {this.setState({error: 'Erreur lors de la suppression du défi.'})})
  }

  render() {
    const { challenge, error } = this.state;
    return (
      <div className="modal is-active">
        <div className="modal-background"/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title"><strong>Défi:</strong> {challenge.name}</p>
          </header>
          <section className="modal-card-body content mb-0">
            <p>Voulez vous vraiment supprimer ce défi ?</p>
            <p>(Cette action est irréversible)</p>
            {error ? error : undefined}
          </section>
          <footer className="modal-card-foot">
            <button className="button is-danger" onClick={this.deleteChallenge}>Valider</button>
            <button className="button" onClick={this.closeModal}>Fermer</button>
          </footer>
        </div>
        <button className="modal-close is-large" aria-label="close" type="button" onClick={this.closeModal}/>
      </div>
    );
  }
}

export default DeleteChallenge;
