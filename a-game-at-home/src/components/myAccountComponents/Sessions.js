import React from "react";
import Teams from "../../Teams";
import SessionsFuncs from "../../Sessions";
import User from "../../User";

class Sessions extends React.Component {
  state = {
    user: User.prototype.getUserData(),
    teams: '',
    sessions: ''
  }
  componentDidMount() {
    SessionsFuncs.prototype.getSessionsByUserId(this.state.user.id).then(response => {
    })
  }

  render() {
    return (
      <div>
        sessions
      </div>
    );
  }
}

export default Sessions;
