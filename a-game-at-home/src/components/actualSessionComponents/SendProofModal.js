import React from "react";
import axiosInstance from "../../axiosApi";

class SendProofModal extends React.Component{
  state = {
    triggerModal: this.props.triggerModal,
    session: this.props.session,
    team: this.props.team,
    error:'',
    svgUpload: process.env.PUBLIC_URL + "/img/svgUpload.svg",
    challenge: this.props.challenge,
    fileName: "Sélectionnez un fichier",
    formData: ''
  }

  /**
   * Is executed when props changes
   * @param props
   * @param state
   */
  static getDerivedStateFromProps(props, state) {
    state.team = props.team
    return state.session = props.session
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

    this.setState({fileName: files[0].name})

    let extension = files[0].name.split('.');
    extension = "." + extension[extension.length-1]
    extension = extension.toLowerCase();

    if (extension !== ".png" && extension !== ".jpg" && extension !== ".jpeg" && extension !== ".mp4"){
      return this.setState({error: 'Veuillez sélectionner fichier au bon format (.png,.jpg,.jpeg,.mp4'})
    }

    const fileSize = files[0].size * 9.537*Math.pow(10, -7);
    if (fileSize > 10){
      return this.setState({error: 'Veuillez sélectionner fichier de moins de 10 MB'})
    }

    let formData = new FormData();
    if (extension === '.mp4'){
      formData.append("video", files[0]);
    } else{
      formData.append("photo", files[0]);
    }
    this.setState({formData: formData})
  }

  sendProof = () => {
    const formData = this.state.formData;
    axiosInstance.post('/proofs/',formData, {headers: {"Content-Type": "multipart/form-data"}}).then(r => {
      console.log(this.state.team, this.state.session.id, this.state.challenge.id)
      axiosInstance.patch(`/proofs/${r.data.id}/`, {
        challenge: [this.state.challenge.id],
        session: [this.state.session.id],
        team: [this.state.team.id]
      }).then(r => {
        console.log(r)
        this.closeModal()

      })
    });
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
                <input className="file-input" type="file" accept=".png,.jpg,.jpeg,.mp4" onChange={this.handleFileSelected}/>
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
          </section>
          <footer className="modal-card-foot">
            <button className="button is-primary" onClick={this.sendProof}>Envoyer</button>
            <button className="button" onClick={this.closeModal}>Fermer</button>
            {error ? <p className='has-text-weight-bold has-text-danger'>{error}</p> : undefined}
          </footer>
        </div>
        <button className="modal-close is-large" aria-label="close" type="button" onClick={this.closeModal}/>
      </div>
    );
  }
}

export default SendProofModal;
