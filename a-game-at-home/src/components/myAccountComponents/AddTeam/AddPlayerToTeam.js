import React from "react";
import TeamsFuncs from "../../../Teams";
import TeamNotFound from "./TeamNotFound";
import TeamFound from "./TeamFound";
import User from "../../../User";


class AddPlayerToTeam extends React.Component{
  state = {
    user: User.prototype.getUserData(),
    team: '',
    isTeamNotFound: false,
    isAuthorized: false
  }

  async componentDidMount() {
    await TeamsFuncs.prototype.getTeamFromId(this.props.match.params.id).then(r => {
      this.setState({team: r});
    }).catch( () => {
      this.setState({isTeamNotFound: true});
    })

    for (const user of this.state.team.users){
      if (user.id === this.state.user.id){
        this.setState({isAuthorized: true})
      }
    }
  }

  render() {
    const { team, isTeamNotFound, isAuthorized } = this.state;
    return (
      <div>
        { !isTeamNotFound && !isAuthorized ? <TeamNotFound/> : <TeamFound team={team}/> }
      </div>
    )
  }
}

export default AddPlayerToTeam;
