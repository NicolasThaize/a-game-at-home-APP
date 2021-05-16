import React from 'react';
import {Redirect} from "react-router";
import axiosInstance from "../../../axiosApi";
import User from "../../../User";

class CreateTeam extends React.Component{
  state = {
    user: User.prototype.getUserData(),
    inputs: [
      {
        id: 0,
        name: "name",
        placeholder: "Ex: GegTeam",
        label: "Nom de l'équipe"
      },
    ],
    teamName: '',
    redirect: false,
    error: ''
  }

  /**
   * Handle the changes if input
   * @param e
   */
  handleChange = (e) => {
    this.setState({teamName: e.target.value})
  }

  goHome = () => {
    this.setState({redirect: true})
  }

  createTeam = async () => {
    let values = {
      name: this.state.teamName,
      users: [this.state.user.id],
      session: [],
      session_point: [],
      authorized_user: []
    }
    await axiosInstance.post('/teams/', values).then(() => {
      this.setState({redirect: true})
    }).catch(() => this.setState({error: "Erreur lors de la création de l'équipe"}))
  }


  render() {
    const { inputs, teamName, redirect, error } = this.state;
    return (
      <div className="section">
        {redirect ? <Redirect to="/profile/teams"/> : undefined}
        <h2 className='title is-2'>Créer une équipe</h2>
        <div className="container">
          {inputs.map(input => (
            <label className="label field" key={input.id}>
              {input.label}
              <input
                placeholder={input.placeholder}
                name={input.name}
                className="input"
                type="text"
                onChange={this.handleChange}
                value={teamName}
              />
            </label>
          ))}
          <div className="buttons">
            <button type="button" className="button is-primary" onClick={this.createTeam}>Créer l'équipe</button>
            <button type="button" className="button" onClick={this.goHome}>Annuler</button>
          </div>
          {error ? <p className="has-text-weight-bold has-text-danger">{error}</p> : undefined}
        </div>
      </div>
    );
  }
}

export default CreateTeam;
