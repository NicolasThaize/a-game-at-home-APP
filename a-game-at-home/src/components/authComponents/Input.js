import React from "react";
import authValidators from './validationFunctions';

class Input extends React.Component {
  state = {
    inputValues: this.props.inputValues,
    svgWarning: process.env.PUBLIC_URL + "/img/svgWarning.svg",
    errors: "",
    value: '',
  }

  handleChange = (event) => {
    if (event.target.value === ""){
      this.setState({errors: "Le champ ne peut être vide"});
    } else{
      this.setState({errors: ""});
      switch (this.state.inputValues.type){
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
        this.props.onChange({label: this.state.inputValues.label, value: this.state.value});
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
    const { inputValues, svgWarning, errors, value} = this.state;
    return(
      <div className="field">
        <label className="label">{inputValues.label}</label>
        <div className="control has-icons-right">
          <input
            className={`input ${errors ? "is-danger" : ""}`}
            type={inputValues.type}
            placeholder={inputValues.placeholder}
            value={value}
            autoComplete={inputValues.type}
            onChange={this.handleChange}
          />
          <span className="icon is-small is-right is-flex">
            {errors ? <img src={svgWarning} alt="warning icon" className="inputWarning"/> : ""}
            </span>
        </div>
        {errors ? <p className="help is-danger is-danger">{errors}</p> : ""}
      </div>
    )
  }
}
 export default Input;
