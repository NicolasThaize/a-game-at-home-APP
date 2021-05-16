import React from "react";
import axiosInstance from "../../../axiosApi";

class DeleteSession extends React.Component{
  state = {
    session: this.props.session,
    triggerModal: this.props.triggerModal,
    error: ''
  }

  /**
   * Makes a delete request on /sessions/:id
   */
  deleteSession = () => {
    axiosInstance.delete(`/sessions/${this.state.session.id}/`).then(() => {
      this.props.refreshSessions();
      this.closeModal();
    }).catch(() => {this.setState({error: 'Erreur lors de la suppression de la session.'})})
  }

  /**
   * Triggers the modal using parent function (in this component to close it only)
   */
  closeModal = () => {
    this.state.triggerModal();
  }

  render() {
    const { session, error } = this.state;
    return (
      <div className="modal is-active">
        <div className="modal-background"/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title"><strong>Session:</strong> {session.name}</p>
          </header>
          <section className="modal-card-body content mb-0">
            <p>Voulez vous vraiment supprimer cette session ?</p>
            <p>(Cette action est irréversible)</p>
            {error ? error : undefined}
          </section>
          <footer className="modal-card-foot">
            <button className="button is-danger" onClick={this.deleteSession}>Valider</button>
            <button className="button" onClick={this.closeModal}>Fermer</button>
          </footer>
        </div>
        <button className="modal-close is-large" aria-label="close" type="button" onClick={this.closeModal}/>
      </div>
    );
  }
}

export default DeleteSession;
