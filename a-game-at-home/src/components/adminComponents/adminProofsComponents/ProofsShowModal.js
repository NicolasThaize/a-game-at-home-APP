import React from "react";

class ProofsShowModal extends React.Component{
  state = {
    triggerModal: this.props.triggerModal,
    proof: this.props.proof
  }

  closeModal = () => {
    this.state.triggerModal();
  }

  render() {
    const { proof } = this.state;
    return (
      <div className="modal is-active">
        <div className="modal-background"/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Preuve</p>
          </header>
          <section className="modal-card-body">
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
            <button className="button" onClick={this.closeModal}>Fermer</button>
          </footer>
        </div>
      </div>
    );
  }
}

export default ProofsShowModal;
