import React from "react";
import axiosInstance from "../../../axiosApi";

class ModifySession extends React.Component{
  state = {
    session: this.props.session,
    inputs: [
      {
        index: 0,
        name: "name",
        label: "Nom de la session",
        value: this.props.session.name
      },
      {
        index: 1,
        name: "description",
        label: "Description de la session",
        value: this.props.session.description
      },
      {
        index: 2,
        name: "start_date",
        label: "Date de début de la session",
        value: this.props.session.start_date
      },
      {
        index: 3,
        name: "end_date",
        label: "Date de fin de la session",
        value: this.props.session.end_date
      },
    ],
    triggerModal: this.props.triggerModal,
    error: ''
  }


  componentDidMount() {
    let values = this.state.inputs;
    // Put dates in the good format
    values[2].value = this.formatDate(values[2].value)
    values[3].value = this.formatDate(values[3].value)
    this.setState({inputs: values})
  }

  /**
   * From yyyy-mm-dd to dd-mm-yyyy
   * @param date
   * @returns {string}
   */
  formatDate = (date) => {
    let result;
    result = date.split("-");
    return `${result[2]}-${result[1]}-${result[0]}`
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

  /**
   * Makes a patch request on /sessions/:id/ with the new values
   */
  saveChanges = () => {
    let result = {};
    for (const input of this.state.inputs){
      result[input.name] = input.value
    }
    axiosInstance.patch(`/sessions/${this.state.session.id}/`, result).then(() => {
      this.props.refreshSessions();
      this.closeModal();
    }).catch(() => {this.setState({error: 'Erreur lors de la modification de la session.'})})
  }

  render() {
    const { session, inputs, error } = this.state;
    return (
      <div className="modal is-active">
        <div className="modal-background"/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title"><strong>Session:</strong> {session.name}</p>
          </header>
          <section className="modal-card-body content mb-0 ">
            {inputs.map(input => (
              <label className='field label' key={input.label}>
                {input.label}
                <input
                  value={input.value}
                  type='text'
                  className='input'
                  onChange={(e) => this.handleChange(e, input)}
                />
              </label>
            ))}
            {error ? error : undefined}
          </section>
          <footer className="modal-card-foot">
            <button className="button" onClick={this.saveChanges}>Enregistrer</button>
            <button className="button" onClick={this.closeModal}>Fermer</button>
          </footer>
        </div>
        <button className="modal-close is-large" aria-label="close" type="button" onClick={this.closeModal}/>
      </div>
    );
  }
}

export default ModifySession;
