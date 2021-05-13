import React from "react";

class Input extends React.Component {
    state = {
        label: this.props.input.label,
        name: this.props.input.name,
        value: this.props.input.value
    }

    render() {
        const {label, name, value} = this.state;
        return (
            <div className="field">
                <label className="label">{label}</label>
                <div className="control">
                    <input
                        className="input is-large"
                        name={name} type="text"
                        value={value}
                    />
                </div>
            </div>
        );
    }
}

export default Input;
