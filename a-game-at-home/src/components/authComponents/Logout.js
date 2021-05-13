import React from "react";
import axiosInstance from "../../axiosApi";
import {Redirect} from "react-router";

class Logout extends React.Component {
    state = {
        updateLogout: this.props.updateLogout,
        redirect: false
    }

    handleLogout = async () => {
        try {
            const response = await axiosInstance.post('/blacklist/', {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            this.setState({redirect: true})
            this.state.updateLogout();
            return response;
        } catch (e) {
            throw e;
        }
    };

    render() {
        const {redirect} = this.state;
        return (
            <div>
                {redirect ? <Redirect to="/"/> : undefined}
                <button className='button is-danger' onClick={this.handleLogout}>Se déconnecter</button>
            </div>
        )
    }
}

export default Logout;
