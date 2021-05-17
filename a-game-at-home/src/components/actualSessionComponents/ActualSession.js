import React from "react";
import SessionsFuncs from "../../Sessions";
import User from "../../User";
import AvailableChallenges from "./AvailableChallenges";
import TeamsFuncs from "../../Teams";
import ProofsFuncs from "../../Proofs";
import ProofsState from "./ProofsState";
import ChallengesFuncs from "../../Challenges";

class ActualSession extends React.Component{
  state = {
    user: User.prototype.getUserData(),
    team: '',
    session: '',
    proofs: [],
    error: "",
    notFinishedChallenges: []
  }


  async componentDidMount() {
    await SessionsFuncs.prototype.getActualSessionByUserId(this.state.user.id).then(r => {
      this.setState({session: r})
    }).catch(e => this.setState({error: e}));

    let teams = [];
    await TeamsFuncs.prototype.getTeamsFromSessionId(this.state.session.id).then(r => {
      teams = r;
    })

    for (const team of teams){
      for (const user of team.users){
        if (this.state.user.id === user.id){
          this.setState({team: team})
          break;
        }
      }
    }

    await ProofsFuncs.prototype.getProofsFromSessionAndTeam(this.state.session.id, this.state.team).then(r => {
      this.setState({proofs: r})
    })

    await ChallengesFuncs.prototype.getNotCompletedChallenges(this.state.session.id, this.state.proofs).then(r => {
      this.setState({notFinishedChallenges: r})
    }
    )
  }


  render() {
    const { session, error, proofs, notFinishedChallenges, team } = this.state;
    return (
      <div className="section">
        <h2 className='title is-2'>Session: {session.name}</h2>
        <div className="columns">
          <div className='column'><ProofsState proofs={proofs}/></div>
          <div className='column'><AvailableChallenges challenges={notFinishedChallenges} session={session} team={team}/></div>
        </div>
        {error ? <p className='has-text-weight-bold has-text-danger'>{error}</p> : undefined}
      </div>
    );
  }
}

export default ActualSession;
