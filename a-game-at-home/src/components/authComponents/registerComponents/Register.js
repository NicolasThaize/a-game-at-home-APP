import React from "react";
import {Link} from "react-router-dom";
import Input from "../Input";
import "../../../assets/css/register.min.css";
import authValidators from "../validationFunctions";

class Register extends React.Component{
  state = {
    passError: "",
    validPassError: "",
    password: "",
    validatePassword: "",
    email: "",
    username:"",
    firstName:"",
    lastName:"",
    svgWarning: process.env.PUBLIC_URL + "/img/svgWarning.svg",
  }

  /**
   * Gestion des erreurs des champs mots de passe
   * @param event
   */
  handleChange = (event) => {
    switch (event.target.name){
      case "password":
        this.setState({password: event.target.value}, () => {
          this.checkPasswordsMatch();
        });
        this.setState({passError: ""});
        try {
          authValidators.passwordField(event.target.value);
        } catch (e) {
          this.setState({passError: e.message});
        }
        break;
      case "validatePassword":
        this.setState({validatePassword: event.target.value}, () => {
          this.checkPasswordsMatch();
        });
        break;
      default:
        return;
    }
  }

  /**
   * Vérifie si le mot de passe et sa conformation correspondent
   */
  checkPasswordsMatch = () => {
    if (this.state.password !== this.state.validatePassword){
      this.setState({validPassError: "Les mots de passe ne correspondent pas"});
    } else {
      this.setState({validPassError: ""});
    }
  }

  /**
   * Récupère les valeurs des inputs enfants
   * @param data
   */
  getInputData = (data) => {
    switch (data.label){
      case "Nom":
        this.setState({
          lastName: data.value
        })
        break;
      case "Prenom":
        this.setState({
          firstName: data.value
        })
        break;
      case "Nom d\'utilisateur":
        this.setState({
          username: data.value
        })
        break;
      case "Adresse Email":
        this.setState({
          email: data.value
        })
        break;
      default:
        return;
    }
  }

  /**
   * Lorsque le formulaire est envoyé
   * @param e
   */
  handleSubmit = (e) => {
    e.preventDefault()
    if (
      this.state.firstName !== "" &&
      this.state.lastName !== "" &&
      this.state.username !== "" &&
      this.state.email !== "" &&
      this.state.password !== "" &&
      this.state.validatePassword !== "" &&
      this.state.validPassError === "" &&
      this.state.passError === ""
    ){
      console.log("Formulaire valide, faire requete post")
    } else {
      console.log("Formulaire invalide")
    }
  }

  render() {
    const { passError, validPassError, password, validatePassword, svgWarning } = this.state;
    return(
      <form onSubmit={this.handleSubmit} className="registerContainer mt-6 mb-6">
        <Input onChange={this.getInputData} inputValues={ {label: 'Nom', placeholder: 'Marlo', type:"text"} }/>
        <Input onChange={this.getInputData} inputValues={ {label: 'Prenom', placeholder: 'Grégoire', type:"text"} }/>
        <Input onChange={this.getInputData} inputValues={ {label: 'Nom d\'utilisateur', placeholder: 'Grégoire12', type:"text"} }/>
        <Input onChange={this.getInputData} inputValues={ {label: 'Adresse Email', placeholder: 'exemple@gmail.com', type:"email"} }/>

        <div className="field">
          <label className="label">Mot de passe</label>
          <div className="control has-icons-right">
            <input
              className={`input ${passError ? "is-danger" : ""}`}
              type="password"
              autoComplete="new-password"
              placeholder="**********"
              value={password}
              name="password"
              onChange={this.handleChange}
            />
            <span className="icon is-small is-right is-flex">
            {passError ? <img src={svgWarning} alt="warning icon" className="inputWarning"/> : ""}
            </span>
          </div>
          {passError ? <p className="help is-danger is-danger">{passError}</p> : ""}
        </div>

        <div className="field">
          <label className="label">Confirmation du mot de passe</label>
          <div className="control has-icons-right">
            <input
              className={`input ${validPassError ? "is-danger" : ""}`}
              type="password"
              autoComplete="new-password"
              placeholder="**********"
              value={validatePassword}
              name="validatePassword"
              onChange={this.handleChange}
            />
            <span className="icon is-small is-right is-flex">
            {validPassError ? <img src={svgWarning} alt="warning icon" className="inputWarning"/> : ""}
            </span>
          </div>
          {validPassError ? <p className="help is-danger is-danger">{validPassError}</p> : ""}
        </div>

        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox"/>
              &nbsp;J'accepte les <Link to="/">conditions d'utilisation</Link>.
            </label>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">S'enregister</button>
          </div>
          <div className="control">
            <button className="button is-link is-light">Annuler</button>
          </div>
        </div>
      </form>
    )
  }
}

export default Register;
