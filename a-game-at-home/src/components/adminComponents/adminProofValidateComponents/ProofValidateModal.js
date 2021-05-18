import React from "react";
import ProofsFuncs from "../../../Proofs";

class ProofValidateModal extends React.Component{
  state = {
    triggerModal: this.props.triggerModal,
    proof: this.props.proof,
    error: ''
  }

  closeModal = () => {
    this.state.triggerModal();
  }

  refuser = () => {
    ProofsFuncs.prototype.failedProofByProofId(this.state.proof.id).then( () => {
      this.closeModal();
    }).catch(e => this.setState({error: e}))
  }

  valider = () => {
    ProofsFuncs.prototype.validateProofByProofId(this.state.proof.id).then( () => {
      this.closeModal();
    }).catch(e => this.setState({error: e}))
  }


  render() {
    const { proof, error } = this.state;
    return (
      <div className="modal is-active">
        <div className="modal-background"/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Preuve</p>
          </header>
          <section className="modal-card-body">
            <p><strong>Nom du défi: </strong>{proof.challenge[0].name}</p>
            <p><strong>Description du défi: </strong>{proof.challenge[0].description}</p>
            <p><strong>Preuve de l'utilisateur: </strong></p>
            { proof.photo !== "http://192.168.0.5:8000/media/proofsPhotos/None/No-photo.jpg" ? <img src={proof.photo} alt="proof"/> : undefined }
            { proof.video !== "http://192.168.0.5:8000/media/proofsVideos/None/No-video.jpg" ? (
              <video controls>
                <source src={proof.video}
                        type="video/mp4" />
                Désolé votre naviguateur ne supporte pas la lecture de vidéos, téléchargez la à l'adresse suivante:
                <a rel='noreferrer' target='_blank' href={proof.video}>ICI</a>
              </video>
            ) : undefined}
          </section>
          <footer className="modal-card-foot">
            <button className="button is-danger" onClick={this.refuser}>Refuser la preuve</button>
            <button className="button is-success" onClick={this.valider}>Valider la preuve</button>
            <button className="button" onClick={this.closeModal}>Fermer</button>
            {error ? <p className='has-text-weight-bold has-text-danger'>{error}</p> : undefined}
          </footer>
        </div>
      </div>
    );
  }
}

export default ProofValidateModal;
