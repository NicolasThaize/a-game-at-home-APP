import React from "react";
import axiosInstance from "../../../axiosApi";
import ChallengesFuncs from "../../../Challenges";

class CreateSession extends React.Component{
  state = {
    triggerModal: this.props.triggerModal,
    challenges: [],
    inputs: [
      {
        index: 0,
        name: "name",
        label: "Nom de la session",
        value: "",
        placeholder: "Ex: Session Juin 2021"
      },
      {
        index: 1,
        name: "description",
        label: "Description de la session",
        value: "",
        placeholder: "Ex: Description Juin 2021"
      },
      {
        index: 2,
        name: "start_date",
        label: "Date de début de la session",
        value: "",
        placeholder: "Ex: 24-05-2021"
      },
      {
        index: 3,
        name: "end_date",
        label: "Date de fin de la session",
        value: "",
        placeholder: "Ex: 23-06-2021"
      },
    ],
    selectedChallenges: [],
    error: ''
  }

  async componentDidMount() {
    // Get all challenges
    await ChallengesFuncs.prototype.getAllChallenges().then(r => {
      this.setState({challenges: r});
    }).catch((e) => this.setState({error: e}));
  }

  /**
   * Triggers the modal using parent function (in this component to close it only)
   */
  closeModal = () => {
    this.state.triggerModal();
  }

  /**
   * Makes a post request on /sessions/ with data
   */
  createTheSession = () => {
    let result = {};
    for (const input of this.state.inputs){
      result[input.name] = input.value
    }
    result['teams'] = [];
    result['team_point'] = [];
    result['challenges'] = this.state.selectedChallenges;
    axiosInstance.post(`/sessions/`, result).then(() => {
      this.props.refreshSessions();
      this.closeModal();
    }).catch(() => {this.setState({error: 'Erreur lors de la création de la session.'})})
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
    const { error, inputs, challenges } = this.state;
    return (
      <div className="modal is-active">
        <div className="modal-background"/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title"><strong>Session:</strong></p>
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
            <select multiple="multiple" name="challenges" id="challenges" onChange={this.handleSelectChange}>
              {challenges.map(challenge => (
                <option
                  key={challenge.id}
                  value={challenge.id}
                >
                  {challenge.id}: {challenge.name}
                </option>
              ))}
            </select>
            {error ? error : undefined}
          </section>
          <footer className="modal-card-foot">
            <button className="button" onClick={(e) => this.createTheSession(e)}>Créer</button>
            <button className="button" onClick={this.closeModal}>Fermer</button>
          </footer>
        </div>
        <button className="modal-close is-large" aria-label="close" type="button" onClick={this.closeModal}/>
      </div>
    );
  }
}

export default CreateSession;
