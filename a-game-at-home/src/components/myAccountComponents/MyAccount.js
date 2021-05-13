import React from "react";
import {Link} from "react-router-dom";
import Profile from "./Profile";
import Modify from "./Modify";
import Sessions from "./Sessions";
import Teams from "./Teams";
import Logout from "../authComponents/Logout";


class MyAccount extends React.Component {
  state = {
    currentActive: '',
    updateLogout: this.props.updateLogout,
    tabList: [
      {
        id: 1,
        name: 'Informations du profil',
        link: '/',
      },
      {
        id: 2,
        name: 'Modifier les informations du profil',
        link: '/modify',
      },
      {
        id: 3,
        name: 'Historique des sessions',
        link: '/sessions',
      },
      {
        id: 4,
        name: 'Equipes',
        link: '/teams',
      },
    ],
  }

  componentDidMount() {
    this.getUrlPath();
  }

  /**
   * Get the last word of url (in 'localhost/login' returns 'login')
   */
  getUrlPath = () => {
    let n = window.location.href.split("/");
    n = n[n.length - 1].toLowerCase();
    this.setState({
      currentActive: n
    })
  }

  handleClick = (id) => {
    this.setState({currentActive: id});
  }

  render() {
    const { tabList, currentActive, updateLogout } = this.state;
    return(
      <div className="m-6">
        <div className="tabs">
          <ul>
            {tabList.map(tab =>
              <li
                className={tab.id === currentActive ? "is-active" : ""}
                key={tab.id} onClick={() => this.handleClick(tab.id)}
              >
                <Link to={`/profile${tab.link}`}>{tab.name}</Link>
              </li>
            )}
          </ul>
        </div>
        {currentActive === '' ? <Profile/> : undefined}
        {currentActive === 'modify' ? <Modify/> : undefined}
        {currentActive === 'sessions' ? <Sessions/> : undefined}
        {currentActive === 'teams' ? <Teams/> : undefined}
        <Logout updateLogout={updateLogout} />
      </div>
    )
  }
}

export default MyAccount;
