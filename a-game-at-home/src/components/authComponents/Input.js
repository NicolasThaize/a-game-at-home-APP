import React from "react";

class Input extends React.Component {
  state = {
    inputValues: this.props.inputValues,
    svgWarning: process.env.PUBLIC_URL + "/img/svgWarning.svg",
    errors: ""
  }

  render() {
    const { inputValues, svgWarning, errors} = this.state;
    return(
      <div className="field">
        <label className="label">{inputValues.label}</label>
        <div className="control has-icons-right">
          <input className={`input ${errors ? "is-danger" : ""}`} type={inputValues.type} placeholder={inputValues.placeholder}/>
          <span className="icon is-small is-right is-flex">
            {errors ? <img src={svgWarning} alt="warning icon" className="inputWarning"/> : ""}
            </span>
        </div>
        {errors ? <p className="help is-danger is-danger">Le champ {inputValues.label} est invalide</p> : ""}
      </div>
    )
  }
}
 export default Input;
