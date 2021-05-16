import React from "react";
import {Link} from "react-router-dom";
import NavbarLoggedIn from "./NavbarLoggedIn";
import NavbarNotLoggedIn from "./NavbarNotLoggedIn";
import "../../assets/css/navbar.min.css"

class Navbar extends React.Component {

  state = {
    burgerActive: false,
    dropMenuActive: true,
    windowWidth: window.innerWidth,
    logo: process.env.PUBLIC_URL + "/img/logo.png",
    svgFb: process.env.PUBLIC_URL + "/img/svgFb.svg",
    svgTwt: process.env.PUBLIC_URL + "/img/svgTwt.svg",
    loggedIn: this.props.isLogged
  }

  /**
   * Is executed when prop isLogged changes
   * @param props
   * @param state
   */
  static getDerivedStateFromProps(props, state) {
    // Change the state loggedIn to update navbar look
    return state.loggedIn = props.isLogged
  }

  componentDidMount() {
    this.setState({loggedIn: this.props.isLogged})
    // If on mobile disable the menu by default
    if (this.state.windowWidth < 1024) {
      this.setState({
        dropMenuActive: false
      });
    }
  }

  /**
   * Toggles burgerActive (false/true)
   * and if on mobile toggles dropMenuActive (false/true)
   */
  burgerClick = () => {
    this.setState(prevState => ({
      burgerActive: !prevState.burgerActive
    }));
    if (this.state.windowWidth < 1024){
      this.setState(prevState => ({
        dropMenuActive: !prevState.dropMenuActive
      }));
    }
  }

  render() {
    const { logo, burgerActive, dropMenuActive,loggedIn, svgFb, svgTwt } = this.state;
    let burgerClassName = "navbar-burger";
    if(burgerActive){
      burgerClassName += ' is-active'
    }
    return(
      <nav className="navbar container is-fluid is-fixed-top has-text-centered-touch navShadow" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            <img src={logo} height="50" alt="logo"/>
          </Link>
          <div
            role="button"
            className={burgerClassName}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={this.burgerClick}
          >
            <span aria-hidden="true"/>
            <span aria-hidden="true"/>
            <span aria-hidden="true"/>
          </div>
        </div>

        <div className={dropMenuActive ? "navbar-menu is-active" : "navbar-menu"}>
          <div className="navbar-start has-text-weight-bold">
            <Link to="/" className="navbar-item">
              Accueil
            </Link>

            <Link to="/Presentation" className="navbar-item">
              Presentation
            </Link>

            <Link to="/" className="navbar-item">
              Classements
            </Link>

            <Link to="/Articles" className="navbar-item">
              Articles
            </Link>
          </div>
          {loggedIn ?
            <NavbarLoggedIn/> :
            <NavbarNotLoggedIn/>
          }
          <div className="is-hidden-desktop columns is-mobile has-text-centered m-3">
            <a href="https://www.google.com" target="_blank" rel="noreferrer" className="column">
              <img src={svgFb} alt="logo facebook" className="navDropSvg"/>
             <p>Facebook</p>
            </a>
            <a href="https://www.google.com" target="_blank" rel="noreferrer" className="column">
              <img src={svgTwt} alt="logo twitter" className="navDropSvg"/>
              <p>Twitter</p>
            </a>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;
