import React from "react";
import {Link} from "react-router-dom";
import Input from "../Input";
import "../../../assets/css/login.min.css";

class Login extends React.Component{
    state = {
        username:"",
        password:"",
    }

    handleSubmit = (e) => {
        console.log(this.state);
        e.preventDefault()
        if (this.state.username !== "" && this.state.password !== "") {
            fetch('http://localhost:8000/token-auth/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            }).then(res => res.json())
              .then(json => {
                  localStorage.setItem('token', json.token);
                  console.log(localStorage.getItem('token'));
              });
        } else {
            console.log("Formulaire invalide")
        }
    }

    getInputData = (data) => {
        switch (data.label){
            case "Nom d\'utilisateur":
                this.setState({
                    username: data.value
                })
                break;
            case "Mot de passe":
                this.setState({
                    password: data.value
                })
                break;
            default:
                return;
        }
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit} className="loginContainer mt-6   ">
                <Input onChange={this.getInputData} inputValues={ {label: "Nom d'utilisateur", placeholder: 'Hamood69', type: 'text'}}/>
                <Input onChange={this.getInputData} inputValues={ {label: "Mot de passe", placeholder: '', type: 'password'}}/>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link">Valider</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light">Annuler</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default Login;
