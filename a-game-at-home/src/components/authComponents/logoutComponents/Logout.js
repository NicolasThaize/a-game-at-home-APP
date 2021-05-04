import React from "react";

class Logout extends React.Component {
  render() {
    return(
      <div>
        <button
          className="button is-danger"
          type='button'
          onClick={ () => localStorage.removeItem('token')}
        >
          Se déconnecter
        </button>
      </div>
  )
  }
}

export default Logout;
