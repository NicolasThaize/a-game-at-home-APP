import React from "react";
import Input from "./Input";
import User from "../../User";

class Profile extends React.Component {
  state = {
    user: User.prototype.getUserData(),
  }

  render() {
    const { user } = this.state;
    return (
      <div className='container'>
        <fieldset disabled>
          <Input input={{
            label: "Nom d'utilisateur",
            name: "username",
            value: user.username
          }} />
          <Input input={{
            label: "Nom",
            name: "last_name",
            value: user.last_name
          }} />
          <Input input={{
            label: "Prenom",
            name: "first_name",
            value: user.first_name
          }} />
          <Input input={{
            label: "Adresse email",
            name: "email",
            value: user.email
          }} />
          <Input input={{
            label: "Date de naissance",
            name: "birth_date",
            value: user.birth_date
          }} />
        </fieldset>
      </div>
    );
  }
}

export default Profile;
