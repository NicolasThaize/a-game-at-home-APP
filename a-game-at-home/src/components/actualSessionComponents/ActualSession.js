import React from "react";
import SessionsFuncs from "../../Sessions";
import User from "../../User";

class ActualSession extends React.Component{
  state = {
    user: User.prototype.getUserData()
  }


  async componentDidMount() {
    await SessionsFuncs.prototype.getActualSessionByUserId(this.state.user.id).then(r => {
      console.log(r)
    });
  }

  render() {
    return (
      <div>
        Actal session
      </div>
    );
  }
}

export default ActualSession;
