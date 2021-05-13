import React from "react";
import Input from "../Input";
import "../../../assets/css/login.min.css";
import axiosInstance from '../../../axiosApi'
import {Redirect} from "react-router";

class Login extends React.Component {
    state = {
        username: "",
        password: "",
        isLoading: false,
        redirect: false,
        updateLogin: this.props.updateLogin
    }

    /**
     * If values are ok sends a request to api to get auth token
     * @param e
     * @returns {Promise<void>}
     */
    handleSubmit = async (e) => {
        e.preventDefault()
        if (this.state.username !== "" && this.state.password !== "") {
            // Formulaire valide, faire requete post
            this.setState({isLoading: true});
            await axiosInstance.post('/token/obtain/', {
                username: this.state.username,
                password: this.state.password
            }).then(response => {
                this.setState({isLoading: false});
                axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                this.setState({apiError: undefined, redirect: true});
                this.state.updateLogin();
                return response.data;
            }).catch(err => {
                this.setState({apiError: "Nom d'utilisateur et/ou mot de passe invalide.", isLoading: false});
                throw err;
            });
        } else {
            // Formulaire invalide
        }
    }

    getInputData = (data) => {
        switch (data.label) {
            case "Nom d'utilisateur":
                this.setState({username: data.value});
                break;
            case "Mot de passe":
                this.setState({password: data.value});
                break;
            default:
                return;
        }
    }


    render() {
        const {apiError, isLoading, redirect} = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="loginContainer mt-6   ">
                {redirect ? (
                    <Redirect to='/'/>
                ) : undefined}

                {isLoading ? <p>loading</p> : <p/>}
                <Input onChange={this.getInputData}
                       inputValues={{label: "Nom d'utilisateur", placeholder: 'Gregoire12', type: 'text'}}/>
                <Input onChange={this.getInputData}
                       inputValues={{label: "Mot de passe", placeholder: '**********', type: 'password'}}/>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link">Valider</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light">Annuler</button>
                    </div>
                </div>
                {apiError ? <p className="has-text-danger has-text-weight-bold">{apiError}</p> : <span/>}
            </form>
        )
    }
}

export default Login;
