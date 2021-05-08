import React from "react";
import axiosInstance from "../../axiosApi";

class Logout extends React.Component {
  state = {
    updateLogout: this.props.updateLogout
  }

  handleLogout = async() => {
    try {
      const response = await axiosInstance.post('/blacklist/', {
        "refresh_token": localStorage.getItem("refresh_token")
      });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      axiosInstance.defaults.headers['Authorization'] = null;
      this.state.updateLogout();
      return response;
    }
    catch (e) {
      throw e;
    }
  };

  render() {
    return(
      <button className='button is-danger' onClick={this.handleLogout}>Se déconnecter</button>
    )
  }
}

export default Logout;
