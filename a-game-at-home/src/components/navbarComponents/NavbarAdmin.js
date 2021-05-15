import React from "react";
import {Link} from "react-router-dom";

class NavbarAdmin extends React.Component{
  render() {
    return(
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons is-centered">
            <Link to="/admin/sessions" className="button is-primary">
              <strong>Panel admin</strong>
            </Link>
            <Link to="/profile" className="button">
              Mon compte
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default NavbarAdmin;
