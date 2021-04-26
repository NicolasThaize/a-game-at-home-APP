import React from "react";
import {Link} from "react-router-dom";
import Input from "../Input";

class Login extends React.Component{
    render(){
        return(
            <div>
                <Input inputValues={ {label: "Nom d'utilisateur", placeholder: 'Hamood69', type: 'text'}}/>
                <Input inputValues={ {label: "Mot de passe", placeholder: '', type: 'password'}}/>
            </div>
        )
    }
}

export default Login;