import React from "react";
import Register from "./registerComponents/Register";
import Login from "./loginComponents/Login";

class LoginRegisterButton extends React.Component{
  state={
    isActive: ""
  }

  componentDidMount() {
    this.getUrlPath();
  }

  getUrlPath = () => {
    let n = window.location.href.split("/");
    n = n[n.length - 1].toLowerCase();
    this.setState({
      isActive: n
    })
  }

  switchForm = (text) => {
    this.setState({
      isActive: text
    })
    window.history.pushState("", "", `/${text}`);
  }

  render() {
    const { isActive } = this.state;
    return(
      <div>
        <div className="buttons ml-3 mr-3 is-centered mt-6 mb-6">
          <p onClick={() => this.switchForm('login')} className={`is-one-quarter button p-5 ${isActive === "login" ? "is-primary" : ""}`}>Se connecter</p>
          <p onClick={() => this.switchForm('register')} className={`is-one-quarter button p-5 ${isActive === "register" ? "is-primary" : ""}`}>S'enregistrer</p>
        </div>
        {isActive === "register" ? <Register/> : <Login/> }
      </div>
    )
  }
}

export default LoginRegisterButton;
