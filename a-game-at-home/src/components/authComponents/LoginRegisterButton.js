import React from "react";
import Register from "./registerComponents/Register";
import Login from "./loginComponents/Login";

class LoginRegisterButton extends React.Component{
  state={
    isActive: "",
    updateLogin: this.props.updateLogin
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
      isActive: n
    })
  }

  /**
   * When clicked on one of the buttons displays the asked form
   * @param text
   */
  switchForm = (text) => {
    this.setState({
      isActive: text
    })
    window.history.pushState("", "", `/${text}`);
  }

  render() {
    const { isActive, updateLogin } = this.state;
    return(
      <div>
        <div className="buttons ml-3 mr-3 is-centered mt-6 mb-6">
          <p
            onClick={() => this.switchForm('register')}
            className={`is-one-quarter button p-5 ${isActive === "register" ? "is-primary" : ""}`}>
            S'enregistrer
          </p>
          <p
            onClick={() => this.switchForm('login')}
            className={`is-one-quarter button p-5 ${isActive === "login" ? "is-primary" : ""}`}>
            Se connecter
          </p>
        </div>
        {isActive === "register" ? <Register/> : <Login className="mb-6" updateLogin={updateLogin}/> }
      </div>
    )
  }
}

export default LoginRegisterButton;
