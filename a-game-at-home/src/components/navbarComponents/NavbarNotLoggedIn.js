import React from "react";
import {Link} from "react-router-dom";

class NavbarLoggedIn extends React.Component {

  render() {
    return(
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons is-centered">
            <Link to="/" className="button is-primary">
              <strong>Créer un compte</strong>
            </Link>
            <Link to="/" className="button is-light">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default NavbarLoggedIn;
