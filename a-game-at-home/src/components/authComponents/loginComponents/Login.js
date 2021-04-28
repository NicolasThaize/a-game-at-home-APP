import React from "react";
import {Link} from "react-router-dom";
import Input from "../Input";
import "../../../assets/css/login.min.css";

class Login extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault()
        if (
            this.state.username !== "" &&
            this.state.password !== "" &&
            this.state.passError === ""
        ) {
            console.log("Formulaire valide, faire requete post")
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
            case "Adresse Email":
                this.setState({
                    email: data.value
                })
                break;
            default:
                return;
        }
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit} className="loginContainer mt-6   ">
                <Input onSubmit={this.getInputData} inputValues={ {label: "Nom d'utilisateur", placeholder: 'Hamood69', type: 'text'}}/>
                <Input onSubmit={this.getInputData} inputValues={ {label: "Mot de passe", placeholder: '', type: 'password'}}/>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link">Submit</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light">Cancel</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default Login;