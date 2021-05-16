import React from "react";
import User from "../../../User";
import TeamsFuncs from "../../../Teams";
import {Link} from "react-router-dom";

class TeamFound extends React.Component {
  state = {
    team: this.props.team,
    users: [],
    displayUsers: [],
    addingError: '',
    isSuccess: false
  }

  async componentDidMount() {
    let values;
    await User.prototype.getAllUsersUsernames().then(r => {
      values = r;
    }).catch(() => this.setState({usersError: "Erreur lors du chargement des utilisateurs"}))
    this.setState({users: values});
  }

  handleChange = (e) => {
    const entry = e.target.value;
    if (entry.length < 4) return this.setState({displayUsers: []});
    const displayArray = this.state.users.filter(array => array.username.includes(entry));
    this.setState({displayUsers: displayArray});
  }

  addPlayer = (id) => {
    TeamsFuncs.prototype.addPlayerToTeam(this.state.team, id).then(() => {
      this.setState({isSuccess: true})
    }).catch(() => {this.setState({addingError: "Erreur lors de l'ajout du joueur."})})
  }

  render() {
    const { displayUsers, isSuccess, addingError } = this.state;
    return(
      <div className="container mt-6 mb-6">
        { isSuccess ?  (
          <div className="notification is-primary">
            Le joueur est désormais autorisé à rejoindre l'équipe.
          </div>) : undefined}
        {addingError ? <p className="has-text-warning has-text-weight-bold">{addingError}</p> : undefined}
        <label className="label control has-icons-left">
          Tapez le pseudonyme de votre ami:
          <input
            className="input"
            type='text'
            placeholder="Ex: Grégoire12"
            onChange={this.handleChange}
          />
        </label>
        <div className='menu'>
          <div className='menu-list'>
            {displayUsers.map(user => (
              <button
                className="button is-fullwidth is-justify-content-flex-start has-background-primary-light"
                key={user.id}
                onClick={() => this.addPlayer(user.id)}
              >
                {user.username}
              </button>)
            )}
          </div>
          <Link to={"/profile/teams"} className="is-link" >Retour aux équipes</Link>
        </div>

      </div>
    )
  }
}

export default TeamFound;
