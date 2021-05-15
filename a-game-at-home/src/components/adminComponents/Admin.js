import React from "react";
import Sessions from "./Sessions";
import Challenges from "./Challenges";
import Proofs from "./Proofs";
import NotValidatedProofs from "./NotValidatedProofs";
import {Link} from "react-router-dom";

class Admin extends React.Component{
  state = {
    currentActive: ''
  }

  /**
   * Get path after component get mounted
   */
  componentDidMount() {
    this.getUrlPath();
  }

  /**
   * Get the last word of url (in 'localhost/login' returns 'login') and set it to currentActive
   */
  getUrlPath = () => {
    let n = window.location.href.split("/");
    n = n[n.length - 1].toLowerCase();
    this.setState({
      currentActive: n === "/profile" ? "/" : n
    })
  }

  render() {
    const { currentActive } = this.state;
    return (
      <div className="columns mt-6 mb-6 ml-3 mr-3">
        <aside className="menu column is-one-fifth">
          <p className="menu-label">
            Menu de gestion du site
          </p>
          <ul className="menu-list">
            <li>
              <Link
                to='/admin/sessions'
                className={currentActive === "sessions" ? "is-active" : undefined}
              >
                Sessions
              </Link>
            </li>
            <li>
              <Link
                to='/admin/challenges'
                className={currentActive === "challenges" ? "is-active" : undefined}
              >
                Défis
              </Link>
            </li>
            <li>
              <Link
              to='/admin/proofs'
              className={currentActive === "proofs" ? "is-active" : undefined}
            >
              Preuves
            </Link>
            </li>
          </ul>
          <p className="menu-label">
            Gestion des preuves
          </p>
          <ul className="menu-list">
            <li>
              <Link
                to='/admin/notValidated'
                className={currentActive === "notvalidated" ? "is-active" : undefined}
              >
                Preuves pas encore évaluées
              </Link>
            </li>
          </ul>
        </aside>
        <div className="column">
          {currentActive === "sessions" ? <Sessions/> : undefined}
          {currentActive === "challenges" ? <Challenges/> : undefined}
          {currentActive === "proofs" ? <Proofs/> : undefined}
          {currentActive === "notvalidated" ? <NotValidatedProofs/> : undefined}
        </div>
      </div>
    );
  }
}

export default Admin;