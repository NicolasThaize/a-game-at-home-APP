import React from "react";
import Input from "./Input";

class Modify extends React.Component {
  state = {
    user: this.props.user,
  }

  render() {
    const { user } = this.state;
    return (
      <div className="container">
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
          label: "Date de naissance",
          name: "birth_date",
          value: user.birth_date
        }} />
      </div>
    );
  }
}

export default Modify;
