import React from "react";
import {Link} from "react-router-dom";
import Input from "../Input"
import "../../../assets/css/register.min.css";
class Register extends React.Component{

  render() {
    return(
      <div>
        <Input inputValues={ {label: 'tst', placeholder: 'test', type:"password"} }/>

        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox"/>
                J'accepte les <Link to="/">termes d'utilisation</Link>.
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
