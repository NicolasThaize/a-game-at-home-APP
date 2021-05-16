import React from "react";
import TeamsFuncs from "../../../Teams";

class ShowSession extends React.Component{
  state = {
    session: this.props.session,
    triggerModal: this.props.triggerModal,
    teams: [],
    points: [],
    error: ''
  }

  async componentDidMount() {
    await TeamsFuncs.prototype.getTeamsFromSessionId(this.state.session.id).then(r => {
      this.setState({teams: r})
    }).catch((e) => this.setState({error: e}));

    let tempPoints = [];
    for (const team of this.state.teams){
      await this.getTeamPoints(team).then(r => {
        tempPoints.push(r)
      })
    }
    this.setState({points: tempPoints});
  }

  /**
   * Triggers the modal using parent function (in this component to close it only)
   */
  closeModal = () => {
    this.state.triggerModal();
  }

  /**
   * Return point and team id of the points
   * @param team
   * @returns {Promise<*>}
   */
  getTeamPoints = async (team) => {
    let result;
    await TeamsFuncs.prototype.getTeamPointsFromTeamPointAndSessionId(team.session_point, this.state.session.id).then(r => {
      result = {points: r.points, teamId: r.teams[0]}
    })
    return result;
  }

  render() {
    const {session,teams, points} = this.state;
    return (
      <div className="modal is-active">
        <div className="modal-background"/>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title"><strong>Session:</strong> {session.name}</p>
          </header>
          <section className="modal-card-body content mb-0">
            <p className="mb-2"><strong>Nom:</strong> {session.name}</p>
            <p className="mb-2"><strong>Description:</strong> {session.description}</p>
            <p className="mb-2"><strong>Date de début:</strong> {session.start_date}</p>
            <p className="mb-2"><strong>Date de fin:</strong> {session.end_date}</p>
            <p className="mb-2"><strong>Equipes présentes:</strong></p>
            <ul>
              {teams.map(team => {
                return (
                  <li key={team.id}>
                    {team.name}
                    : {points.map(point => {
                      if (point.teamId === team.id){
                        return point.points
                      }
                      return undefined;
                    })} points
                  </li>
                )
              })}
            </ul>
          </section>
          <footer className="modal-card-foot">
            <button className="button" onClick={this.closeModal}>Fermer</button>
          </footer>
        </div>
        <button className="modal-close is-large" aria-label="close" type="button" onClick={this.closeModal}/>
      </div>
    );
  }
}

export default ShowSession;
