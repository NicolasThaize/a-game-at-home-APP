import React from "react";
import {Link} from "react-router-dom";

class Contact extends React.Component{
  state = {
    inputs: [
      {
        id: 0,
        placeholder: 'Prénom',
        label: 'Grégoire',
        name: 'first_name',
        value: ''
      },
      {
        id: 1,
        placeholder: 'Marlo',
        label: 'Nom de famille',
        name: 'last_name',
        value: ''
      },
      {
        id: 2,
        placeholder: 'greg.marlo@gmail.com ',
        label: 'Adresse email',
        name: 'email',
        value: ''
      },
    ],
    message: ''
  }

  /**
   * Handle the change of the inputs
   * @param e
   * @param input
   */
  handleChange = (e, input) => {
    let newInputs = this.state.inputs;
    newInputs[input.id].value = e.target.value
    this.setState({input: newInputs});
  }

  sendMessage = () => {
    let result = {};
    for (const input of this.state.inputs){
      result[input.name] = input.value
    }
    result['message'] = this.state.message;
    // Envoyer le message via nodemailer
  }

  handleMessageChange = (e) => {
    this.setState({message: e.target.value})
  }

  render() {
    const { inputs, message } = this.state;
    return (
      <div className='container section'>
        {inputs.map(input => (
          <div className="field" key={input.id}>
            <label className="label">
              {input.label}
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder={input.placeholder}
                  name={input.name}
                  value={input.value}
                  onChange={(e) => this.handleChange(e, input)}
                />
              </div>
            </label>
          </div>
        ))}
        <div className="field">
          <label className="label">Message</label>
          <div className="control">
            <textarea className="textarea" placeholder="Bonjour..." value={message} onChange={this.handleMessageChange}/>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" onClick={this.sendMessage}>Envoyer</button>
          </div>
          <div className="control">
            <Link to="/"><button className="button is-link is-light">Annuler</button></Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
