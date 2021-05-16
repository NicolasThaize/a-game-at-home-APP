import React from "react";
import SessionsFuncs from "../../Sessions";
import TeamsFuncs from "../../Teams";
import User from "../../User";
import {Redirect} from "react-router";

class JoinSession extends React.Component{
  state = {
    error: '',
    availableSessions: [],
    teams: [],
    selectedTeam: "",
    selectedSession: "",
    selectedSessionName: "",
    redirect: false
  }

  async componentDidMount() {
    await SessionsFuncs.prototype.getSessionsNotStartedYet().then(r => {
      this.setState({availableSessions: r})
    }).catch(e => this.setState({error: e}));

    await TeamsFuncs.prototype.getTeamsFromUserId(User.prototype.getUserData().id).then(r=> {
      this.setState({teams: r}, () => {
        // If there is only one team sets the selected team automatically to it
        if (this.state.teams.length === 1 ){
          this.state.selectedTeam = this.state.teams[0].id
        }
      });
    }).catch(e => this.setState({error: e}))
  }

  /**
   * On select of a option set selected team to this value
   * @param e
   */
  handleSelect = (e) => {
    this.setState({selectedTeam: e.target.value});
  }

  /**
   * On click of a session button set selected session to this value
   * @param session
   */
  handleClickSession = (session) => {
    this.setState({selectedSession: session.id, selectedSessionName: session.name})
  }

  validateEntries = () => {
    if (this.state.selectedSession && this.state.selectedTeam){
      this.setState({redirect: true})
    } else {
      this.setState({error: "Veuillez séléctionner une équipe et une session."})
    }
  }


  render() {
    const { error, availableSessions, teams, selectedSessionName, redirect, selectedSession, selectedTeam} = this.state;
    return (
      <div className="section">
        {redirect ? <Redirect
          to={{
            pathname: "/join/session/validation",
            state: { sessionId: selectedSession, teamId: selectedTeam }
          }}
        /> : undefined}
        <h2 className="title is-2">Rejoindre une session</h2>
        <div className="columns section">
          <div className="columns">
            <div className="column is-one-quarter has-text-centered">
              <h3 className="title is-3">Sélectionnez l'équipe qui rejoindra la session</h3>
              <div className="select">
                <select onChange={this.handleSelect}>
                  {teams.map(team => {
                    return(
                      <option key={team.id} value={team.id}>{team.name}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className="column has-text-centered">
              <h3 className="title is-3">Sélectionnez une session à rejoindre
                {selectedSessionName ?
                  <p className="has-text-weight-normal is-size-7">
                  Session séléctionnée: {selectedSessionName}
                  </p>
                  : undefined}
              </h3>
              <div className="columns is-justify-content-center">
                {availableSessions.length === 0  ? <p>Aucune session à venir.</p> : undefined}

                {availableSessions.map(session => {
                  return (
                    <div key={session.id} className="card column is-multiline is-one-quarter ml-2 mr-2">
                      <div className="card-content">
                        <p><strong>Nom de la session:</strong></p>
                        <p>{session.name}</p>
                        <p><strong>Description de la session:</strong></p>
                        <p>{session.description}</p>
                        <p><strong>Dates de la session:</strong></p>
                        <p>Du {session.start_date} au {session.end_date}</p>
                      </div>
                      <button className="button has-text-primary" onClick={() => this.handleClickSession(session)}>
                        Selectionner cette session
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        {error ? <p className='has-text-danger has-text-weight-bold'>{error}</p> : undefined}
        <button className="button is-primary mt-5" onClick={this.validateEntries}>Valider les selections</button>
      </div>
    );
  }
}

export default JoinSession;
