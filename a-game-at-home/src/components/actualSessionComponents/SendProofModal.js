import React from "react";

class SendProofModal extends React.Component{
  state = {
    triggerModal: this.props.triggerModal,
    error:'',
    svgUpload: process.env.PUBLIC_URL + "/img/svgUpload.svg",
    challenge: this.props.challenge,
    fileName: "Sélectionnez un fichier"
  }

  /**
   * Triggers the modal using parent function (in this component to close it only)
   */
  closeModal = () => {
    this.state.triggerModal();
  }

  handleFileSelected = (e) => {
    const files = Array.from(e.target.files)
    if(files.length > 1){
      return this.setState({error: 'Veuillez sélectionner un seul fichier'})
    }
    const formData = new FormData();
    formData.append(
      files[0].name,
      files[0],
      files[0].name
    );

    console.log(formData)
    this.setState({fileName: files[0].name})
    console.log("files:", files)
}

  render() {
    const { error, svgUpload, challenge, fileName } = this.state;
    return (
      <div className="modal is-active">
        <div className="modal-background"/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p>Envoyer une preuve</p>
          </header>
          <section className="modal-card-body content mb-0 columns is-vcentered">
            <div className='column'>
              Sélectionnez la preuve au défi: {challenge.name}
            </div>
            <div className="file has-name is-boxed column">
              <label className="file-label">
                <input className="file-input" type="file" name="resume" onChange={this.handleFileSelected}/>
              <span className="file-cta">
                <span className="file-icon">
                  <img src={svgUpload} alt='svg upload' />
                </span>
                <span className="file-label">
                  Sélectionnez un fichier
                </span>
              </span>
              <span className="file-name">{fileName}</span>
              </label>
            </div>
            {error ? error : undefined}
          </section>
          <footer className="modal-card-foot">
            <button className="button is-primary" onClick={this.saveChanges}>Envoyer</button>
            <button className="button" onClick={this.closeModal}>Fermer</button>
          </footer>
        </div>
        <button className="modal-close is-large" aria-label="close" type="button" onClick={this.closeModal}/>
      </div>
    );
  }
}

export default SendProofModal;
