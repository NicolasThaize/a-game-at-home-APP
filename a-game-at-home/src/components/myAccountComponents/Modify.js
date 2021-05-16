import React from "react";
import Input from "./Input";
import axiosApi from "../../axiosApi";
import axiosInstance from "../../axiosApi";
import User from "../../User";

class Modify extends React.Component {
  state = {
    user: User.prototype.getUserData(),
    isModalActive: false,
    username: "",
    email: "",
    password: "",
    validPassword: "",
    apiError: "",
    isSuccess: false
  }

  /**
   * Get data from children inputs
   * @param data
   */
  getInputData = (data) => {
    switch (data.name){
      case "username":
        this.setState({username: data.value});
        break;
      case "email":
        this.setState({email: data.value});
        break;
      case "password":
        this.setState({password: data.value});
        break;
      case "verify-password":
        this.setState({validPassword: data.value});
        break;
      default: return;
    }
  }

  /**
   * Display / Hide Modal
   */
  triggerModal = () => {
    this.setState({isModalActive: !this.state.isModalActive});
  }

  /**
   * Refresh user data
   */
  refreshUserData = () => {
    this.setState({user: User.prototype.getUserData()});
  }

  /**
   * Refresh tokens globally in app
   * @returns {Promise<void>}
   */
  refreshAllTokens = async () => {
     const data = {
        username: this.state.username ? this.state.username : this.state.user.username,
        password: this.state.password ? this.state.password : this.state.validPassword
      }
      await axiosInstance.post('/token/obtain/', data).then(response => {
        this.setState({isLoading: false});
        axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        this.refreshUserData();
      }).catch(err => {
        this.setState({apiError: "Erreur, contactez l'administrateur du site."});
        throw err;
      });
  }

  /**
   * When click on submit
   * @returns {Promise<void>}
   */
  patchRequest = async () => {
    const data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    if (!this.state.username) {
      delete data.username;
    }
    if (!this.state.email) {
      delete data.email;
    }
    if (!this.state.password) {
      delete data.password
    }
    this.triggerModal();

    // Vérifie l'utilisateur avec le mot de passe
    await axiosInstance.post('/token/obtain/', {
      username: this.state.user.username,
      password: this.state.validPassword
    }).then(async response => {
      axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      this.setState({apiError: undefined, redirect: true});
      this.refreshUserData();
      // Envoie les nouvelles données a la bdd
      await axiosApi.patch(`/users/${this.state.user.id}/`, data).then(async () => {
        await this.refreshAllTokens();
        this.setState({isSuccess: true})
      }).catch(() => {
        this.setState({apiError: 'Erreur, contactez l\'administrateur du site.'});
      });
    }).catch(err => {
      this.setState({apiError: "Mot de passe actuel invalide.", isLoading: false});
      throw err;
    });
  }


  render() {
    const { user, isModalActive, username, email, password, apiError, isSuccess } = this.state;
    return (
      <div className="container">
        { isSuccess ?  (
          <div className="notification is-success">
            Les modifications ont bien été enregistrées.
          </div>) : undefined}
        <Input
          onChange={this.getInputData}
          input={{
          label: "Nouveau nom d'utilisateur",
          name: "username",
          value: user.username,
          type: 'text'
        }} />
        <Input
          onChange={this.getInputData}
          input={{
          label: "Nouvelle adresse email",
          name: "email",
          value: user.email,
          type: 'email'
        }} />
        <Input
          onChange={this.getInputData}
          input={{
          label: "Nouveau mot de passe",
          name: "password",
          value: "",
          type: 'password'
        }} />
        <div className="mt-6 mb-3">
          <Input
            onChange={this.getInputData}
            input={{
            label: "Mot de passe actuel",
            name: "verify-password",
            value: "",
            type: 'password'
          }}/>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-primary is-link"
              type="button"
              onClick={this.triggerModal}>
              Enregistrer les modifications
            </button>
          </div>
        </div>
        <div className={`modal ${isModalActive ? "is-active" : ""}`}>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Récapitulatif des modifications</p>
            </header>
            <section className="modal-card-body">
              <div className="m-3">
                <h3 className="has-text-weight-bold">Nom d'utilisateur</h3>
                {username ? <p>{`${user.username} -> ${username}`}</p> : <p>Nom d'utilisateur non modifié</p>}
              </div>
              <div className="m-3">
                <h3 className="has-text-weight-bold">Email</h3>
                {email ? <p>{`${user.email} -> ${email}`}</p> : <p>Nom d'utilisateur non modifié</p>}
              </div>
              <div className="m-3">
                <h3 className="has-text-weight-bold">Mot de passe</h3>
                {password ? <p>Mot de passe modifié</p> : <p>Mot de passe non modifié</p>}
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-danger" onClick={this.patchRequest}>Valider</button>
              <button className="button" onClick={this.triggerModal}>Annuler</button>
            </footer>
          </div>
          <button className="modal-close is-large" aria-label="close" type="button" onClick={this.triggerModal}/>
        </div>
        {apiError ? <p className="has-text-danger has-text-weight-bold">{apiError}</p> : <span/>}
      </div>
    );
  }
}

export default Modify;
