import React from "react";
import authValidators from "../authComponents/validationFunctions";

class Input extends React.Component{
  state = {
    svgWarning: process.env.PUBLIC_URL + "/img/svgWarning.svg",
    errors: "",
    label: this.props.input.label,
    name: this.props.input.name,
    value: this.props.input.value,
    type: this.props.input.type
  }

  handleChange = (event) => {
    if (event.target.value === ""){
      this.setState({errors: "Le champ ne peut être vide"});
    } else{
      this.setState({errors: ""});
      switch (this.state.type){
        case 'text':
          try {
            authValidators.textField(event.target.value);
          } catch (e) {
            this.setState({errors: e.message});
            return this.updateValue(event.target.value);
          }
          break;
        case 'email':
          try {
            authValidators.emailField(event.target.value);
          } catch (e) {
            this.setState({errors: e.message});
            return this.updateValue(event.target.value);
          }
          break;
        case 'password':
          this.updateValue(event.target.value);
          break;
        default:
          return;
      }
    }

    this.sendToParent(event.target.value);
  }

  /**
   * Le le champ est valide, envoie les données au parent
   * @param value
   */
  sendToParent = (value) => {
    this.setState({value: value}, () => {
      if (this.props.onChange) {
        this.props.onChange({name: this.state.name, value: this.state.value});
      }
    });
  }

  /**
   * Actualise la valeur du champ dans le composant
   * @param value
   */
  updateValue = (value) => {
    this.setState({
      value: value
    });
  }

  render() {
    const { label, name, value, type } = this.state;
    return (
      <div className="field">
        <label className="label">{label}</label>
        <div className="control">
          <input
            className="input is-large"
            name={name} type={type}
            value={value}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default Input;
