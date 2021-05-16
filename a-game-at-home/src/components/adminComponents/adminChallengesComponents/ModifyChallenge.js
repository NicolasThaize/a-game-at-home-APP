import React from "react";
import axiosInstance from "../../../axiosApi";

class ModifyChallenge extends React.Component{
  state = {
    triggerModal: this.props.triggerModal,
    inputs: [
      {
        index: 0,
        name: "name",
        label: "Nom du défi",
        value: this.props.challenge.name,
        placeholder: "Ex: Défi photo doyen"
      },
      {
        index: 1,
        name: "description",
        label: "Description du défi",
        value: this.props.challenge.description,
        placeholder: "Ex: Description défi doyen"
      },
      {
        index: 2,
        name: "points",
        label: "Nombre de points pour défi réussi",
        value: this.props.challenge.points,
        placeholder: "Ex: 150"
      },
    ],
    error: ''

  }

  /**
   * Triggers the modal using parent function (in this component to close it only)
   */
  closeModal = () => {
    this.state.triggerModal();
  }


  createTheChallenge = () => {
    let result = {};
    for (const input of this.state.inputs){
      result[input.name] = input.value
    }
    axiosInstance.patch(`/challenges/${this.props.challenge.id}/`, result).then(() => {
      this.props.refreshChallenges();
      this.closeModal();
    }).catch(() => {this.setState({error: 'Erreur lors de la modification du défi.'})})
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

  render() {
    const { error, inputs } = this.state;
    return (
      <div className="modal is-active">
        <div className="modal-background"/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title"><strong>Défi:</strong></p>
          </header>
          <section className="modal-card-body content mb-0 ">
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
            {error ? error : undefined}
          </section>
          <footer className="modal-card-foot">
            <button className="button" onClick={this.createTheChallenge}>Créer</button>
            <button className="button" onClick={this.closeModal}>Fermer</button>
          </footer>
        </div>
        <button className="modal-close is-large" aria-label="close" type="button" onClick={this.closeModal}/>
      </div>
    );
  }
}

export default ModifyChallenge;
