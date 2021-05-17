import React from "react";
import axiosInstance from "../../../axiosApi";
import User from "../../../User";

class CreateArticle extends React.Component{
  state = {
    article: this.props.article,
    triggerModal: this.props.triggerModal,
    error: '',
    inputs: [
      {
        index: 0,
        name: "title",
        label: "Titre de l'article",
        value: '',
        placeholder: "Ex: Titre d'article"
      },
      {
        index: 1,
        name: "text_content",
        label: "Contenu de l'article",
        value: '',
        placeholder: "Ex: Texte de l'article"
      }
    ]
  }

  /**
   * Triggers the modal using parent function (in this component to close it only)
   */
  closeModal = () => {
    this.state.triggerModal();
  }

  /**
   * Handle the change of the inputs
   * @param e
   * @param input
   */
  handleChange = (e, input) => {
    let newInputs = this.state.inputs;
    newInputs[input.index].value = e.target.value
    this.setState({input: newInputs});
  }

  createArticle = () => {
    let result = {};
    for (const input of this.state.inputs){
      result[input.name] = input.value
    }
    result['author'] = User.prototype.getUserData().username
    axiosInstance.post(`/articles/`, result).then(() => {
      this.props.refreshArticles()
      this.closeModal();
    }).catch(() => this.setState({error: "Erreur lors de la création de l'article"}))
  }

  render() {
    const {inputs, error} = this.state;
    return (
      <div>
        <div className="modal is-active">
          <div className="modal-background"/>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title"><strong>Créer un article:</strong></p>
            </header>
            <section className="modal-card-body content mb-0">
              {inputs.map(input => (
                <label className='field label' key={input.label}>
                  {input.label}
                  <input
                    value={input.value}
                    placeholder={input.placeholder}
                    type='text'
                    className='input'
                    onChange={(e) => this.handleChange(e, input)}
                  />
                </label>
              ))}
            </section>
            <footer className="modal-card-foot">
              <button className="button is-primary" onClick={this.createArticle}>Créer</button>
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

export default CreateArticle;
