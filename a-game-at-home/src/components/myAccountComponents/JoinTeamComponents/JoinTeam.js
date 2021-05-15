import React from "react";
import User from "../../../User";
import {Link} from "react-router-dom";

class JoinTeam extends React.Component{
  state = {
    user: User.prototype.getUserData(),
    teams: [],
  }

  componentDidMount() {
    User.prototype.getJoinableTeamsByUserId(this.state.user.id).then(r => {
      this.setState({teams: r})
    })
  }

  joinTeam = async (team) => {
    await User.prototype.addUserToTeamByUserId(this.state.user.id, team);
    User.prototype.getJoinableTeamsByUserId(this.state.user.id).then(r => {
      this.setState({teams: r})
    })
  }

  render() {
    const { teams } = this.state;
    return(
      <div className="mt-6 mb-6 section">
        <h3 className="title is-3">Vous avez été invité à rejoindre les équipes suivantes:</h3>
        {teams.length === 0 ? <p>Vous n'avez aucune invitation</p> : undefined}
        <div className="columns is-multiline m-3">
          {teams.map(team => {
            return (
              <div key={team.id} className="card column is-one-quarter mb-4">
                <div className="card-content p-0">
                  <header className="card-header">
                    <p className="card-header-title">
                      Nom de l'équipe: {team.name}
                    </p>
                  </header>
                  <div className="content p-2">
                    <p className="has-text-weight-bold">
                      Nombre de joueurs dans l'équipe:
                      <span className='has-text-weight-normal'> {team.users.length}</span>
                    </p>
                  </div>
                  <footer className="card-footer">
                    <Link
                      to="/profile/join/team"
                      className="card-footer-item p-2"
                      onClick={() => this.joinTeam(team)}
                    >
                      Rejoindre cette équipe
                    </Link>
                  </footer>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default JoinTeam;
