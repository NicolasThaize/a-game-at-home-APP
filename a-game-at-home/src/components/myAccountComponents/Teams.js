import React from "react";
import TeamsFuncs from "../../Teams";
import SessionsFuncs from "../../Sessions";
import User from "../../User";
import {Link} from "react-router-dom";

class Teams extends React.Component {
  state = {
    user: User.prototype.getUserData(),
    teams: [],
    isModalActive: false,
    teamName: '',
    teamUsers: [],
    teamSessions: []
  }

  /**
   * Get teams infos from user id
   */
  componentDidMount() {
    TeamsFuncs.prototype.getTeamsFromUserId(this.state.user.id).then(response => {
      this.setState({teams: response})
    });
  }

  /**
   * Display / Hide Modal
   */
  triggerModal = () => {
    this.setState({isModalActive: !this.state.isModalActive});
  }

  /**
   * Set session infos into state
   * @param team
   * @returns {Promise<void>}
   */
  getSessionInfos = async(team) => {
    let result = [];
    team.session.map(async sessionId => {
      await SessionsFuncs.prototype.getSessionById(sessionId).then(response => {
        result.push(response.data)
      }).finally(() => {
        this.setState({
          teamSessions: result
        })
      })
    })
    this.setState({
      teamName: team.name,
      teamUsers: team.users
    })
  }

  /**
   * Get session infos and show modal
   * @param team
   * @returns {Promise<void>}
   */
  openSessionModal = async (team) => {
    await this.getSessionInfos(team);
    this.triggerModal();
  }

  /**
   * Get session infos and deletes the user from the session
   * @param team
   * @returns {Promise<void>}
   */
  leaveTeam = async (team) => {
    await this.getSessionInfos(team);
    // Faire une requete post pour supprimer cet user de la team
  }

  render() {
    const { teams, isModalActive, teamName, teamUsers, teamSessions} = this.state;
    return (
      <div className="columns is-multiline m-6">
        {teams.map(team => {
          return (
            <div key={team.id} className="card column is-one-quarter mb-4">
              <div className="card-content p-0">
                <header className="card-header">
                  <p className="card-header-title">
                    {team.name}
                  </p>
                </header>
                <div className="content p-2">
                  <p className="has-text-weight-bold">
                    Nombre de joueurs dans l'équipe:
                    <span className='has-text-weight-normal'> {team.users.length}</span>
                  </p>
                </div>
                <footer className="card-footer">
                  <Link to="/profile/teams" className="card-footer-item p-2" onClick={() => this.openSessionModal(team)}>Plus d'options</Link>
                  <Link to="/profile/teams" className="card-footer-item p-2" onClick={() => this.leaveTeam(team)}>Quitter l'équipe</Link>
                </footer>
              </div>
            </div>
          )
        })}
        <div className={`modal ${isModalActive ? "is-active" : ""}`}>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Equipe {teamName}</p>
            </header>
            <section className="modal-card-body content mb-0">
              <div className='box'>
                <p className="has-text-weight-bold has-text-primary">Joueurs:</p>
                <ul>
                  {teamUsers.map(user => (
                    <li key={user.name}>{user.username}</li>
                  ))}
                </ul>
              </div>
              <div className='box'>
                <p className="has-text-weight-bold has-text-primary">Sessions:</p>
                <ul>
                  {teamSessions.map(session => (
                    <li key={session.id}>{session.name}</li>
                  ))}
                </ul>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-primary">Ajouter un joueur</button>
              <button className="button" onClick={this.triggerModal}>Fermer</button>
            </footer>
          </div>
          <button className="modal-close is-large" aria-label="close" type="button" onClick={this.triggerModal}/>
        </div>
      </div>
    );
  }
}

export default Teams;
