import React from "react";
import {Link} from "react-router-dom";

class NavbarAdmin extends React.Component{
  render() {
    return(
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons is-centered">
            <Link to="/" className="button is-primary">
              <strong>test</strong>
            </Link>
            <Link to="/" className="button is-light">
              test
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default NavbarAdmin;
