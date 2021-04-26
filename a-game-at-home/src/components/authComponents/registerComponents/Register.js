import React from "react";
import {Link} from "react-router-dom";
import Input from "../Input";
import "../../../assets/css/register.min.css";
class Register extends React.Component{

  render() {
    return(
      <div>
        <Input inputValues={ {label: 'Nom', placeholder: 'Marlo', type:"text"} }/>
        <Input inputValues={ {label: 'Prenom', placeholder: 'Grégoire', type:"text"} }/>
        <Input inputValues={ {label: 'Nom d\'utilisateur', placeholder: 'Grégoire12', type:"text"} }/>
        <Input inputValues={ {label: 'Adresse Email', placeholder: 'exemple@gmail.com', type:"email"} }/>
        <Input inputValues={ {label: 'Mot de passe', placeholder: '**********', type:"password"} }/>
        <Input inputValues={ {label: 'Confirmation du mot de passe', placeholder: '**********', type:"password"} }/>

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
      </div>
    )
  }
}

export default Register;
