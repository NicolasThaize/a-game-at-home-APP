import React from "react";
import {Link} from "react-router-dom";
import Profile from "./Profile";
import Modify from "./Modify";
import Sessions from "./Sessions";
import Teams from "./Teams";
import Logout from "../authComponents/Logout";
import {Helmet} from "react-helmet-async";


class MyAccount extends React.Component {
  state = {
    currentActive: '',
    updateLogout: this.props.updateLogout,
    tabList: [
      {
        id: 1,
        label: 'profile',
        name: 'Informations du profil',
        link: '/',
      },
      {
        id: 2,
        label: 'modify',
        name: 'Modifier les informations du profil',
        link: '/modify',
      },
      {
        id: 3,
        label: 'sessions',
        name: 'Historique des sessions',
        link: '/sessions',
      },
      {
        id: 4,
        label: 'teams',
        name: 'Equipes',
        link: '/teams',
      },
    ],
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
    n = "/" + n[n.length - 1].toLowerCase();
    this.setState({
      currentActive: n === "/profile" ? "/" : n
    })
  }

  /**
   * Switches the current active tab
   * @param text
   */
  handleClick = (text) => {
    this.setState({currentActive: text});
  }

  render() {
    const { tabList, currentActive, updateLogout } = this.state;
    return(
      <div className="m-6">
        <Helmet>
          <title>Mon compte - At Home A Game</title>
        </Helmet>
        <div className="tabs">
          <ul>
            {tabList.map(tab =>
              <li
                className={tab.link === currentActive ? "is-active" : ""}
                key={tab.id} onClick={() => this.handleClick(tab.link)}
              >
                <Link to={`/profile${tab.link}`}>{tab.name}</Link>
              </li>
            )}
          </ul>
        </div>
        {currentActive === '/' || currentActive === '/profile' ? <Profile/> : undefined}
        {currentActive === '/modify' ? <Modify/> : undefined}
        {currentActive === '/sessions' ? <Sessions/> : undefined}
        {currentActive === '/teams' ? <Teams/> : undefined}
        <Logout updateLogout={updateLogout} />
      </div>
    )
  }
}

export default MyAccount;
