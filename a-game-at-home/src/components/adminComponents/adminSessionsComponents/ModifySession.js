import React from "react";
import axiosInstance from "../../../axiosApi";
import ChallengesFuncs from "../../../Challenges";

class ModifySession extends React.Component{
  state = {
    session: this.props.session,
    selectedChallenges: [],
    challenges: [],
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
  async componentDidMount() {
    let values = this.state.inputs;
    // Put dates in the good format
    values[2].value = this.formatDate(values[2].value)
    values[3].value = this.formatDate(values[3].value)
    this.setState({inputs: values})

    // Get challenges that are apart of the session
    await ChallengesFuncs.prototype.getChallengesFromSessionId(this.state.session.id).then(r => {
      let ids = [];
      for (const challenge of r){
        ids.push(challenge.id)
      }
      this.setState({selectedChallenges: ids});
    }).catch((e) => this.setState({error: e}));

    // Get all challenges
    await ChallengesFuncs.prototype.getAllChallenges().then(r => {
      this.setState({challenges: r});
    }).catch((e) => this.setState({error: e}));
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
   * Once a option is selected or not add or remove the value from selectedChallenges array
   * @param e
   */
  handleSelectChange = (e) => {
    let selected = [];
    for (const option of e.target.options)
    {
      if (option.selected) {
        selected.push(parseInt(option.value));
      }
    }
    this.setState({selectedChallenges: selected})
  }

  /**
   * Makes a patch request on /sessions/:id/ with the new values
   */
  saveChanges = () => {
    let result = {};
    for (const input of this.state.inputs){
      result[input.name] = input.value
    }
    result['challenges'] = this.state.selectedChallenges;
    axiosInstance.patch(`/sessions/${this.state.session.id}/`, result).then(() => {
      this.props.refreshSessions();
      this.setState({selectedChallenges: [], challenges: []})
      this.closeModal();
    }).catch(() => {this.setState({error: 'Erreur lors de la modification de la session.'})})
  }

  render() {
    const { session, inputs, error, challenges, selectedChallenges } = this.state;
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
            <div className="select is-multiple">
              <select multiple="multiple" name="challenges" id="challenges" onChange={this.handleSelectChange}>
                {challenges.map(challenge => {
                  const isSelected = !!selectedChallenges.find(element => element === challenge.id)
                  return (<option
                    key={challenge.id}
                    value={challenge.id}
                    selected={isSelected ? "selected" : undefined}
                  >
                    {challenge.id}: {challenge.name}
                  </option>)
                })}
              </select>
            </div>
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
