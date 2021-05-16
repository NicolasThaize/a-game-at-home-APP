import React from "react";
import {Link} from "react-router-dom";

class NavbarLoggedIn extends React.Component {
  state = {
    isInSession: true
  }

  render() {
    const { isInSession } = this.state;
    return(
      <div className="navbar-end is-centered">
        <Link to="/Profile" className="navbar-item">
          Mon compte
        </Link>

        <Link to="/join/session" className="navbar-item">
          Participer à une session
        </Link>

        {isInSession &&
          <Link to="/session/actual" className="navbar-item">
            Session en cours
          </Link>
        }
      </div>
    )
  }
}

export default NavbarLoggedIn;
