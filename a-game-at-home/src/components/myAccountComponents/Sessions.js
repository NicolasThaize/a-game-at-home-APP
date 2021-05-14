import React from "react";
import SessionsFuncs from "../../Sessions";
import User from "../../User";
import Teams from "../../Teams";
import TeamPoints from "../../TeamPoints";

class Sessions extends React.Component {
  state = {
    user: User.prototype.getUserData(),
    sessionsArray: [],
    sessionPoints: []
  }

  /**
   * Get session infos from user id
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    await SessionsFuncs.prototype.getSessionsByUserId(this.state.user.id).then(response => {
      this.setState({sessionsArray: response})
    })
    let actualSessions = this.state.sessionsArray;
    actualSessions.map(async session => {
      await Teams.prototype.getTeamFromId(session.id).then(response => {
        session.teams.shift()
        session.teams.push(response)
      }).finally(() => {
        this.setState({sessionsArray: actualSessions})
      })
    })


    await this.getSessionPoints();
  }

  /**
   * Get all session points with session id
   * @returns {Promise<void>}
   */
  getSessionPoints = async () => {
    for (let session of this.state.sessionsArray){
      let pointsIds = session.team_point;
      let pointsArray = [];
      for (let pointsId of pointsIds){
        await TeamPoints.prototype.getTeamPointFromId(pointsId).then(r => {
          pointsArray.push(r)
        })
      }
      this.setState({sessionPoints: pointsArray});
    }
  }

  /**
   * Verifies if the point belongs to the team id specified, if yes returns the value
   * @param teamId
   * @returns {string|string|string|SVGPointList|*}
   */
  verifyPoints = (teamId) => {
    for (let point of this.state.sessionPoints){
      if (point.teams[0] === teamId){
        return point.points
      }
    }
    return "";
  }

  render() {
    const { sessionsArray } = this.state;
    return (
      <div className="m-6">
        <div  className="columns has-text-centered is-hidden-mobile">
          <div className="column">
            <p className='has-text-weight-bold'>Nom de la session:</p>
          </div>
          <div className="column">
            <p className='has-text-weight-bold'>Dates de la session:</p>
          </div>
          <div className="column">
            <p className='has-text-weight-bold'>Nom de l'équipe:</p>
          </div>
          <div className="column">
            <p className='has-text-weight-bold'>Score de l'équipe:</p>
          </div>
        </div>
        {sessionsArray.map(session => (
          <div key={session.id} className="columns has-text-centered box">
            <p className='is-hidden-tablet has-text-weight-bold'>Nom de la session:</p>
            <div className="column">
              <p>{session.name}</p>
            </div>
            <p className='is-hidden-tablet has-text-weight-bold'>Dates de la session:</p>
            <div className="column">
              <p >du <i>{session.start_date}</i> au <i>{session.end_date}</i></p>
            </div>
            <p className='is-hidden-tablet has-text-weight-bold'>Nom de l'équipe:</p>
            <div className="column">
              {session.teams.map(team => (
                <p key={session.id}>{team.name}</p>
              ))}
            </div>
            <p className='is-hidden-tablet has-text-weight-bold'>Score de l'équipe:</p>
            <div className="column">
              {session.teams.map(team => {
                const value = this.verifyPoints(team.id);
                return (
                  <p
                    key={session.id}>
                    {value !== "" ? value : "Pas de score"}
                  </p>
                )
              })}
            </div>
          </div>
        ))
        }
      </div>
    );
  }
}

export default Sessions;
