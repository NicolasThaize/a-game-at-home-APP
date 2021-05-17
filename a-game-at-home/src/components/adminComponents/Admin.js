import React from "react";
import Sessions from "./adminSessionsComponents/Sessions";
import Challenges from "./adminChallengesComponents/Challenges";
import Proofs from "./adminProofsComponents/Proofs";
import NotValidatedProofs from "./adminProofValidateComponents/NotValidatedProofs";
import {Link} from "react-router-dom";
import '../../assets/css/adminSessions.min.css'
import AdminArticle from "./adminArticlesComponents/AdminArticle";
import {Helmet} from "react-helmet-async";

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
        <Helmet>
          <title>Panel admin - At Home A Game</title>
        </Helmet>
        <aside className="menu column is-one-fifth">
          <p className="menu-label">
            Menu de gestion du site
          </p>
          <ul className="menu-list">
            <li>
              <Link
                to='/admin/articles'
                className={currentActive === "articles" ? "is-active" : undefined}
              >
                Articles
              </Link>
            </li>
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
        <div className="divider is-hidden-tablet mt-3 mb-3"/>
        <div className="column">
          {currentActive === "articles" ? <AdminArticle/> : undefined}
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
